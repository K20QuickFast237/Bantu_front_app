import React from "react";

const FonctionnalitesBusiness = () => {
  return (
    <section className="relative w-full bg-white py-16 mb-18">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <span className="bg-[#F59E0B] text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
            BantuMarket
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#F59E0B] text-center mb-2">
            Your Business Empire Awaits
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl">
            Launch, grow, and scale your business with powerful e-commerce tools and marketing features.
          </p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          {/* Online Store */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                Online Store Interface
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">Your Online Store</h3>
              <p className="text-[#6B7280] mb-2">
                Open your shop in minutes with our intuitive store builder. Customize everything from layout to payment options.
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Drag &amp; drop store builder</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Mobile-optimized templates</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Inventory management</li>
              </ul>
            </div>
          </div>
          {/* Secure Payments */}
          <div className="flex flex-col md:flex-row-reverse gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                Secure Payments System
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">Secure Payments</h3>
              <p className="text-[#6B7280] mb-2">
                Get paid safely, every time with our encrypted payment system and fraud protection.
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Multiple payment methods</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Instant payouts</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Fraud protection</li>
              </ul>
            </div>
          </div>
          {/* Product Promotion */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                Product Promotion Tools
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">Product Boosting</h3>
              <p className="text-[#6B7280] mb-2">
                Promote what matters most with targeted advertising and featured listings to reach more customers.
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Featured product listings</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Targeted advertising</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Analytics dashboard</li>
              </ul>
            </div>
          </div>
          {/* Buyer Chat */}
          <div className="flex flex-col md:flex-row-reverse gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                Buyer Chat Interface
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">Chat with Buyers</h3>
              <p className="text-[#6B7280] mb-2">
                Build trust with real conversations. Answer questions, negotiate prices, and close deals faster.
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Real-time messaging</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>File sharing</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>Order tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FonctionnalitesBusiness;