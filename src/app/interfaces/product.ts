export interface product{

  id: number;
  name: string,
  description: string,
  price: number,
  restaurantId: number,
  categoryId: number,
  featured: boolean,
  recommendedFor: number,
  discount: number,
  hashappyhour: boolean,
}
export type NewProduct = Omit<product, "id">;
export interface DiscountData {
  discount: number;
}

export interface HappyHourData {
  hasHappyHour: boolean;
}