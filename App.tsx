
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AIChat } from './components/AIChat';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { Heart, ArrowLeft, CreditCard, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'shop' | 'wishlist' | 'checkout' | 'success'>('shop');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const setCategoryAndShop = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeOrder = () => {
    setCartItems([]);
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-700">
      <Header 
        cartCount={totalItems} 
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onViewWishlist={() => { setCurrentView('wishlist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        activeCategory={activeCategory}
        setCategory={setCategoryAndShop}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentView={currentView === 'wishlist' ? 'wishlist' : 'shop'}
      />

      <main>
        {currentView === 'shop' && (
          <>
            <Hero />
            <section className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">
                    {activeCategory === 'all' ? 'Latest Collections' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                  </h2>
                  <div className="h-1.5 w-20 bg-indigo-600 rounded-full"></div>
                </div>
                <p className="text-slate-500 font-medium hidden md:block">
                  Showing {filteredProducts.length} premium pieces
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={wishlistItems.some(item => item.id === product.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'wishlist' && (
          <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <button onClick={() => setCurrentView('shop')} className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-4 hover:gap-3 transition-all"><ArrowLeft className="w-4 h-4" /> Back to Shop</button>
                <h2 className="text-5xl font-bold text-slate-900 mb-2">Your Wishlist</h2>
              </div>
            </div>
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistItems.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} isInWishlist={true} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-[40px] py-32 text-center">
                <Heart className="w-16 h-16 text-rose-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-800">Your wishlist is empty</h3>
                <button onClick={() => setCurrentView('shop')} className="mt-8 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Explore Collection</button>
              </div>
            )}
          </section>
        )}

        {currentView === 'checkout' && (
          <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <button onClick={() => setCurrentView('shop')} className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all"><ArrowLeft className="w-4 h-4" /> Back to Cart</button>
                <h2 className="text-4xl font-bold text-slate-900">Secure Checkout</h2>
                
                <div className="glass-card rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center gap-4 text-indigo-600">
                    <Truck className="w-6 h-6" />
                    <h3 className="font-bold text-xl text-slate-800">Shipping Details</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="First Name" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input placeholder="Last Name" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <input placeholder="Email Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input placeholder="Full Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="glass-card rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center gap-4 text-indigo-600">
                    <CreditCard className="w-6 h-6" />
                    <h3 className="font-bold text-xl text-slate-800">Payment Method</h3>
                  </div>
                  <div className="p-4 border-2 border-indigo-600 bg-indigo-50/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] text-white font-bold">VISA</div>
                      <span className="font-bold text-slate-700">Ending in 4242</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-32 h-fit">
                <div className="glass-card rounded-[32px] p-8 bg-slate-900 text-white">
                  <h3 className="text-2xl font-bold mb-8">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">{item.quantity}x {item.name}</span>
                        <span className="font-bold">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>${cartSubtotal}</span></div>
                    <div className="flex justify-between text-slate-400"><span>Shipping</span><span className="text-emerald-400 font-bold">FREE</span></div>
                    <div className="flex justify-between text-2xl font-bold pt-4"><span>Total</span><span>${cartSubtotal}</span></div>
                  </div>
                  <button onClick={completeOrder} className="w-full mt-8 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/50 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentView === 'success' && (
          <section className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="perspective-container text-center max-w-xl">
              <div className="glass-card rounded-[48px] p-12 three-d-hover shadow-2xl animate-float">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">Your order is on the way!</h2>
                <p className="text-slate-500 mb-10 text-lg">Thank you for choosing HomiePro. We're preparing your artisan decor with care. Check your email for tracking details.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setCurrentView('shop')} className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all">Continue Shopping</button>
                  <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-800 font-bold rounded-2xl hover:bg-slate-50 transition-all">Track Order</button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-slate-900 text-white py-24 px-6 overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-900/40">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Artisan Quality</h3>
              <p className="text-slate-400">Every piece in our catalog is hand-picked for durability and timeless design aesthetics.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10">
              <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-violet-900/40">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
              <p className="text-slate-400">Our logistics network ensures your furniture arrives safely and promptly within 5-7 business days.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-900/40">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">2 Year Warranty</h3>
              <p className="text-slate-400">We stand by our quality. Enjoy peace of mind with our comprehensive protection plans.</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]"></div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="glass-card rounded-[40px] p-12 text-center bg-gradient-to-br from-indigo-50 to-white">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Join the Inner Circle</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">Subscribe to get early access to our new collections and exclusive designer tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your professional email" className="flex-1 px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm" />
              <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Subscribe</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setCurrentView('shop')}>
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
                <span className="text-xl font-bold tracking-tight text-slate-800">Homie<span className="text-indigo-600">Pro</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Elevating living spaces with professional interior design solutions and premium home decor collections.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Collection</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button onClick={() => setCategoryAndShop('furniture')} className="hover:text-indigo-600 transition-colors">Living Room</button></li>
              <li><button onClick={() => setCategoryAndShop('lamps')} className="hover:text-indigo-600 transition-colors">Lighting Decor</button></li>
              <li><button onClick={() => setCategoryAndShop('bedsheets')} className="hover:text-indigo-600 transition-colors">Bedroom Luxury</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Help</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-indigo-600">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">FB</a>
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">IG</a>
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">TW</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
          <p>© 2024 HomiePro Decor. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={startCheckout}
      />

      <AIChat />
    </div>
  );
};

export default App;
