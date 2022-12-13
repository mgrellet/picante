export interface Rent {
  id: string;
  color: string;
  size: number;
  type: string;
  name: string;
  balance?: number;
  recipeNumber?: number;
  notes?: string;
  reservationDate: string;
}
