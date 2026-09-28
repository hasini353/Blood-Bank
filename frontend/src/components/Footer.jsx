import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-gray-900 text-white">
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} BloodConnect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;