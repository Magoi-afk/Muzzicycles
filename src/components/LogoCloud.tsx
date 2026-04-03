import React from 'react';

const logos = [
  { name: "Bons Fluidos", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Bons%20Fluidos%20(1).png" },
  { name: "Brasil Almanaque", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Brasil%20almanaque%20(1).png" },
  { name: "Ciclomagazine", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Ciclomagazine.png" },
  { name: "DCI", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/DCI.png" },
  { name: "Docol", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Docol.png" },
  { name: "Epoca", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Epoca.png" },
  { name: "Globo", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Globo.png" },
  { name: "Inovacao", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Inovacao.png" },
  { name: "Jornal de Jundiai", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Jornal%20de%20Jundiai.png" },
  { name: "Plastico Industrial", url: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Plastico%20Industrial.png" },
];

export default function LogoCloud() {
  return (
    <section className="flex flex-col w-full py-20 items-center justify-center overflow-hidden border-t border-slate-200/30">
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
          <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center cursor-pointer"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-10 w-auto max-w-[120px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          {/* Segundo set (duplicado para loop infinito) */}
          <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
            {logos.map((logo) => (
              <div
                key={logo.name + "-2"}
                className="flex items-center justify-center cursor-pointer"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-10 w-auto max-w-[120px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
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
