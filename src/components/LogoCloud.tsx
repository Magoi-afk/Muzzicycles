import React from 'react';
import { useTranslation } from 'react-i18next';

const mediaItems = [
  { img: "/images/Plastico Industrial.png", pdf: "/pdfs/plasticoindustrial.pdf", name: "Plástico Industrial" },
  { img: "/images/vo2.png", pdf: "/pdfs/VO2.pdf", name: "VO2" },
  { img: "/images/voce.png", pdf: "/pdfs/RevistaGuia.pdf", name: "Você" },
  { img: "/images/Bons Fluidos.png", pdf: "/pdfs/(Bons Fluidos.pdf)", name: "Bons Fluidos" },
  { img: "/images/Brasil almanaque.png", pdf: "/pdfs/Brasil Almanaque.pdf", name: "Brasil Almanaque" },
  { img: "/images/Ciclomagazine.png", pdf: "/pdfs/Cyclomagazine.pdf", name: "Ciclomagazine" },
  { img: "/images/DCI.png", pdf: "/pdfs/DCI.PDF", name: "DCI" },
  { img: "/images/desafio.png", pdf: "/pdfs/Design.pdf", name: "Desafio" },
  { img: "/images/Docol.png", pdf: "/pdfs/Docol.pdf", name: "Docol" },
  { img: "/images/Epoca.png", pdf: "/pdfs/Epoca.pdf", name: "Época" },
  { img: "/images/Globo.png", pdf: "/pdfs/globo.pdf", name: "Globo" },
  { img: "/images/Inovacao.png", pdf: "/pdfs/Inovacao.pdf", name: "Inovação" },
  { img: "/images/Jornal de Jundiai.png", pdf: "/pdfs/JornaldeJundiai.pdf", name: "Jornal de Jundiaí" },
];

function BrandLogoFallback({ name }: { name: string }) {
  const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  switch (normalized) {
    case "globo":
      return (
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 100 100" className="h-7 w-7 text-black/70 fill-current">
            <circle cx="50" cy="50" r="45" />
            <rect x="25" y="25" width="50" height="50" rx="12" className="text-white fill-current animate-pulse" style={{ fill: 'white' }} />
            <circle cx="50" cy="50" r="16" className="text-black/70 fill-current" />
          </svg>
          <span className="font-sans font-bold lowercase tracking-tighter text-lg text-black/80">globo</span>
        </div>
      );
    case "epoca":
      return (
        <span className="font-serif font-black text-xl tracking-tighter text-black/80">ÉPOCA</span>
      );
    case "vo2":
      return (
        <div className="flex items-center">
          <span className="font-sans font-black italic text-xl tracking-tighter text-black/80">VO</span>
          <span className="font-sans font-black italic text-xl text-brand-blue tracking-tighter">2</span>
        </div>
      );
    case "voce":
      return (
        <span className="font-serif font-bold italic text-lg tracking-tight text-black/85">você</span>
      );
    case "bons fluidos":
      return (
        <div className="flex flex-col items-center leading-none">
          <span className="font-sans font-light tracking-[0.2em] text-[10px] text-black/50 uppercase">BONS</span>
          <span className="font-serif font-bold italic text-xs text-black/80 mt-0.5">fluidos</span>
        </div>
      );
    case "brasil almanaque":
      return (
        <span className="font-serif italic text-base text-black/75 tracking-wide">Brasil Almanaque</span>
      );
    case "ciclomagazine":
      return (
        <span className="font-sans font-black uppercase tracking-wider text-xs text-black/80">CICLOMAGAZINE</span>
      );
    case "dci":
      return (
        <span className="font-sans font-black tracking-tight text-xl text-black/85">DCI</span>
      );
    case "desafio":
      return (
        <span className="font-sans font-bold tracking-[0.2em] text-[10px] text-black/75 uppercase">DESAFIO</span>
      );
    case "docol":
      return (
        <span className="font-sans font-light tracking-[0.35em] text-[11px] text-black/70 uppercase">docol</span>
      );
    case "inovacao":
      return (
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          <span className="font-sans font-bold tracking-[0.2em] text-[10px] text-black/85 uppercase">INOVAÇÃO</span>
        </div>
      );
    case "jornal de jundiai":
      return (
        <div className="flex flex-col items-center leading-none">
          <span className="font-serif font-black tracking-[0.15em] text-[8px] text-black/40 uppercase">JORNAL DE</span>
          <span className="font-sans font-black tracking-widest text-xs text-black/80 mt-0.5 animate-fade-in">JUNDIAÍ</span>
        </div>
      );
    case "plastico industrial":
      return (
        <div className="flex flex-col items-center leading-none">
          <span className="font-sans font-extrabold tracking-widest text-[10px] text-black/80 uppercase">PLÁSTICO</span>
          <span className="font-sans font-light tracking-[0.15em] text-[7px] text-black/50 mt-0.5">INDUSTRIAL</span>
        </div>
      );
    default:
      return (
        <div className="h-8 px-3 flex items-center justify-center rounded-lg bg-black/5 text-black/50 font-bold text-sm">
          {name}
        </div>
      );
  }
}

export default function LogoCloud() {
  const { t } = useTranslation();

  const renderItems = (items: typeof mediaItems, suffix = "") => (
    <div className="flex items-center gap-20 lg:gap-32 pr-20 lg:pr-32">
      {items.map((item, index) => (
        <a
          key={`${index}${suffix}`}
          href={item.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:opacity-100 opacity-60 grayscale hover:grayscale-0 flex items-center justify-center py-4 px-8 group min-w-[200px]"
          title={item.name}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-10 lg:h-12 w-auto flex items-center justify-center">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  (e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement)?.classList.remove('hidden');
                }}
              />
              {/* If image fails, show a beautifully styled brand logo */}
              <div className="fallback-icon hidden h-10 flex items-center justify-center">
                <BrandLogoFallback name={item.name} />
              </div>
            </div>
            <span className="text-[11px] font-black text-black/40 uppercase tracking-[0.15em] text-center group-hover:text-brand-blue transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm border-y border-black/[0.03] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-center text-sm font-bold text-black/40 uppercase tracking-[0.2em]">
          {t('logocloud.title')}
        </h2>
      </div>
      
      <div 
        className="relative flex overflow-hidden group/marquee"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div 
          className="flex w-max animate-scroll"
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {renderItems(mediaItems)}
          {renderItems(mediaItems, "-2")}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 flex justify-center items-center gap-4">
        <div className="hidden sm:block h-px flex-1 bg-black/[0.03]"></div>
        <p className="text-[9px] sm:text-[10px] text-black/20 font-geist uppercase tracking-[0.18em] sm:tracking-[0.25em] text-center max-w-xs sm:max-w-none">
          {t('logocloud.consultancy')}{' '}
          <a href="https://www.magoi.online" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition font-bold whitespace-nowrap">
            Magoi
          </a>
        </p>
        <div className="hidden sm:block h-px flex-1 bg-black/[0.03]"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: marquee-scroll 40s linear infinite;
        }
      `}} />
    </section>
  );
}
