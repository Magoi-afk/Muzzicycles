import { Product } from './types';

export const WHATSAPP_NUMBER = '5511973868371';
export const PHYSICAL_PHONE = '(11) 3966-6533';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NILO',
    price: 1900,
    image: '/images/Bikeamarela.jpg',
    colors: ['bg-yellow-400', 'bg-black', 'bg-gray-400'],
    description: 'Urbana Simples — Monomarcha, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.8,
    reviews: 42,
    tag: 'Pioneira',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      '/images/BikeamarelaFrente.jpg',
      '/images/FrenteBikeamarela.jpg',
      '/images/BancoBikeamarela.jpg',
      '/images/BancocorodatraseiraBikeamarela.jpg',
      '/images/FreioBikeamarela.jpg',
      '/images/PedalBikeamarela.jpg'
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
    image: '/images/amazonas.png',
    colors: ['bg-emerald-600', 'bg-black', 'bg-brand-blue'],
    description: 'Urbana Versátil — Câmbio Shimano TZ30 Revoshift, 7 marchas, freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.9,
    reviews: 56,
    tag: 'Versátil',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      '/images/amazonas2.png',
      '/images/amazonas3.png',
      '/images/amazonas4.png'
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
    image: '/images/BikeAzul.jpg',
    colors: ['bg-brand-blue', 'bg-black'],
    description: 'Aventura Urbana — Câmbio Shimano 7 marchas, freios a disco, aros 24, 26, 29 e 32',
    rating: 4.7,
    reviews: 38,
    tag: 'Aventura',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Aventura',
    additionalImages: [
      '/images/BikeAzulLado.jpg',
      '/images/FrenteBikeAzul.jpg',
      '/images/ArosBikeAzul.jpg',
      '/images/FreioBikeAzul.jpg',
      '/images/PeneuBikeAzul.jpg',
      '/images/RodaBikeAzul.jpg'
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
    price: 4300,
    image: '/images/ela.png',
    colors: ['bg-gray-200', 'bg-black'],
    description: 'Conforto & Cidade — Câmbio Nexus (3v, 5v ou 8v), freios V-brake, aros 24, 26, 29 e 32',
    rating: 4.9,
    reviews: 24,
    tag: 'Conforto',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Urbana',
    additionalImages: [
      '/images/ela.png'
    ],
    specs: {
      frame: 'Polímero Reciclado Monobloco',
      transmission: 'Shimano Nexus 3v / 5v / 8v',
      brakes: 'V-Brake Alumínio',
      weight: '13.1kg'
    }
  },
  {
    id: '5',
    name: 'TURRI',
    price: 4500,
    image: '/images/turri.png',
    colors: ['bg-black', 'bg-white border border-black/5'],
    description: 'Performance — Agilidade e leveza para o asfalto, aros 24, 26, 29 e 32',
    rating: 5.0,
    reviews: 15,
    tag: 'Performance',
    tagColor: 'bg-brand-blue text-white',
    category: 'Performance',
    additionalImages: [
      '/images/turri1.png',
      '/images/turri2.png',
      '/images/turri3.png'
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
    image: '/images/Quadro-montain-bike-1.png',
    colors: ['bg-black', 'bg-brand-blue', 'bg-emerald-500'],
    description: 'Quadro avulso Montain Bike — 100% plástico reciclado, sem soldas',
    rating: 4.9,
    reviews: 112,
    tag: 'Base MTB',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Componentes',
    additionalImages: [
      '/images/Quadro-montain-bike-1.png',
      '/images/Quadro-montain-bike-2.png',
      '/images/Quadro-montain-bike-4.png'
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
    image: '/images/quadro4.png',
    colors: ['bg-black', 'bg-brand-blue', 'bg-emerald-500'],
    description: 'Quadro avulso — 100% plástico reciclado, sem soldas',
    rating: 4.9,
    reviews: 112,
    tag: 'Base',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    category: 'Componentes',
    additionalImages: [
      '/images/quadro4.png'
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
    image: '/images/nilo.png',
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
    image: '/images/amazonas.png',
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
