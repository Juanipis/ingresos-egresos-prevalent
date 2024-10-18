export type MoneyMovement = {
  id: string;
  amount: number;
  concept: string;
  date: string; // Este es el campo de la fecha
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};
