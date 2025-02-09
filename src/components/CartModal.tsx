import { Salad } from '@/types/salad';
import Image from 'next/image';

interface CartItem {
  salad: Salad;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (index: number, newQuantity: number) => void;
  removeFromCart: (index: number) => void;
}

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }: CartModalProps) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => total + item.salad.price * item.quantity, 0);
  const shippingFee = subtotal > 50 ? 0 : 5;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-800 text-lg mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="btn btn-primary text-white px-6 py-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.salad.name}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 relative">
                    <Image
                      src={item.salad.image}
                      alt={item.salad.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                      {item.salad.name}
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {item.salad.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            className="w-5 h-5 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="text-gray-900 font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <svg
                            className="w-5 h-5 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-900 font-semibold">
                          ${(item.salad.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-800">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-800">
                <span>Shipping</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? "Free" : "$5.00"}
                </span>
              </div>
              {subtotal < 50 && (
                <div className="text-sm text-gray-600 mt-1">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${(subtotal + shippingFee).toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="w-full mt-4 btn btn-primary text-white py-3 rounded-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
