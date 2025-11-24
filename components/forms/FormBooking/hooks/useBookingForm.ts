import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { BookingFormData } from '@/lib/types/forms';
import { useFormValidation } from '@/lib/hooks/useFormValidation';
import { useEmailJS } from '@/lib/hooks/useEmailJS';
import { SITE_CONFIG } from '@/lib/config/constants';

interface UseBookingFormOptions {
  onSuccess?: () => void;
}

/**
 * Custom hook for booking form logic
 */
export function useBookingForm({ onSuccess }: UseBookingFormOptions = {}) {
  const t = useTranslations('booking');
  const formRef = useRef<HTMLFormElement | null>(null);
  const { validateBookingForm } = useFormValidation();
  const { sendEmail, isLoading, isReady, isConfigured } = useEmailJS();

  const [form, setForm] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    note: '',
  });

  const updateField = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      service: '',
      note: '',
    });
    formRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || !isReady) {
      if (!isConfigured) {
        toast.error(
          'EmailJS is not configured. Please set up environment variables. See README.md for instructions.',
          { duration: 6000 }
        );
      }
      return;
    }

    const validation = validateBookingForm(form);
    if (!validation.isValid) {
      // Show first error
      const firstError = Object.values(validation.errors).find(Boolean);
      if (firstError) {
        toast.error(firstError);
      } else {
        toast.error(t('validation.formError'));
      }
      return;
    }

    const loadingToast = toast.loading(t('toast.loading'));

    try {
      await sendEmail(formRef.current);
      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      resetForm();
      onSuccess?.();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.dismiss(loadingToast);
      
      // Show specific error message if available
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('toast.error');
      
      toast.error(errorMessage, {
        duration: 5000, // Longer duration for error messages
      });
    }
  };

  // Get today's date in YYYY-MM-DD format
  const minDate = new Date().toISOString().split('T')[0];

  return {
    form,
    formRef,
    updateField,
    handleSubmit,
    isLoading,
    isReady,
    minDate,
    businessHours: SITE_CONFIG.businessHours,
  };
}

