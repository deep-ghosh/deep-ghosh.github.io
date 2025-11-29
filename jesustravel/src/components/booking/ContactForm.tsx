'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SITE_CONFIG } from '@/config/site';

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

interface FormState {
  loading: boolean;
  success: boolean;
  error: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'general',
    message: '',
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setState(prev => ({ ...prev, error: '' }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter your name' }));
      return false;
    }
    if (!formData.phone.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter your phone number' }));
      return false;
    }
    if (!/^(\+91)?[6-9]\d{9}$/.test(formData.phone.replace(/\s|-/g, ''))) {
      setState(prev => ({ ...prev, error: 'Please enter a valid phone number' }));
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return false;
    }
    if (!formData.message.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter your message' }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setState({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setState({ loading: false, success: true, error: '' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: 'general',
          message: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => {
          setState({ loading: false, success: false, error: '' });
        }, 5000);
      } else {
        setState({
          loading: false,
          success: false,
          error: result.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (err) {
      setState({
        loading: false,
        success: false,
        error: 'Failed to send message. Please try calling us instead.',
      });
    }
  };

  if (state.success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-12 text-center border-2 border-green-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Message Received!</h2>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for reaching out to Jesus Travel.
          </p>
          <p className="text-gray-600 mb-8">
            We'll get back to you shortly via phone or WhatsApp.
          </p>

          <div className="bg-white rounded-xl p-6 mb-8 text-left">
            <p className="text-sm text-gray-600 mb-2">We'll contact you at:</p>
            <p className="text-lg font-semibold text-blue-600">{formData.phone}</p>
            {formData.email && (
              <>
                <p className="text-sm text-gray-600 mt-3 mb-2">And via email:</p>
                <p className="text-lg font-semibold text-blue-600">{formData.email}</p>
              </>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-6">
            In the meantime, you can also reach us directly:
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${SITE_CONFIG.phone}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 font-semibold px-6 py-3 flex items-center gap-2 w-full">
                <Phone className="w-5 h-5" /> Call Now
              </Button>
            </a>
            <a href="https://wa.me/919831005736">
              <Button className="bg-green-500 hover:bg-green-600 font-semibold px-6 py-3 flex items-center gap-2 w-full">
                <MessageSquare className="w-5 h-5" /> WhatsApp
              </Button>
            </a>
          </div>

          <button
            onClick={() => {
              setState({ loading: false, success: false, error: '' });
              setFormData({
                name: '',
                email: '',
                phone: '',
                serviceType: 'general',
                message: '',
              });
            }}
            className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Get in Touch</h1>
        <p className="text-xl text-gray-600">
          Tell us about your vehicle service needs and we'll get back to you quickly
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
        {state.error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 font-medium">{state.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98310 05736"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-600 mt-1">We'll contact you on this number</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address (Optional)
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-600 mt-1">For written confirmation</p>
          </div>

          {/* Service Type */}
          <div>
            <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-900 mb-2">
              What do you need? *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            >
              <option value="general">General Inquiry</option>
              <option value="school">School Pickup Service</option>
              <option value="office">Office Shuttle Service</option>
              <option value="wedding">Wedding/Event Transportation</option>
              <option value="tour">Tour or Outstation Travel</option>
              <option value="local">Local Trip</option>
              <option value="other">Something Else</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your requirements, preferred dates, number of passengers, or any special requests..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium resize-none"
            />
            <p className="text-xs text-gray-600 mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={state.loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 flex items-center justify-center gap-2 text-lg transition-all"
          >
            {state.loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>

      {/* Quick Contact Options */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Call Us</h3>
          </div>
          <p className="text-gray-700 mb-3">For immediate assistance</p>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="inline-block text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            {SITE_CONFIG.phone}
          </a>
          <p className="text-sm text-gray-600 mt-2">24/7 Available</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">WhatsApp</h3>
          </div>
          <p className="text-gray-700 mb-3">Quick messages and updates</p>
          <a
            href="https://wa.me/919831005736"
            className="inline-block text-green-600 font-bold hover:text-green-700 transition-colors"
          >
            Start Chat
          </a>
          <p className="text-sm text-gray-600 mt-2">Instant reply</p>
        </div>
      </div>
    </div>
  );
}
