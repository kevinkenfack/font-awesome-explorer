import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f9f9f9] border-t border-gray-100 py-6 mt-1 flex flex-col items-center text-center text-gray-500 text-sm">
      <div className="mb-2">
        <a
          href="https://github.com/kevinkenfack/font-awesome-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Voir sur GitHub
        </a>
      </div>
      <div>
        © {new Date().getFullYear()} kevinkenfack — Font Awesome Explorer
      </div>
    </footer>
  );
};

export default Footer;
