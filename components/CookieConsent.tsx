'use client';

import { useState, useEffect } from 'react';
// import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';

// const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type CookieState = 'not-answered' | 'accepted' | 'rejected';

// 🔧 Helper functions
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp('(^| )' + name + '=([^;]+)')
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
}

export default function CookieConsent() {
  const [cookieState, setCookieState] = useState<CookieState>('not-answered');

  useEffect(() => {
    const state = getCookie('cookie-consent-state') as CookieState | null;
    if (state) setCookieState(state);
  }, []);

  const handleConsent = (state: CookieState) => {
    setCookie('cookie-consent-state', state);
    setCookieState(state);
  };

  if (cookieState === 'not-answered') {
    return (
      <div className="fixed border-2 border-[#333] bottom-4 right-4 p-4 bg-white/50 backdrop-blur-md rounded-tl-lg z-999 max-w-[300px]">
        <p className='mb-2'>We use cookies to improve your experience. Do you accept?</p>
        <div className="flex gap-2">
            <button className='border-2 border-[#333] px-2 py-1 cursor-pointer transition-transform hover:scale-[1.05] duration-100' onClick={() => handleConsent('accepted')}>Accept</button>
            <button className='border-none px-2 py-1 cursor-pointer' onClick={() => handleConsent('rejected')}>Reject</button>
        </div>
      </div>
    );
  }

  if (cookieState === 'accepted' && GA_ID) {
    // return <GoogleTagManager gtmId={GTM_ID} />;
    return <GoogleAnalytics gaId={GA_ID} />
  }

  return (
    <button
      className="fixed bottom-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full cursor-pointer z-[999]"
      onClick={() => setCookieState('not-answered')}
    >
      🍪
    </button>
  );
}