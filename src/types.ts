export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  tag?: string;
  tagColor?: string;
  category: 'Urbana' | 'Aventura' | 'Performance' | 'Componentes';
  specs?: {
    frame: string;
    transmission: string;
    brakes: string;
    weight: string;
  };
  selectedAro?: string;
  isAcervo?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
