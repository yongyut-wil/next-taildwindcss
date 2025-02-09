export interface Salad {
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  dietary: {
    vegetarian: boolean;
    glutenFree: boolean;
  };
}
