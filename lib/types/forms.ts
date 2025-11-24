/**
 * Type definitions for forms
 */

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  note?: string;
}

export interface FormFieldProps {
  name: keyof BookingFormData;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: Record<string, string>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  variant?: 'default' | 'overlay';
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<keyof BookingFormData, string | undefined>;
}

export type BookingFormVariant = 'default' | 'overlay';

