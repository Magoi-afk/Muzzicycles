const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to render SVG string to WebP file
async function createWebpFromSvg(svgString, filename, quality = 85) {
  const filePath = path.join(outDir, filename);
  await sharp(Buffer.from(svgString))
    .webp({ quality })
    .toFile(filePath);
  console.log(`Generated: ${filename}`);
}

// Helper to convert existing image file to WebP
async function convertFileToWebp(srcPath, destFilename, resizeWidth = null, quality = 85) {
  let instance = sharp(srcPath);
  if (resizeWidth) {
    instance = instance.resize(resizeWidth);
  }
  const destPath = path.join(outDir, destFilename);
  await instance.webp({ quality }).toFile(destPath);
  console.log(`Converted: ${destFilename}`);
}

async function run() {
  console.log('Starting WebP asset generation...');

  // 1. Hero Bike (from regenerated_image_1778029817416.jpg)
  const heroSrc = path.join(__dirname, '../src/assets/images/regenerated_image_1778029817416.jpg');
  if (fs.existsSync(heroSrc)) {
    await convertFileToWebp(heroSrc, 'hero_bike.webp', 800, 85);
    await convertFileToWebp(heroSrc, 'hero_bike_mobile.webp', 400, 80);
  }

  // 2. Muzzicycles Logo (High resolution vector logo converted to WebP)
  const logoSvg = `
  <svg width="600" height="160" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0052FF" />
        <stop offset="100%" stop-color="#0034A8" />
      </linearGradient>
    </defs>
    <!-- Bike Frame Icon -->
    <g transform="translate(10, 20)">
      <circle cx="45" cy="85" r="32" stroke="#0052FF" stroke-width="8" fill="none"/>
      <circle cx="165" cy="85" r="32" stroke="#0052FF" stroke-width="8" fill="none"/>
      <path d="M45 85 L95 85 L135 35 L75 35 Z" fill="url(#brandGrad)"/>
      <path d="M95 85 L165 85 L135 35 Z" fill="none" stroke="#0052FF" stroke-width="6"/>
      <path d="M135 35 L125 15 H145" stroke="#1E293B" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M75 35 L65 20 H85" stroke="#1E293B" stroke-width="6" stroke-linecap="round" fill="none"/>
    </g>
    <!-- Text -->
    <text x="210" y="82" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" fill="#0052FF" letter-spacing="2">MUZZI</text>
    <text x="390" y="82" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="300" fill="#0F172A" letter-spacing="1">CYCLES</text>
    <text x="212" y="112" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#64748B" letter-spacing="3">BIKES DE PLÁSTICO RECICLADO</text>
  </svg>`;
  await createWebpFromSvg(logoSvg, 'LogoMuzzi.webp', 90);

  // 3. Product Images (Nilo, Amazonas, Montain Bike, Mississippi, Turri, Quadros)
  
  // Bike SVG Template Generator
  function makeBikeSvg(frameColor, title, tag, accentColor = '#0052FF', isMTB = false) {
    return `
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F8FAFC"/>
          <stop offset="100%" stop-color="#F1F5F9"/>
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" flood-opacity="0.08"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bgGrad)"/>
      <g filter="url(#shadow)" transform="translate(80, 70)">
        <!-- Wheels -->
        <circle cx="150" cy="340" r="110" stroke="#1E293B" stroke-width="18" fill="none"/>
        <circle cx="150" cy="340" r="95" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <circle cx="150" cy="340" r="12" fill="#475569"/>
        
        <circle cx="490" cy="340" r="110" stroke="#1E293B" stroke-width="18" fill="none"/>
        <circle cx="490" cy="340" r="95" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <circle cx="490" cy="340" r="12" fill="#475569"/>
        
        <!-- Spokes -->
        ${Array.from({length: 12}).map((_, i) => `<line x1="150" y1="340" x2="${150 + 95 * Math.cos(i*Math.PI/6)}" y2="${340 + 95 * Math.sin(i*Math.PI/6)}" stroke="#CBD5E1" stroke-width="2"/>`).join('')}
        ${Array.from({length: 12}).map((_, i) => `<line x1="490" y1="340" x2="${490 + 95 * Math.cos(i*Math.PI/6)}" y2="${340 + 95 * Math.sin(i*Math.PI/6)}" stroke="#CBD5E1" stroke-width="2"/>`).join('')}

        <!-- Recycled Monocoque Polymer Frame (Muzzi Signature Seamless Design) -->
        <path d="M150 340 L290 340 L410 180 L230 180 Z" fill="${frameColor}" rx="12"/>
        <path d="M290 340 L490 340 L410 180 Z" fill="${frameColor}" opacity="0.9"/>
        
        <!-- Saddle and Seatpost -->
        <path d="M230 180 L220 120" stroke="#334155" stroke-width="10" stroke-linecap="round"/>
        <path d="M190 115 C200 110, 240 110, 250 120 C240 130, 210 130, 190 115 Z" fill="#0F172A"/>

        <!-- Handlebars & Front Fork -->
        <path d="M410 180 L480 330" stroke="${frameColor}" stroke-width="16" stroke-linecap="round"/>
        <path d="M410 180 L400 110 L430 100" stroke="#334155" stroke-width="10" stroke-linecap="round" fill="none"/>
        <path d="M420 100 H460" stroke="#0052FF" stroke-width="12" stroke-linecap="round"/>

        <!-- Chain & Pedals -->
        <circle cx="290" cy="340" r="28" fill="#334155"/>
        <path d="M290 340 L275 375" stroke="#0284C7" stroke-width="8" stroke-linecap="round"/>
        <rect x="260" y="370" width="30" height="12" rx="4" fill="#0F172A"/>
        <path d="M290 340 L490 340" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
      </g>
      <!-- Title Badge -->
      <rect x="50" y="40" width="220" height="42" rx="21" fill="${accentColor}" fill-opacity="0.1"/>
      <text x="160" y="67" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${accentColor}" text-anchor="middle">${tag}</text>
      <text x="400" y="550" font-family="Arial, sans-serif" font-size="28" font-weight="800" fill="#0F172A" text-anchor="middle" letter-spacing="1">MUZZI ${title}</text>
    </svg>`;
  }

  // Frame SVG Template Generator
  function makeFrameSvg(frameColor, title, tag) {
    return `
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#F8FAFC"/>
      <g transform="translate(120, 100)">
        <!-- Monocoque Polymer Frame Alone -->
        <path d="M100 300 L260 300 L400 120 L200 120 Z" fill="${frameColor}" rx="16"/>
        <path d="M260 300 L480 300 L400 120 Z" fill="${frameColor}" opacity="0.85"/>
        <circle cx="100" cy="300" r="20" fill="none" stroke="#0F172A" stroke-width="8"/>
        <circle cx="480" cy="300" r="20" fill="none" stroke="#0F172A" stroke-width="8"/>
        <circle cx="260" cy="300" r="30" fill="none" stroke="#0052FF" stroke-width="10"/>
        <path d="M200 120 L195 70" stroke="#334155" stroke-width="12" stroke-linecap="round"/>
        <path d="M400 120 L395 70" stroke="#334155" stroke-width="12" stroke-linecap="round"/>
      </g>
      <rect x="50" y="40" width="240" height="42" rx="21" fill="#0052FF" fill-opacity="0.1"/>
      <text x="170" y="67" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0052FF" text-anchor="middle">${tag}</text>
      <text x="400" y="530" font-family="Arial, sans-serif" font-size="26" font-weight="800" fill="#0F172A" text-anchor="middle">${title}</text>
    </svg>`;
  }

  // Diagram SVG Template Generator
  function makeDiagramSvg(title) {
    return `
    <svg width="1000" height="700" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="700" fill="#FFFFFF"/>
      <rect x="20" y="20" width="960" height="660" rx="12" fill="none" stroke="#E2E8F0" stroke-width="2"/>
      <!-- Grid -->
      ${Array.from({length: 10}).map((_, i) => `<line x1="${100*i}" y1="0" x2="${100*i}" y2="700" stroke="#F1F5F9" stroke-width="1"/>`).join('')}
      ${Array.from({length: 7}).map((_, i) => `<line x1="0" y1="${100*i}" x2="1000" y2="${100*i}" stroke="#F1F5F9" stroke-width="1"/>`).join('')}
      
      <!-- Frame Outline with Dimension Lines -->
      <g transform="translate(180, 120)">
        <path d="M100 360 L280 360 L440 140 L220 140 Z" fill="none" stroke="#0052FF" stroke-width="6"/>
        <path d="M280 360 L520 360 L440 140 Z" fill="none" stroke="#0052FF" stroke-width="6"/>
        
        <!-- Dimension Arrow Lines -->
        <line x1="100" y1="420" x2="520" y2="420" stroke="#64748B" stroke-width="2" stroke-dasharray="4"/>
        <text x="310" y="445" font-family="Arial" font-size="16" fill="#0F172A" text-anchor="middle" font-weight="bold">Entre-eixos: 1080 mm</text>
        
        <line x1="220" y1="100" x2="440" y2="100" stroke="#64748B" stroke-width="2" stroke-dasharray="4"/>
        <text x="330" y="90" font-family="Arial" font-size="16" fill="#0F172A" text-anchor="middle" font-weight="bold">Top Tube: 560 mm</text>

        <line x1="40" y1="140" x2="40" y2="360" stroke="#64748B" stroke-width="2" stroke-dasharray="4"/>
        <text x="25" y="250" font-family="Arial" font-size="16" fill="#0F172A" text-anchor="middle" font-weight="bold" transform="rotate(-90,25,250)">Seat Tube: 460 mm</text>
      </g>
      <text x="500" y="70" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#0F172A" text-anchor="middle">${title}</text>
    </svg>`;
  }

  // Press Logo SVG Generator
  function makePressLogoSvg(name) {
    return `
    <svg width="400" height="180" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="180" fill="#FFFFFF" rx="8"/>
      <rect x="10" y="10" width="380" height="160" fill="none" stroke="#F1F5F9" stroke-width="2" rx="6"/>
      <text x="200" y="100" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="bold" fill="#334155" text-anchor="middle">${name}</text>
    </svg>`;
  }

  // Generate All Product Images
  const productsToGen = [
    { title: 'NILO', tag: 'URBANA SIMPLES', color: '#EAB308', main: 'nilo.webp', mobile: 'nilo_mobile.webp', gallery: ['nilo1.webp', 'nilo2.webp', 'nilo3.webp', 'nilo_freio.webp', 'nilo_pedal.webp'] },
    { title: 'AMAZONAS', tag: 'URBANA VERSÁTIL 7V', color: '#059669', main: 'amazonas.webp', mobile: 'amazonas_mobile.webp', gallery: ['amazonas1.webp', 'amazonas2.webp', 'amazonas3.webp', 'amazonas4.webp'] },
    { title: 'MONTAIN BIKE', tag: 'AVENTURA DISCO', color: '#0052FF', main: 'bike_azul.webp', mobile: 'bike_azul_mobile.webp', gallery: ['bike_azul_lado.webp', 'bike_azul_frente.webp', 'bike_azul_aros.webp', 'bike_azul_freio.webp'] },
    { title: 'MISSISSIPPI', tag: 'CONFORTO NEXUS', color: '#64748B', main: 'ela.webp', mobile: 'ela_mobile.webp', gallery: [] },
    { title: 'TURRI', tag: 'PERFORMANCE 9V', color: '#0F172A', main: 'turri.webp', mobile: 'turri_mobile.webp', gallery: ['turri1.webp', 'turri2.webp', 'turri3.webp'] },
  ];

  for (const item of productsToGen) {
    const mainSvg = makeBikeSvg(item.color, item.title, item.tag, item.color === '#0F172A' ? '#0052FF' : item.color);
    await createWebpFromSvg(mainSvg, item.main, 85);
    await createWebpFromSvg(mainSvg, item.mobile, 75);

    for (let i = 0; i < item.gallery.length; i++) {
      const galSvg = makeBikeSvg(item.color, `${item.title} - DETALHE ${i+1}`, item.tag, '#0052FF');
      await createWebpFromSvg(galSvg, item.gallery[i], 80);
    }
  }

  // Generate Standalone Frames
  await createWebpFromSvg(makeFrameSvg('#0052FF', 'QUADRO MONTAIN BIKE MUZZI', '100% POLÍMERO RECICLADO'), 'quadro_mtb_1.webp', 85);
  await createWebpFromSvg(makeFrameSvg('#0052FF', 'QUADRO MONTAIN BIKE MUZZI', '100% POLÍMERO RECICLADO'), 'quadro_mtb_1_mobile.webp', 75);
  await createWebpFromSvg(makeFrameSvg('#059669', 'QUADRO MONTAIN BIKE VERDE', 'DETALHE'), 'quadro_mtb_2.webp', 80);
  await createWebpFromSvg(makeFrameSvg('#EAB308', 'QUADRO MONTAIN BIKE AMARELO', 'DETALHE'), 'quadro_mtb_4.webp', 80);

  await createWebpFromSvg(makeFrameSvg('#0052FF', 'QUADRO MUZZI URBANO', '100% POLÍMERO RECICLADO'), 'quadro4.webp', 85);
  await createWebpFromSvg(makeFrameSvg('#0052FF', 'QUADRO MUZZI URBANO', '100% POLÍMERO RECICLADO'), 'quadro4_mobile.webp', 75);

  // Diagrams
  await createWebpFromSvg(makeDiagramSvg('GEOMETRIA QUADRO MUZZICYCLES'), 'geometria_quadro.webp', 85);
  await createWebpFromSvg(makeDiagramSvg('MEDIDAS QUADRO MUZZI ARO 26'), 'medidas_muzzi_aro26.webp', 85);

  // Press Logos
  const pressLogos = [
    { name: 'Plástico Industrial', file: 'plastico_industrial.webp' },
    { name: 'VO2 Magazine', file: 'vo2.webp' },
    { name: 'Você S/A', file: 'voce.webp' },
    { name: 'Brasil Almanaque', file: 'brasil_almanaque.webp' },
    { name: 'CicloMagazine', file: 'ciclomagazine.webp' },
    { name: 'DCI', file: 'dci.webp' },
    { name: 'Docol', file: 'docol.webp' },
    { name: 'Época', file: 'epoca.webp' },
    { name: 'Rede Globo', file: 'globo.webp' },
    { name: 'Bons Fluidos', file: 'bons_fluidos.webp' },
    { name: 'Inovação Unicamp', file: 'inovacao.webp' },
    { name: 'Jornal de Jundiaí', file: 'jornal_jundiai.webp' },
  ];

  for (const pl of pressLogos) {
    await createWebpFromSvg(makePressLogoSvg(pl.name), pl.file, 80);
  }

  console.log('All WebP images successfully generated!');
}

run().catch(err => {
  console.error('Image generation error:', err);
  process.exit(1);
});
