import { useState, useEffect } from 'react';
import { EMAILJS_CONFIG } from '@/lib/config/constants';

type EmailJSModule = typeof import('@emailjs/browser');

/**
 * Custom hook for EmailJS integration
 */
export function useEmailJS() {
  const [emailjs, setEmailjs] = useState<EmailJSModule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !emailjs) {
      import('@emailjs/browser').then((module) => {
        setEmailjs(module);
      });
    }
  }, [emailjs]);

  const sendEmail = async (formElement: HTMLFormElement) => {
    let emailjsModule = emailjs;
    
    if (!emailjsModule) {
      // Try to load it synchronously if not loaded yet
      try {
        emailjsModule = await import('@emailjs/browser');
        setEmailjs(emailjsModule);
      } catch (error) {
        throw new Error('Failed to load EmailJS library. Please check your internet connection.');
      }
    }

    if (!emailjsModule) {
      throw new Error('EmailJS library not available');
    }

    // Use runtime config to ensure env vars are read correctly
    const config = getEmailJSConfig();
    const { serviceId, templateId, publicKey } = config;

    if (!serviceId || !templateId || !publicKey) {
      const missing = [];
      if (!serviceId) missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
      if (!templateId) missing.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
      if (!publicKey) missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
      
      throw new Error(
        `EmailJS configuration is incomplete. Missing environment variables: ${missing.join(', ')}. ` +
        'Please create a .env.local file with these variables and restart your dev server. See README.md for instructions.'
      );
    }

    setIsLoading(true);
    try {
      const response = await emailjsModule.sendForm(
        serviceId,
        templateId,
        formElement,
        publicKey
      );
      
      // EmailJS returns status 200 on success
      if (response.status !== 200) {
        throw new Error(`Email service returned status ${response.status}`);
      }
      
      return response;
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          throw new Error('Network error. Please check your internet connection and try again.');
        }
        if (error.message.includes('configuration') || error.message.includes('config')) {
          throw new Error('Service configuration error. Please contact support.');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if EmailJS is ready and configured
  // Read env vars at runtime (client-side) to ensure they're loaded
  const getEmailJSConfig = () => {
    if (typeof window !== 'undefined') {
      return {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      };
    }
    return EMAILJS_CONFIG;
  };

  const runtimeConfig = getEmailJSConfig();
  const isConfigured = !!(
    runtimeConfig.serviceId &&
    runtimeConfig.templateId &&
    runtimeConfig.publicKey
  );

  // Debug logging (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log('EmailJS Config Check:', {
        serviceId: runtimeConfig.serviceId ? '✓ Set' : '✗ Missing',
        templateId: runtimeConfig.templateId ? '✓ Set' : '✗ Missing',
        publicKey: runtimeConfig.publicKey ? '✓ Set' : '✗ Missing',
        isConfigured,
      });
    }
  }, [isConfigured, runtimeConfig]);

  return { 
    sendEmail, 
    isLoading, 
    isReady: !!emailjs && isConfigured,
    isConfigured,
  };
}

