export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  tag?: string;
  tagColor?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
