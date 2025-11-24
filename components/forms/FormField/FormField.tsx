'use client';

import { FormFieldProps } from '@/lib/types/forms';

const baseInput =
  'rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-sky-500 bg-white text-slate-900 shadow-sm placeholder:text-slate-400';

interface FormFieldComponentProps extends FormFieldProps {
  min?: string;
  max?: string;
  step?: number;
}

/**
 * Reusable form field component
 */
export function FormField({
  name,
  label,
  type = 'text',
  required = false,
  placeholder,
  options,
  value,
  onChange,
  error,
  variant = 'default',
  min,
  max,
  step,
  ...props
}: FormFieldComponentProps) {
  const labelClass = `text-xs sm:text-sm font-medium ${
    variant === 'overlay' ? 'text-white' : 'text-slate-700'
  }`;

  const inputClass = `${baseInput} w-full ${
    type === 'date' || type === 'time' || type === 'select'
      ? 'appearance-none min-h-[46px]'
      : ''
  } ${type === 'time' ? 'text-slate-400' : ''}`;

  const errorId = error ? `${name}-error` : undefined;
  const ariaDescribedBy = error ? errorId : undefined;

  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      {type === 'select' && options ? (
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder || label}
          </option>
          {Object.entries(options).map(([key, label]) => (
            <option key={key} value={key} className="text-slate-900">
              {label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} min-h-[80px]`}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          {...props}
        />
      )}
      {error && (
        <span
          id={errorId}
          className="text-xs text-red-500 mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
}

