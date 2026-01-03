
import React from 'react';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onViewWishlist: () => void;
  activeCategory: Category;
  setCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentView: 'shop' | 'wishlist';
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount,
  onOpenCart, 
  onViewWishlist,
  activeCategory, 
  setCategory,
  searchQuery,
  setSearchQuery,
  currentView
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const categories: { label: string; value: Category }[] = [
    { label: 'All Collection', value: 'all' },
    { label: 'Lamps', value: 'lamps' },
    { label: 'Bedsheets', value: 'bedsheets' },
    { label: 'Furniture', value: 'furniture' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 my-4 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCategory('all')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">H</div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">Homie<span className="text-indigo-600">Pro</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                // Ensure we go back to shop view when clicking categories
              }}
              className={`text-sm font-medium transition-colors ${
                currentView === 'shop' && activeCategory === cat.value ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search decor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100/50 border-transparent border focus:border-indigo-400 focus:bg-white rounded-full text-sm outline-none transition-all w-40 lg:w-64"
            />
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={onViewWishlist}
              className={`relative p-2 rounded-full transition-all ${
                currentView === 'wishlist' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-6 h-6 ${currentView === 'wishlist' ? 'fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-700"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 px-6 py-4 flex flex-col gap-4 bg-white/90 backdrop-blur-md rounded-b-2xl shadow-xl">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setIsMenuOpen(false);
              }}
              className={`text-left text-lg font-medium ${
                currentView === 'shop' && activeCategory === cat.value ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => {
              onViewWishlist();
              setIsMenuOpen(false);
            }}
            className={`text-left text-lg font-medium flex items-center gap-2 ${
              currentView === 'wishlist' ? 'text-indigo-600' : 'text-slate-600'
            }`}
          >
            <Heart className={currentView === 'wishlist' ? 'fill-current' : ''} />
            Wishlist ({wishlistCount})
          </button>
        </div>
      )}
    </nav>
  );
};
