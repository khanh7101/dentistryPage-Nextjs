import { useTranslations } from 'next-intl';
import { VALIDATION_RULES } from '@/lib/config/constants';
import { BookingFormData, FormValidationResult } from '@/lib/types/forms';

/**
 * Custom hook for form validation
 */
export function useFormValidation() {
  const t = useTranslations('booking');

  const validateBookingForm = (
    form: BookingFormData
  ): FormValidationResult => {
    const errors: Partial<Record<keyof BookingFormData, string>> = {};

    // Validate name
    if (!form.name.trim()) {
      errors.name = t(VALIDATION_RULES.name.messages.required);
    } else if (
      form.name.length < VALIDATION_RULES.name.minLength ||
      form.name.length > VALIDATION_RULES.name.maxLength
    ) {
      errors.name = t('validation.nameInvalid');
    }

    // Validate phone
    if (!form.phone) {
      errors.phone = t(VALIDATION_RULES.phone.messages.required);
    } else if (!VALIDATION_RULES.phone.pattern.test(form.phone)) {
      errors.phone = t(VALIDATION_RULES.phone.messages.invalid);
    }

    // Validate email (optional)
    if (form.email && !VALIDATION_RULES.email.pattern.test(form.email)) {
      errors.email = t(VALIDATION_RULES.email.messages.invalid);
    }

    // Validate date
    if (!form.date) {
      errors.date = t(VALIDATION_RULES.appointment.messages.dateRequired);
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = t('validation.datePast');
      }
    }

    // Validate time
    if (!form.time) {
      errors.time = t(VALIDATION_RULES.appointment.messages.timeRequired);
    } else {
      const [hours, minutes] = form.time.split(':').map(Number);
      const [minHours, minMinutes] = VALIDATION_RULES.appointment.minTime
        .split(':')
        .map(Number);
      const [maxHours, maxMinutes] = VALIDATION_RULES.appointment.maxTime
        .split(':')
        .map(Number);

      const selectedTime = hours * 60 + minutes;
      const minTime = minHours * 60 + minMinutes;
      const maxTime = maxHours * 60 + maxMinutes;

      if (selectedTime < minTime || selectedTime > maxTime) {
        errors.time = t(VALIDATION_RULES.appointment.messages.timeRange);
      } else if (form.date) {
        const today = new Date();
        const selectedDate = new Date(form.date);
        if (
          selectedDate.getFullYear() === today.getFullYear() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getDate() === today.getDate()
        ) {
          const nowMinutes = today.getHours() * 60 + today.getMinutes();
          if (selectedTime < nowMinutes) {
            errors.time = t('validation.timePast');
          }
        }
      }
    }

    // Validate service
    if (!form.service) {
      errors.service = t(VALIDATION_RULES.service.messages.required);
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors as Record<keyof BookingFormData, string | undefined>,
    };
  };

  return { validateBookingForm };
}

