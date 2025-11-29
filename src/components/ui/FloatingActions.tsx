'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/config/site';

interface FloatingActionsProps {
  /** Show only on scroll */
  showOnScroll?: boolean;
  /** Scroll threshold in pixels */
  scrollThreshold?: number;
}

/**
 * Floating Action Buttons for WhatsApp and Call
 * Mobile-first design with accessibility support
 */
export function FloatingActions({
  showOnScroll = false,
  scrollThreshold = 100,
}: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, scrollThreshold]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop when expanded on mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* FAB Container */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3',
          'transition-all duration-300'
        )}
      >
        {/* Expanded buttons (visible when expanded or on desktop) */}
        <div
          className={cn(
            'flex flex-col-reverse gap-3 transition-all duration-300',
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
            'md:opacity-100 md:translate-y-0 md:pointer-events-auto'
          )}
        >
          {/* Call Button */}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-full',
              'bg-blue-600 text-white shadow-lg shadow-blue-500/30',
              'hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
            aria-label={`Call ${SITE_CONFIG.name} at ${SITE_CONFIG.phone}`}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium whitespace-nowrap">
              Call Now
            </span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-full',
              'bg-[#25D366] text-white shadow-lg shadow-green-500/30',
              'hover:bg-[#20BD5A] hover:shadow-xl hover:shadow-green-500/40',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            )}
            aria-label={`Message ${SITE_CONFIG.name} on WhatsApp`}
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium whitespace-nowrap">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Toggle button (mobile only) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'md:hidden flex items-center justify-center w-14 h-14 rounded-full',
            'shadow-lg transition-all duration-300',
            isExpanded
              ? 'bg-gray-800 text-white rotate-0'
              : 'bg-primary-600 text-white',
            'hover:shadow-xl',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
        >
          {isExpanded ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}

/**
 * Simple WhatsApp FAB (single button)
 */
export function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center w-14 h-14 rounded-full',
        'bg-[#25D366] text-white shadow-lg shadow-green-500/30',
        'hover:bg-[#20BD5A] hover:shadow-xl hover:shadow-green-500/40 hover:scale-110',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
      )}
      aria-label={`Message ${SITE_CONFIG.name} on WhatsApp`}
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
