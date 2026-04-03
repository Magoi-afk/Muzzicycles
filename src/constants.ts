import { Product } from './types';

export const WHATSAPP_NUMBER = '5511995997454';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NILO',
    price: 1890,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/nilo.png',
    colors: ['bg-black', 'bg-gray-400', 'bg-brand-blue'],
    description: 'Urbana Simples — Monomarcha, freios V-brake, aros 24, 26 e 29',
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
    price: 2450,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/amazonas.png',
    colors: ['bg-emerald-600', 'bg-black', 'bg-brand-blue'],
    description: 'Urbana Versátil — Câmbio Shimano TZ30 Revoshift, 7 marchas, freios V-brake',
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
    name: 'RENO',
    price: 2890,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/reno4.png',
    colors: ['bg-brand-blue', 'bg-black'],
    description: 'Aventura Urbana — Câmbio Shimano 7 marchas, freios a disco, aros 24, 26 e 29',
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
    name: 'MISSISSIPPI',
    price: 3150,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/missi.png',
    colors: ['bg-gray-200', 'bg-black'],
    description: 'Conforto & Cidade — Câmbio Nexus 3v, freios V-brake, aros 24, 26 e 29',
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
    id: '5',
    name: 'TURRI',
    price: 3890,
    image: 'https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/turri.png',
    colors: ['bg-black', 'bg-white border border-black/5'],
    description: 'Performance — Agilidade e leveza para o asfalto',
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
    id: '7',
    name: 'QUADRO MUZZI',
    price: 1200,
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
  }
];
