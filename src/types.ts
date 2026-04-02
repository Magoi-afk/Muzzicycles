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
  specs?: {
    frame: string;
    transmission: string;
    brakes: string;
    weight: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
