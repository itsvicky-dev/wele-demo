import { useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingCart, Trash2, GraduationCap, Calendar } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart } = useCart();

  const total = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^\d]/g, ""));
    return sum + num;
  }, 0);

  return (
    <div className="bg-white overflow-y-auto w-full min-h-screen">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-20 border-b border-gray-100 bg-white px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate(-1)} className="hover:text-[#00BF53] cursor-pointer flex items-center gap-1">
            <GraduationCap className="w-4 h-4" /> Courses
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 pb-24">
        <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" /> My Cart
          <span className="text-sm font-normal text-gray-400">({items.length} item{items.length !== 1 ? "s" : ""})</span>
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <ShoppingCart className="w-12 h-12 mb-4" />
            <p className="text-base font-medium">Your cart is empty</p>
            <button onClick={() => navigate(-1)} className="mt-4 text-sm text-green-600 hover:underline">Browse Courses</button>
          </div>
        ) : (
          <div className="flex gap-8 items-start">
            {/* Items list */}
            <div className="flex-1 space-y-4">
              {items.map((item, i) => {
                const initials = item.title.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
                return (
                  <div key={i} className="flex items-center gap-4 border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-black">{initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{item.title}</p>
                      {item.trainer && (
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" /> Trainer - {item.trainer}
                        </p>
                      )}
                      {item.date && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0 mr-2">
                      <p className="font-bold text-gray-900">{item.price}</p>
                      {item.basePrice && <p className="text-xs text-gray-400 line-through">{item.basePrice}</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.title)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="w-72 flex-shrink-0 sticky top-20">
              <div className="border border-gray-100 rounded-2xl p-6">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  {items.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-600">
                      <span className="truncate max-w-[160px]">{item.title}</span>
                      <span className="font-medium text-gray-800 flex-shrink-0 ml-2">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-gray-900 mb-5">
                  <span>Total</span>
                  <span>₹ {total.toLocaleString("en-IN")}</span>
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
                  Proceed to Checkout
                </button>
                <button onClick={() => navigate(-1)} className="w-full mt-2 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:border-green-400 hover:text-green-600 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
