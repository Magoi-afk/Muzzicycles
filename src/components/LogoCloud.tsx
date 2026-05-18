import React from 'react';

const mediaItems = [
  { img: "/images/Plastico Industrial.png", pdf: "/pdfs/plasticoindustrial.pdf", name: "Plástico Industrial" },
  { img: "/images/vo2.png", pdf: "/pdfs/VO2.pdf", name: "VO2" },
  { img: "/images/voce.png", pdf: "/pdfs/RevistaGuia.pdf", name: "Você" },
  { img: "/images/Bons Fluidos.png", pdf: "/pdfs/Bons Fluidos.pdf", name: "Bons Fluidos" },
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

export default function LogoCloud() {
  const renderItems = (items: typeof mediaItems, suffix = "") => (
    <div className="flex items-center gap-12 lg:gap-24 pr-12 lg:pr-24">
      {items.map((item, index) => (
        <a
          key={`${index}${suffix}`}
          href={item.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 group transition-all duration-300"
          title={item.name}
        >
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="h-14 lg:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 opacity-50 grayscale group-hover:grayscale-0"
          />
        </a>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm border-y border-black/[0.03] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-center text-sm font-bold text-black/40 uppercase tracking-[0.2em]">
          MUZZICYCLES NA MÍDIA
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
        <div className="h-px flex-1 bg-black/[0.03]"></div>
        <p className="text-[10px] text-black/20 font-geist uppercase tracking-[0.25em] text-center whitespace-nowrap">
          Digital Consultancy & Strategy by <a href="https://www.magoi.online" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition font-bold">Magoi</a>
        </p>
        <div className="h-px flex-1 bg-black/[0.03]"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}} />
    </section>
  );
}
