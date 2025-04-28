import React from 'react';

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-4 text-center mb-8 pt-6 pb-4 w-full">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-[36px] md:text-[64px] font-bold leading-[1.1em] text-center bg-[radial-gradient(43%_228.297%_at_50%_60.6452%,rgba(0,0,0,0.8)_0%,rgb(131,131,131)_100%)] bg-clip-text text-transparent mb-7">
          Font Awesome Explorer
        </h1>
        <p className="text-[18px] md:text-[24px] font-medium text-black/50 leading-[145%] text-center max-w-2xl mx-auto mb-4">
          Explorez la collection complète d&apos;icônes Font Awesome pro et trouvez celle qui correspond à votre projet
        </p>
      </div>
    </div>
  );
} 