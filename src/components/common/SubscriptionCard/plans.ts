export interface Plan {
  features: {
    title: string;
    isAvailable: boolean;
  }[];
  title: string;

  price: string;
  period: number;
  discount: number;
  save: number;
}
