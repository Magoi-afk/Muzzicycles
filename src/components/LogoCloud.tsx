import React from 'react';

const logos = [
  { name: "Bons Fluidos", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Bons%20Fluidos.png" },
  { name: "Brasil Almanaque", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Brasil%20almanaque.png" },
  { name: "Ciclomagazine", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Ciclomagazine.png" },
  { name: "DCI", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/DCI.png" },
  { name: "Docol", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Docol.png" },
  { name: "Epoca", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Epoca.png" },
  { name: "Globo", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Globo.png" },
  { name: "Inovacao", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Inovacao.png" },
  { name: "Jornal de Jundiai", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Jornal%20de%20Jundiai.png" },
  { name: "Plastico Industrial", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Plastico%20Industrial.png" },
  { name: "Vo2", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/vo2.png", link: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/VO2.pdf" },
  { name: "Voce", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/voce.png" },
];

export default function LogoCloud() {
  const renderLogo = (logo: typeof logos[0], suffix = "") => {
    const Img = (
      <img
        src={logo.url}
        alt={logo.name}
        className="h-14 w-auto max-w-[180px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    );

    if (logo.link) {
      return (
        <a
          key={logo.name + suffix}
          href={logo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center cursor-pointer"
        >
          {Img}
        </a>
      );
    }

    return (
      <div
        key={logo.name + suffix}
        className="flex items-center justify-center cursor-pointer"
      >
        {Img}
      </div>
    );
  };

  return (
    <section className="flex flex-col w-full pt-5 pb-5 mb-5 items-center justify-center overflow-hidden border-t border-slate-200/30">
      <p className="text-sm text-slate-400 font-semibold tracking-wide uppercase mb-12 px-6 text-center">
        Muzzicycles na Mídia
      </p>

      <div
        className="w-full relative flex items-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="flex w-max"
          style={{
            animation: "marquee 40s linear infinite",
          }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {/* Primeiro set */}
          <div className="flex items-center gap-20 md:gap-32 pr-20 md:pr-32">
            {logos.map((logo) => renderLogo(logo))}
          </div>

          {/* Segundo set (duplicado para loop infinito) */}
          <div className="flex items-center gap-20 md:gap-32 pr-20 md:pr-32">
            {logos.map((logo) => renderLogo(logo, "-2"))}
          </div>
        </div>
      </div>

      {/* CSS da animação */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
