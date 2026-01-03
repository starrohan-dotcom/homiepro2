
import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  isInWishlist 
}) => {
  return (
    <div className="group perspective-container h-full">
      <div className="glass-card rounded-[32px] p-5 three-d-hover h-full flex flex-col cursor-pointer relative">
        <div className="relative aspect-square overflow-hidden rounded-2xl mb-5 bg-slate-50 shadow-inner">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          
          {/* Wishlist Toggle */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 z-10 ${
              isInWishlist 
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' 
                : 'bg-white/70 text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          {product.featured && (
            <span className="absolute top-4 left-4 px-4 py-1.5 bg-indigo-600/90 backdrop-blur-md text-[10px] font-bold text-white rounded-full uppercase tracking-widest shadow-lg border border-white/20">
              Featured
            </span>
          )}
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="absolute bottom-4 right-4 bg-white/95 text-indigo-600 p-3.5 rounded-2xl shadow-xl transform translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-indigo-600 hover:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1.5">{product.category}</p>
              <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg text-amber-600">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-black">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
            {product.description}
          </p>
          
          <div className="mt-auto pt-5 border-t border-slate-100/80 flex justify-between items-center">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">${product.price}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="px-5 py-2 text-xs font-bold text-indigo-600 bg-indigo-50/50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
