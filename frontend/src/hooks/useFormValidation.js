import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormValidation = (schema, defaultValues = {}) => {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues
  });
};
