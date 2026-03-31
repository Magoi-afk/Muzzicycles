import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NILO',
    price: 1890,
    image: 'https://picsum.photos/seed/bike-nilo/800/1000',
    colors: ['bg-black', 'bg-gray-400', 'bg-brand-blue'],
    description: 'Urbana Simples — Monomarcha, freios V-brake, aros 24, 26 e 29',
    rating: 4.8,
    reviews: 42,
    tag: 'Pioneira',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
  },
  {
    id: '2',
    name: 'AMAZONAS',
    price: 2450,
    image: 'https://picsum.photos/seed/bike-amazonas/800/1000',
    colors: ['bg-emerald-600', 'bg-black'],
    description: 'Urbana Versátil — Câmbio Shimano TZ30 Revoshift, 7 marchas, freios V-brake',
    rating: 4.9,
    reviews: 56,
    tag: 'Versátil',
    tagColor: 'bg-black text-white'
  },
  {
    id: '3',
    name: 'RENO',
    price: 2890,
    image: 'https://picsum.photos/seed/bike-reno/800/1000',
    colors: ['bg-brand-blue', 'bg-black'],
    description: 'Aventura Urbana — Câmbio Shimano 7 marchas, freios a disco, aros 24, 26 e 29',
    rating: 4.7,
    reviews: 38,
    tag: 'Aventura',
    tagColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20'
  },
  {
    id: '4',
    name: 'MISSISSIPPI',
    price: 3150,
    image: 'https://picsum.photos/seed/bike-mississippi/800/1000',
    colors: ['bg-gray-200', 'bg-black'],
    description: 'Conforto & Cidade — Câmbio Nexus 3v, freios V-brake, aros 24, 26 e 29',
    rating: 4.9,
    reviews: 24,
    tag: 'Conforto',
    tagColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
  },
  {
    id: '5',
    name: 'TURRI',
    price: 3890,
    image: 'https://picsum.photos/seed/bike-turri/800/1000',
    colors: ['bg-black', 'bg-white border border-black/5'],
    description: 'Performance — Agilidade e leveza para o asfalto',
    rating: 5.0,
    reviews: 15,
    tag: 'Performance',
    tagColor: 'bg-brand-blue text-white'
  },
  {
    id: '6',
    name: 'ARO 29',
    price: 3450,
    image: 'https://picsum.photos/seed/bike-aro29/800/1000',
    colors: ['bg-brand-blue', 'bg-gray-800'],
    description: 'Trail & Estrada — Domine qualquer terreno com sustentabilidade',
    rating: 4.8,
    reviews: 67
  },
  {
    id: '7',
    name: 'QUADRO MUZZI',
    price: 1200,
    image: 'https://picsum.photos/seed/bike-frame/800/1000',
    colors: ['bg-black', 'bg-brand-blue', 'bg-emerald-500'],
    description: 'Quadro avulso — 100% plástico reciclado, sem soldas',
    rating: 4.9,
    reviews: 112,
    tag: 'Base',
    tagColor: 'bg-black text-white'
  }
];
