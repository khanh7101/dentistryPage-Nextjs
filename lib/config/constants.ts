/**
 * Site-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: 'Nha khoa Passion Đà Nẵng - Passion Dental Clinic',
  description: 'Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện, bao gồm cấy ghép implant, chỉnh nha, răng sứ và điều trị tổng quát.',
  phone: '0704993579',
  email: 'contact@passiondental.com',
  address: {
    street: '...',
    city: 'Da Nang',
    country: 'Vietnam',
  },
  businessHours: {
    open: '08:00',
    close: '17:00',
    timeStep: 300, // 5 minutes in seconds
  },
  googleMaps: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3834.1075542550957!2d108.2065502!3d16.0599076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219dd11c0bf23%3A0x2900ee6678d59566!2sPassion%20Dental%20Clinic%20-%20Nha%20khoa%20Passion!5e0!3m2!1svi!2s!4v1760623656431!5m2!1svi!2s',
  },
} as const;

export const VALIDATION_RULES = {
  phone: {
    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    messages: {
      required: 'validation.phoneRequired',
      invalid: 'validation.phoneInvalid',
    },
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      invalid: 'validation.emailInvalid',
    },
  },
  name: {
    minLength: 2,
    maxLength: 100,
    messages: {
      required: 'validation.nameRequired',
    },
  },
  appointment: {
    minTime: '08:00',
    maxTime: '17:00',
    timeStep: 300,
    messages: {
      dateRequired: 'validation.dateRequired',
      timeRequired: 'validation.timeRequired',
      timeRange: 'validation.timeRange',
    },
  },
  service: {
    messages: {
      required: 'validation.serviceRequired',
    },
  },
} as const;

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export type ValidationRules = typeof VALIDATION_RULES;

