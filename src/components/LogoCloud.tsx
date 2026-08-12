import React from 'react';
import { useTranslation } from 'react-i18next';

export interface PartnerMedia {
  name: string;
  logoUrl: string;
  pdfUrl: string;
}

const partnerMedia: PartnerMedia[] = [
  {
    name: "Plastic Industrial",
    logoUrl: "/images/plastico_industrial.webp",
    pdfUrl: "/pdfs/plasticoindutrial.pdf"
  },
  {
    name: "VO2Bike",
    logoUrl: "/images/vo2.webp",
    pdfUrl: "/pdfs/VO2.pdf"
  },
  {
    name: "Você / Revista Guia",
    logoUrl: "/images/voce.webp",
    pdfUrl: "/pdfs/RevistaGuia.pdf"
  },
  {
    name: "Brasil Almanaque",
    logoUrl: "/images/brasil_almanaque.webp",
    pdfUrl: "/pdfs/Brasil Almanaque.pdf"
  },
  {
    name: "Ciclomagazine",
    logoUrl: "/images/ciclomagazine.webp",
    pdfUrl: "/pdfs/Cyclomagazine.pdf"
  },
  {
    name: "DCI",
    logoUrl: "/images/dci.webp",
    pdfUrl: "/pdfs/DCI.pdf"
  },
  {
    name: "Docol",
    logoUrl: "/images/docol.webp",
    pdfUrl: "/pdfs/Docol.pdf"
  },
  {
    name: "Época",
    logoUrl: "/images/epoca.webp",
    pdfUrl: "/pdfs/Epoca.pdf"
  },
  {
    name: "O Globo",
    logoUrl: "/images/globo.webp",
    pdfUrl: "/pdfs/globo.pdf"
  },
  {
    name: "Bons Fluidos",
    logoUrl: "/images/bons_fluidos.webp",
    pdfUrl: "/pdfs/Bons Fluidos.pdf"
  },
  {
    name: "Inovação",
    logoUrl: "/images/inovacao.webp",
    pdfUrl: "/pdfs/Inovacao.pdf"
  },
  {
    name: "Jornal de Jundiaí",
    logoUrl: "/images/jornal_jundiai.webp",
    pdfUrl: "/pdfs/JornaldeJundiai.pdf"
  }
];

function BrandLogoFallback({ name }: { name: string }) {
  const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (normalized.includes("globo")) {
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
  }
  if (normalized.includes("epoca")) {
    return (
      <span className="font-serif font-black text-xl tracking-tighter text-black/80">ÉPOCA</span>
    );
  }
  if (normalized.includes("vo2")) {
    return (
      <div className="flex items-center">
        <span className="font-sans font-black italic text-xl tracking-tighter text-black/80">VO</span>
        <span className="font-sans font-black italic text-xl text-brand-blue tracking-tighter">2</span>
      </div>
    );
  }
  if (normalized.includes("voce")) {
    return (
      <span className="font-serif font-bold italic text-lg tracking-tight text-black/85">você</span>
    );
  }
  if (normalized.includes("bons fluidos")) {
    return (
      <div className="flex flex-col items-center leading-none">
        <span className="font-sans font-light tracking-[0.2em] text-[10px] text-black/50 uppercase">BONS</span>
        <span className="font-serif font-bold italic text-xs text-black/80 mt-0.5">fluidos</span>
      </div>
    );
  }
  if (normalized.includes("brasil alman")) {
    return (
      <span className="font-serif italic text-base text-black/75 tracking-wide">Brasil Almanaque</span>
    );
  }
  if (normalized.includes("ciclo") || normalized.includes("cyclo")) {
    return (
      <span className="font-sans font-black uppercase tracking-wider text-xs text-black/80">CICLOMAGAZINE</span>
    );
  }
  if (normalized.includes("dci")) {
    return (
      <span className="font-sans font-black tracking-tight text-xl text-black/85">DCI</span>
    );
  }
  if (normalized.includes("desafio")) {
    return (
      <span className="font-sans font-bold tracking-[0.2em] text-[10px] text-black/75 uppercase">DESAFIO</span>
    );
  }
  if (normalized.includes("docol")) {
    return (
      <span className="font-sans font-light tracking-[0.35em] text-[11px] text-black/70 uppercase">docol</span>
    );
  }
  if (normalized.includes("inovacao")) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
        <span className="font-sans font-bold tracking-[0.2em] text-[10px] text-black/85 uppercase">INOVAÇÃO</span>
      </div>
    );
  }
  if (normalized.includes("jundiai")) {
    return (
      <div className="flex flex-col items-center leading-none">
        <span className="font-serif font-black tracking-[0.15em] text-[8px] text-black/40 uppercase">JORNAL DE</span>
        <span className="font-sans font-black tracking-widest text-xs text-black/80 mt-0.5 animate-fade-in">JUNDIAÍ</span>
      </div>
    );
  }
  if (normalized.includes("plastic")) {
    return (
      <div className="flex flex-col items-center leading-none">
        <span className="font-sans font-extrabold tracking-widest text-[10px] text-black/80 uppercase">PLÁSTICO</span>
        <span className="font-sans font-light tracking-[0.15em] text-[7px] text-black/50 mt-0.5">INDUSTRIAL</span>
      </div>
    );
  }
  return (
    <div className="h-8 px-3 flex items-center justify-center rounded-lg bg-black/5 text-black/50 font-bold text-sm">
      {name}
    </div>
  );
}

export default function LogoCloud() {
  const { t } = useTranslation();

  const renderItems = (items: PartnerMedia[], suffix = "") => (
    <div className="flex items-center gap-20 lg:gap-32 pr-20 lg:pr-32">
      {items.map((item, index) => (
        <a
          key={`${index}${suffix}`}
          href={item.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100 flex items-center justify-center py-4 px-8 group min-w-[200px]"
          title={item.name}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-12 lg:h-14 w-auto flex items-center justify-center animate-fade-in">
              <img
                src={item.logoUrl}
                alt={item.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-12 lg:h-14 w-auto object-contain max-w-[180px] select-none pointer-events-none"
              />
            </div>
            <span className="text-[11px] font-bold text-black/50 uppercase tracking-[0.15em] text-center group-hover:text-brand-blue transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <section id="logo-cloud-section" className="py-20 bg-white/50 backdrop-blur-sm border-y border-black/[0.03] overflow-hidden">
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
          {renderItems(partnerMedia)}
          {renderItems(partnerMedia, "-2")}
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
