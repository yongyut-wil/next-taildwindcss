import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Salad } from '@/types/salad';
import Image from 'next/image';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { id: number; quantity: number }[];
  salads: Salad[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  salads,
  onUpdateQuantity,
  onRemoveItem,
}: CartModalProps) {
  const cartTotal = cart.reduce((total, item) => {
    return total + (salads[item.id].price * item.quantity);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaShoppingCart /> Shopping Cart
        </h3>
        
        {cart.length === 0 ? (
          <div className="py-8 text-center text-base-content/60">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const salad = salads[item.id];
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <Image src={salad.image} alt={salad.name} width={48} height={48} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{salad.name}</div>
                              <div className="text-sm opacity-50">
                                {salad.dietary.vegetarian && "Vegetarian • "}
                                {salad.dietary.glutenFree && "Gluten Free"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>${salad.price.toFixed(2)}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              className="btn btn-square btn-sm"
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <FaMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              className="btn btn-square btn-sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <FaPlus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td>${(salad.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right font-bold">Total:</td>
                    <td className="font-bold">${cartTotal.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="btn btn-ghost" onClick={onClose}>
                Continue Shopping
              </button>
              <button className="btn btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

        <div className="modal-action">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}>
        <button className="cursor-default">Close</button>
      </div>
    </div>
  );
}
