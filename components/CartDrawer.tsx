
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-800">Your Cart ({items.length})</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-16 h-16 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                <button onClick={onClose} className="mt-4 px-6 py-2 text-indigo-600 font-bold border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all">Start Shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-all opacity-50 disabled:opacity-20"><Minus className="w-3 h-3" /></button>
                        <span className="font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-all"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-bold text-slate-900">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-6 bg-slate-50 border-t space-y-4">
            <div className="flex justify-between items-center font-bold text-xl text-slate-900">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
            <button 
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
