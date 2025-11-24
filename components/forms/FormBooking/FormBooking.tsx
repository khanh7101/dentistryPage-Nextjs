'use client';

import { useTranslations } from 'next-intl';
import { BookingFormVariant } from '@/lib/types/forms';
import { useBookingForm } from './hooks/useBookingForm';
import { FormField } from '../FormField/FormField';
import { VALIDATION_RULES } from '@/lib/config/constants';

interface FormBookingProps {
  variant?: BookingFormVariant;
  onSuccess?: () => void;
}

export default function FormBooking({
  variant = 'default',
  onSuccess,
}: FormBookingProps) {
  const t = useTranslations('booking');
  const {
    form,
    formRef,
    updateField,
    handleSubmit,
    isLoading,
    isReady,
    minDate,
    businessHours,
  } = useBookingForm({ onSuccess });

  const serviceOptions = t.raw('form.service.options') as Record<
    string,
    string
  >;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
      {/* Name & Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          label={t('form.name')}
          value={form.name}
          onChange={(value) => updateField('name', value)}
          required
          variant={variant}
        />
        <FormField
          name="phone"
          label={t('form.phone')}
          type="tel"
          value={form.phone}
          onChange={(value) => updateField('phone', value)}
          required
          variant={variant}
        />
      </div>

      {/* Email */}
      <FormField
        name="email"
        label={t('form.email')}
        type="email"
        value={form.email}
        onChange={(value) => updateField('email', value)}
        placeholder={t('form.emailPlaceholder')}
        variant={variant}
      />

      {/* Date & Time */}
      <div className="grid gap-3 md:grid-cols-2">
        <FormField
          name="date"
          label={t('form.date')}
          type="date"
          value={form.date}
          onChange={(value) => updateField('date', value)}
          min={minDate}
          required
          variant={variant}
        />
        <FormField
          name="time"
          label={t('form.time')}
          type="time"
          value={form.time}
          onChange={(value) => {
            const [h, m] = value.split(':').map(Number);
            const [minH, minM] = VALIDATION_RULES.appointment.minTime
              .split(':')
              .map(Number);
            const [maxH, maxM] = VALIDATION_RULES.appointment.maxTime
              .split(':')
              .map(Number);
            const selectedTime = h * 60 + m;
            const minTime = minH * 60 + minM;
            const maxTime = maxH * 60 + maxM;
            if (selectedTime < minTime || selectedTime > maxTime) {
              // Validation will be handled by useBookingForm
              return;
            }
            updateField('time', value);
          }}
          min={businessHours.open}
          max={businessHours.close}
          step={businessHours.timeStep}
          placeholder={t('form.timePlaceholder')}
          required
          variant={variant}
        />
      </div>

      {/* Service */}
      <FormField
        name="service"
        label={t('form.service.title')}
        type="select"
        value={form.service}
        onChange={(value) => updateField('service', value)}
        options={serviceOptions}
        required
        variant={variant}
      />

      {/* Submit Button */}
      <div className="pt-1 text-center">
        <button
          type="submit"
          disabled={isLoading || !isReady}
          aria-busy={isLoading}
          aria-label={isLoading ? t('toast.loading') : t('form.submit')}
          aria-disabled={!isReady}
          className={`btn rounded-lg ${
            variant === 'overlay'
              ? isLoading || !isReady
                ? 'bg-title2 cursor-wait opacity-60'
                : 'bg-yellow-500 hover:bg-yellow-600'
              : isLoading || !isReady
              ? 'bg-bgButton cursor-wait opacity-60'
              : 'bg-bgButton hover:bg-btnHover'
          }`}
        >
          {isLoading ? 'Đang gửi...' : t('form.submit')}
        </button>
      </div>
    </form>
  );
}
