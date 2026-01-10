"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A31] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 relative rounded-xl shadow-lg bg-white p-2">
                <img
                  src="/mainLogo.png"
                  alt="NTCOG Kenya Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white">
                  NTCoG<span className="text-[#E02020]">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">
                  Kenya
                </span>
              </div>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed mb-6 font-light">
              Official document submission portal for the New Testament Church of God Kenya. Ensuring security and transparency in ministry operations.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholder */}
              <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-blue-400">Navigation</h3>
            <ul className="space-y-4">
              {['Main Website', 'About Us', 'Ministries', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`https://ntcogk.org/${item.toLowerCase().replace(' ', '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100/70 hover:text-white transition-colors text-sm font-medium flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30 mr-3 group-hover:bg-blue-400 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-blue-400">Governance</h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Use', 'Submission Guidelines', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-blue-100/70 hover:text-white transition-colors text-sm font-medium flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30 mr-3 group-hover:bg-blue-400 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-blue-400">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-tighter text-blue-400/60 font-bold mb-0.5">Email</span>
                  <span className="text-sm font-medium text-blue-100">info@ntcogk.org</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-tighter text-blue-400/60 font-bold mb-0.5">Phone</span>
                  <span className="text-sm font-medium text-blue-100">+254 759 120 222</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-100/40 font-medium">
            &copy; {new Date().getFullYear()} New Testament Church of God Kenya. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
