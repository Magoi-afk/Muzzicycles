import { Product } from './types';

export const WHATSAPP_NUMBER = '5511995997454';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NILO',
    price: 1900,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/nilo.png',
    colors: ['bg-black', 'bg-gray-400', 'bg-brand-blue'],
    description: 'Urbana Simples — Monomarcha, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.8,
    reviews: 42,
    tag: 'Pioneira',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/nilo1.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/nilo2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/nilo3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Monomarcha',
      brakes: 'V-Brake Alumínio',
      weight: '11.5kg'
    }
  },
  {
    id: '2',
    name: 'AMAZONAS',
    price: 2800,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/amazonas.png',
    colors: ['bg-emerald-600', 'bg-black', 'bg-brand-blue'],
    description: 'Urbana Versátil — Câmbio Shimano TZ30 Revoshift, 7 marchas, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.9,
    reviews: 56,
    tag: 'Versátil',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/amazonas2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/amazonas3.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/amazonas4.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano TZ30 7 Velocidades',
      brakes: 'V-Brake Alumínio',
      weight: '12.2kg'
    }
  },
  {
    id: '3',
    name: 'MONTAIN BIKE',
    price: 3600,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/reno4.png',
    colors: ['bg-brand-blue', 'bg-black'],
    description: 'Aventura Urbana — Câmbio Shimano 7 marchas, freios a disco, aros 24, 26, 29 e 32',
    rating: 4.7,
    reviews: 38,
    tag: 'Aventura',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Aventura',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/reno1.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/reno2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/reno3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano 7 Velocidades',
      brakes: 'Disco Mecânico',
      weight: '12.8kg'
    }
  },
  {
    id: '4',
    name: 'MISSISSIPPI 3V',
    price: 4300,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/missi.png',
    colors: ['bg-gray-200', 'bg-black'],
    description: 'Conforto & Cidade — Câmbio Nexus 3v, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.9,
    reviews: 24,
    tag: 'Conforto',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi6.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano Nexus 3v',
      brakes: 'V-Brake Alumínio',
      weight: '13.1kg'
    }
  },
  {
    id: '8',
    name: 'MISSISSIPPI 5V',
    price: 6300,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/missi.png',
    colors: ['bg-gray-200', 'bg-black'],
    description: 'Conforto & Cidade — Câmbio Nexus 5v, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.9,
    reviews: 24,
    tag: 'Conforto',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi6.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano Nexus 5v',
      brakes: 'V-Brake Alumínio',
      weight: '13.3kg'
    }
  },
  {
    id: '9',
    name: 'MISSISSIPPI 8V',
    price: 8500,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/missi.png',
    colors: ['bg-gray-200', 'bg-black'],
    description: 'Conforto & Cidade — Câmbio Nexus 8v, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.9,
    reviews: 24,
    tag: 'Conforto',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi6.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/mississipi3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano Nexus 8v',
      brakes: 'V-Brake Alumínio',
      weight: '13.5kg'
    }
  },
  {
    id: '5',
    name: 'TURRI',
    price: 4500,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/turri.png',
    colors: ['bg-black', 'bg-white border border-black/5'],
    description: 'Performance — Agilidade e leveza para o asfalto, aros 24, 26, 29 e 32',
    rating: 5.0,
    reviews: 15,
    tag: 'Performance',
    tagColor: 'bg-brand-blue text-white',
    category: 'Performance',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/turri1.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/turri2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/turri3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano 9 Velocidades',
      brakes: 'Disco Hidráulico',
      weight: '10.9kg'
    }
  },
  {
    id: '10',
    name: 'QUADRO MONTAIN BIKE',
    price: 1400,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro4.png',
    colors: ['bg-black', 'bg-brand-blue', 'bg-emerald-500'],
    description: 'Quadro avulso Montain Bike — 100% plástico reciclado, sem soldas',
    rating: 4.9,
    reviews: 112,
    tag: 'Base MTB',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Componentes',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro4.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'N/A',
      brakes: 'Suporte V-Brake/Disco',
      weight: '4.8kg'
    }
  },
  {
    id: '7',
    name: 'QUADRO MUZZI',
    price: 900,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro4.png',
    colors: ['bg-black', 'bg-brand-blue', 'bg-emerald-500'],
    description: 'Quadro avulso — 100% plástico reciclado, sem soldas',
    rating: 4.9,
    reviews: 112,
    tag: 'Base',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Componentes',
    additionalImages: [
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro4.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro2.png',
      'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/quadro3.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'N/A',
      brakes: 'Suporte V-Brake/Disco',
      weight: '4.8kg'
    }
  },
  {
    id: 'h1',
    name: 'MUZZI 1998',
    price: 0,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/nilo.png',
    colors: ['bg-gray-400'],
    description: 'O primeiro protótipo funcional — O início da revolução do polímero reciclado.',
    rating: 5.0,
    reviews: 0,
    tag: 'Histórico',
    tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
    category: 'Urbana',
    isAcervo: true,
    specs: {
      frame: 'Polímero Experimental',
      transmission: 'Monomarcha',
      brakes: 'V-Brake',
      weight: '14.0kg'
    }
  },
  {
    id: 'h2',
    name: 'MODELO EXPO 2005',
    price: 0,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/amazonas.png',
    colors: ['bg-brand-blue'],
    description: 'Edição especial de exposição — Vencedora de prêmios internacionais de design sustentável.',
    rating: 5.0,
    reviews: 0,
    tag: 'Premiada',
    tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
    category: 'Urbana',
    isAcervo: true,
    specs: {
      frame: 'Polímero Reforçado',
      transmission: 'Shimano 3v',
      brakes: 'V-Brake',
      weight: '12.5kg'
    }
  }
];
