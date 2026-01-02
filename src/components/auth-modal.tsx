"use client"

import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { authService } from "../services/authService"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import Logo from "../assets/images/logo.svg";
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"



export function AuthModal({ onClose, onSuccess, initialTab = "signin" }: { onClose?: () => void; onSuccess?: (user: any) => void; initialTab?: "signin" | "signup" }) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialTab)
  const [showOtpField, setShowOtpField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [showEmailField, setShowEmailField] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialTab) // (Keep existing state)

  const handleGoogleSuccess = async (response: any) => {
    try {
      setIsLoading(true);
      console.log("Google Raw Response:", response);

      const token = response.credential;
      if (!token) {
        setError("No credential received from Google");
        return;
      }

      const result = await authService.loginWithGoogle(token);

      if (result.success && result.data) {
        sessionStorage.setItem("email", result.data.email);
        sessionStorage.setItem("accessToken", result.data.accessToken);

        if (result.data.onBoard === false) {
          console.log("Login Successful!");
          onSuccess?.(result.data);
          onClose?.();
        } else {
          onSuccess?.(result.data);
          onClose?.();
        }
      } else {
        setError(result.error || "Google login failed");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* 
    The custom button uses 'useGoogleLogin' which returns an access_token (Authorization). 
    To get a 'credential' (ID Token) for Authentication, we must use the standard GoogleLogin component.
  */

  /* State to hold the temporary token from signup OTP verification */
  const [signupToken, setSignupToken] = useState("");

  const handleSendOtp = async () => {
    if (!mobile || mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      let result

      if (activeTab === "signup") {
        // For signup: call userSignUp mutation first
        result = await authService.signUp({
          name: name || "User", // Provide default name if empty or ensure name field usage
          phone: mobile
        })
      } else {
        // For signin: call sendOTP mutation
        result = await authService.sendOTP(mobile)
      }

      if (result.success) {
        setShowOtpField(true)
        setOtpSent(true)
        setCountdown(30) // Start 30 second countdown
      } else {
        setError(result.error || "Failed to send OTP")
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP")
      return
    }

    if (activeTab === "signin" && !agreedToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)
    setError("")

    try {

      if (activeTab === "signin") {
        // For signin: call verifyLoginOTP
        const result = await authService.verifyLoginOTP(mobile, otp);
        if (result.success && result.data) {
          sessionStorage.setItem("email", result.data.email);
          sessionStorage.setItem("accessToken", result.data.accessToken);
          // Store name if available or fallback to email
          const userName = result.data.email.split('@')[0];
          sessionStorage.setItem("name", userName);

          console.log("Login Successful!");
          onSuccess?.(result.data);
          onClose?.();
        } else {
          setError(result.error || "Authentication failed");
        }
      } else {
        // For signup: call verifySignupOTP -> returns temporary token
        const result = await authService.verifySignupOTP(mobile, otp);
        if (result.success && result.token) {
          setSignupToken(result.token);
          setShowOtpField(false);
          setShowEmailField(true);
        } else {
          setError(result.error || "OTP Verification failed");
        }
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = async () => {
    if (!email) {
      setError("Please enter your email")
      return
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // For Signup Final Step: Update Email using the token
      const result = await authService.updateEmail(signupToken, email);

      if (result.success && result.data) {
        console.log("Account created successfully!")
        sessionStorage.setItem("email", result.data.email);
        sessionStorage.setItem("accessToken", result.data.accessToken);

        // Store name if available or fallback to email
        const userName = result.data.email.split('@')[0];
        sessionStorage.setItem("name", userName);

        onSuccess?.(result.data)
        onClose?.()
      } else {
        setError(result.error || "Failed to create account")
      }
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="" />
        </div>

        {/* Welcome back heading */}
        <h1 className="text-2xl font-medium text-center mb-4 text-gray-900">
          {activeTab === "signin" ? "Welcome back" : "Create Account"}
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Tab buttons */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-50 text-gray-600 rounded-xl">
          <button
            onClick={() => {
              setActiveTab("signin")
              setShowOtpField(false)
              setShowEmailField(false)
              setOtp("")
              setEmail("")
            }}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${activeTab === "signin"
              ? "bg-white text-gray-900 shadow-sm"
              : ""
              }`}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setActiveTab("signup")
              setShowOtpField(false)
              setShowEmailField(false)
              setOtp("")
              setEmail("")
            }}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${activeTab === "signup"
              ? "bg-white text-gray-900 shadow-sm"
              : ""
              }`}
          >
            Create account
          </button>
        </div>

        {!showOtpField && (
          <>
            <div className="w-full mb-4 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.error("Google Login Failed");
                  setError("Google Login failed");
                }}
                theme="filled_black"
                shape="rectangular"
                size="large"
                width="100%"
                text="continue_with"
              />
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </>
        )}

        {activeTab === "signup" && !showOtpField && !showEmailField && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-6 px-4 rounded-xl border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#00BF53] focus:ring-[#00BF53]"
            />
          </div>
        )}

        {/* {!showOtpField && (
          <>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (e.target.value) setMobile("")
                }}
                disabled={!!mobile}
                className="w-full py-6 px-4 rounded-xl border-gray-200 text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
              />
            </div>
          </>
        )} */}

        {showOtpField && !showEmailField && (
          <>
            {/* OTP Header */}
            <div className="flex mx-auto">

              <div className="flex flex-col mx-auto mb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  We've sent an OTP on
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">+91 {mobile}</span>
                  <button
                    onClick={() => {
                      setShowOtpField(false)
                      setOtpSent(false)
                      setOtp("")
                    }}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* OTP Input Fields */}
            <div className="mb-6">
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      const newOtp = otp.split("")
                      newOtp[index] = value
                      setOtp(newOtp.join("").slice(0, 4))

                      // Auto focus next input
                      if (value && index < 3) {
                        const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement
                        nextInput?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        const prevInput = e.target.parentElement?.children[index - 1] as HTMLInputElement
                        prevInput?.focus()
                      }
                    }}
                    className="w-14 h-14 text-center text-xl font-medium border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  />
                ))}
              </div>
            </div>

            {/* Resend OTP */}
            <div className="text-center mb-6">
              <span className="text-gray-600 text-sm">Didn't receive OTP? </span>
              {countdown > 0 ? (
                <span className="text-gray-500 text-sm font-medium">
                  Resend in {countdown} sec
                </span>
              ) : (
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      let result;
                      if (activeTab === "signup") {
                        result = await authService.signUp({
                          name: name || "User",
                          phone: mobile
                        });
                      } else {
                        result = await authService.sendOTP(mobile);
                      }
                      if (result.success) {
                        setCountdown(30);
                      } else {
                        setError(result.error || "Failed to resend OTP");
                      }
                    } catch (err) {
                      setError("Failed to resend OTP");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium disabled:text-gray-400"
                >
                  {isLoading ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </>
        )}
        {!showOtpField && !showEmailField && (
          <div className="mb-4">
            <div className="flex flex-col gap-4">
              <Input
                type="tel"
                placeholder="Mobile Number (10 digits)"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  setMobile(value)
                }}
                maxLength={10}
                className="flex-1 py-4 px-4 rounded-xl border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#00BF53] focus:ring-[#00BF53]"
              />
              <Button
                onClick={handleSendOtp}
                disabled={!mobile || mobile.length < 10 || isLoading}
                className="px-6 py-6 bg-[#00BF53] hover:bg-green-600 text-white rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* {showOtpField && !showEmailField && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              className="w-full py-6 px-4 rounded-xl border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#00BF53] focus:ring-[#00BF53]"
            />
          </div>
        )} */}

        {showEmailField && (
          <>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-6 px-4 rounded-xl border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#00BF53] focus:ring-[#00BF53]"
              />
            </div>

            {/* Terms checkbox for create account */}
            <div className="flex items-start gap-3 mb-6">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                By continuing, you agree to our <button className="text-gray-900 hover:underline">Terms of Service</button>,{" "}
                <button className="text-gray-900 hover:underline">Cookie Policy</button> &{" "}
                <button className="text-gray-900 hover:underline">Privacy Policy</button>
              </label>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!email || !agreedToTerms || isLoading}
              className="w-full bg-[#00BF53] hover:bg-green-600 disabled:bg-gray-400 text-white py-6 rounded-xl font-medium flex items-center justify-center gap-2"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </>
        )}

        {showOtpField && !showEmailField && activeTab === "signup" && (
          <Button
            onClick={handleSubmit}
            disabled={!otp || otp.length !== 4 || isLoading}
            className="w-full bg-[#00BF53] hover:bg-green-600 disabled:bg-gray-400 text-white py-6 rounded-xl font-medium flex items-center justify-center gap-2"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        )}

        {activeTab === "signin" && showOtpField && (
          <>
            {/* Terms checkbox for signin */}
            <div className="flex items-start gap-3 mb-6">
              <Checkbox
                id="terms-signin"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <label htmlFor="terms-signin" className="text-sm text-gray-600 leading-relaxed">
                By continuing, you agree to our <button className="text-gray-900 hover:underline">Terms of Service</button>,{" "}
                <button className="text-gray-900 hover:underline">Cookie Policy</button> &{" "}
                <button className="text-gray-900 hover:underline">Privacy Policy</button>
              </label>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!otp || otp.length !== 4 || !agreedToTerms || isLoading}
              className="w-full bg-[#00BF53] hover:bg-green-600 disabled:bg-gray-400 text-white py-6 rounded-xl font-medium flex items-center justify-center gap-2"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
