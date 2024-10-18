import { z } from 'zod';

export const formSchema = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'El monto debe ser un número válido.',
    })
    .transform((val) => Number(val)),
  concept: z.string().min(2, 'El concepto debe tener al menos 2 caracteres.'),
  date: z.string().refine(
    (val) => {
      const selectedDate = new Date(val);
      return selectedDate <= new Date();
    },
    { message: 'La fecha no puede ser mayor a la actual.' }
  ),
});

// Renombramos el tipo inferido
export type MoneyMovementFormData = z.infer<typeof formSchema>;
