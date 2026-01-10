"use client";

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative rounded-xl shadow-inner bg-gray-50 p-2 border border-gray-100">
              <img
                src="/mainLogo.png"
                alt="NTCOG Kenya Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none">
                NTCoG<span className="text-[#E02020]">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1E4E9A] font-bold">
                Kenya Submissions
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="https://ntcogk.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#1E4E9A] transition-all font-semibold text-sm uppercase tracking-wider"
            >
              Main Website
            </a>
            <a
              href="https://ntcogk.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#1E4E9A] text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-100"
            >
              Contact Support
            </a>
          </nav>

          {/* Mobile menu button (Simplified for now) */}
          <div className="md:hidden flex items-center">
            <a
              href="https://ntcogk.org/contact"
              className="p-2 text-[#1E4E9A]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
