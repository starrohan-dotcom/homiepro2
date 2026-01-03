
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Modern Living Reimagined
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
            Elegance for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Every Corner.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Curated premium furniture, lighting, and bedding designed to transform your space into a sanctuary of professional aesthetics and comfort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2">
              Explore Collection <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-2xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all">
              View Showcase
            </button>
          </div>
        </div>

        <div className="flex-1 relative perspective-container">
          <div className="relative w-full aspect-square three-d-hover">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000" 
              alt="Premium Furniture Showcase" 
              className="rounded-[40px] shadow-2xl object-cover w-full h-full border-[12px] border-white/50"
            />
            {/* Floating 3D Elements */}
            <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl shadow-xl animate-bounce">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold">★</div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Top Rated</p>
                  <p className="text-[10px] text-slate-500">2024 Collection</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-6 glass-card p-4 rounded-2xl shadow-xl animate-pulse">
              <p className="text-indigo-600 font-bold text-xl">40% OFF</p>
              <p className="text-xs text-slate-500">First Purchase</p>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100/50 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </section>
  );
};
