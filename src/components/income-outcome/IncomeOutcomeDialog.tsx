'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
  formSchema,
  MoneyMovementFormData,
} from './types/moneyMovementFormData';
import { useEffect } from 'react';

interface IncomeOutcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MoneyMovementFormData) => Promise<void>;
  initialData: MoneyMovementFormData;
  title: string;
  submitButtonText: string;
}

export default function IncomeOutcomeDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  submitButtonText,
}: Readonly<IncomeOutcomeDialogProps>) {
  const { toast } = useToast();

  const form = useForm<MoneyMovementFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (values: MoneyMovementFormData) => {
    try {
      await onSubmit(values);
      toast({
        description: 'Operación realizada con éxito.',
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Ocurrió un error. Inténtalo de nuevo.',
      });
    }
  };

  useEffect(() => {
    if (isOpen && !form.formState.isSubmitting) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concepto</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Descripción del concepto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Guardando...' : submitButtonText}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
