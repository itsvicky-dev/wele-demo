

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
}

export interface SignUpData {
  name: string;
  email?: string;
  phone?: string;
}

export interface SignInData {
  email?: string;
  phone?: string;
}

export interface GoogleLoginResponse {
  refreshToken: string;
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
  roles: string[];
  onBoard: boolean;
  email: string;
}

class AuthService {
  private backendUrl: string;

  constructor() {
    this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://43296af1ea59.ngrok-free.app';
  }

  private async graphqlRequest(query: string, variables: any) {
    const response = await fetch(`${this.backendUrl}/login/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  }

  // Send OTP using GraphQL
  async sendOTP(emailOrMobile: string): Promise<{ success: boolean; error?: string }> {
    try {
      const query = `
        mutation GenerateOtp($emailOrMobile: String!) {
          generateOtp(emailOrMobile: $emailOrMobile) {
            statusCode
            statusMessage
            data
          }
        }
      `;

      const data = await this.graphqlRequest(query, { emailOrMobile });

      if (data.generateOtp.statusCode === 200) {
        return { success: true };
      } else {
        return { success: false, error: data.generateOtp.statusMessage };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Verify OTP using GraphQL
  // Verify OTP for Signup (Mobile)
  async verifySignupOTP(emailOrMobile: string, otp: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const query = `
        mutation VerifyMobileOtp($emailOrMobile: String!, $otp: String!) {
          verifyMobileOtp(emailOrMobile: $emailOrMobile, otp: $otp) {
            statusCode
            statusMessage
            data
          }
        }
      `;

      const data = await this.graphqlRequest(query, { emailOrMobile, otp });

      if (data.verifyMobileOtp.statusCode == 200) {
        return {
          success: true,
          token: data.verifyMobileOtp.data // content is the temporary token
        };
      } else {
        return { success: false, error: data.verifyMobileOtp.statusMessage };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update Email (Signup Step 2)
  async updateEmail(token: string, email: string): Promise<{ success: boolean; data?: GoogleLoginResponse; error?: string }> {
    try {
      const query = `
        mutation UpdateEmail($token: String!, $email: String!) {
          updateEmail(token: $token, email: $email) {
            statusCode
            statusMessage
            data {
                refreshToken
                accessToken
                expiresIn
                tokenType
                scope
                roles
                email
                onBoard
            }
          }
        }
      `;

      const data = await this.graphqlRequest(query, { token, email });

      if (data.updateEmail.statusCode == 200) {
        return {
          success: true,
          data: data.updateEmail.data
        };
      } else {
        return { success: false, error: data.updateEmail.statusMessage };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Verify Login OTP
  async verifyLoginOTP(emailOrMobile: string, otp: string): Promise<{ success: boolean; data?: GoogleLoginResponse; error?: string }> {
    try {
      const query = `
        mutation VerifyLoginOtp($emailOrMobile: String!, $otp: String!) {
          verifyLoginMobileOtp(emailOrMobile: $emailOrMobile, otp: $otp) {
            statusCode
            statusMessage
            data {
                refreshToken
                accessToken
                expiresIn
                tokenType
                scope
                roles
                email
                onBoard
            }
          }
        }
      `;

      const data = await this.graphqlRequest(query, { emailOrMobile, otp });

      if (data.verifyLoginMobileOtp.statusCode == 200) {
        return {
          success: true,
          data: data.verifyLoginMobileOtp.data
        };
      } else {
        return { success: false, error: data.verifyLoginMobileOtp.statusMessage };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Sign up with GraphQL
  async signUp(userData: SignUpData): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const query = `
        mutation UserSignUp($input: UserSignUpRequest!) {
          userSignUp(input: $input) {
            statusCode
            statusMessage
            data
          }
        }
      `;

      const variables = {
        input: {
          fullName: userData.name,
          mobileNumber: userData.phone
        }
      };

      const data = await this.graphqlRequest(query, variables);

      if (data.userSignUp.statusCode === 200) {
        return {
          success: true,
          user: {
            id: Date.now().toString(),
            name: userData.name,
            phone: userData.phone
          }
        };
      } else {
        return { success: false, error: data.userSignUp.statusMessage };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Sign in with OTP
  async signIn(userData: SignInData, otp: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    const emailOrMobile = userData.email || userData.phone;
    if (!emailOrMobile) {
      return { success: false, error: 'Email or phone is required' };
    }
    return await this.verifyLoginOTP(emailOrMobile, otp);
  }

  // Sign out
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Create account with mobile and email
  async createAccount(userData: { phone: string; email: string }): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const query = `
        mutation CreateAccount($phone: String!, $email: String!) {
          createAccount(phone: $phone, email: $email) {
            statusCode
            statusMessage
            data {
              id
              name
              phone
              email
            }
          }
        }
      `;

      const data = await this.graphqlRequest(query, {
        phone: userData.phone,
        email: userData.email
      });

      if (data.createAccount.statusCode === 200) {
        return {
          success: true,
          user: {
            id: data.createAccount.data.id,
            name: data.createAccount.data.name,
            phone: data.createAccount.data.phone,
            email: data.createAccount.data.email
          }
        };
      } else {
        return { success: false, error: data.createAccount.statusMessage };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
  // Google Login
  async loginWithGoogle(token: string): Promise<{ success: boolean; data?: GoogleLoginResponse; error?: string }> {
    try {
      const query = `
        query LoginWithGoogle($token: String!) {
          loginWithGoogle(token: $token) {
            refreshToken
            accessToken
            expiresIn
            tokenType
            scope
            roles
            onBoard
            email
          }
        }
      `;

      const data = await this.graphqlRequest(query, { token });

      if (data.loginWithGoogle) {
        return {
          success: true,
          data: data.loginWithGoogle
        };
      }
      return { success: false, error: "Login failed with Google" };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export const authService = new AuthService();