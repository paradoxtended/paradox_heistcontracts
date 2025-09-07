export type ItemData = {
  label: string;
  count?: number;
  price?: { coins?: number, money?: number } | number;
  description?: string;
  image?: string;
};