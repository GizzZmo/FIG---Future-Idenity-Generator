
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Future Identity Generator
      </h1>
      <p className="mt-3 text-lg text-gray-400">
        Peer into the near future. Generate fictional identities from across the globe, ten years from now.
      </p>
    </header>
  );
};

export default Header;
