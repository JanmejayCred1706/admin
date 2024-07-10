'use client';
import { getCookiesFrom } from '@utils/cookies';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState, useEffect } from 'react';

export default function withAuth(Component: any) {
  return function withAuth(props: any) {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      (async () => {
        try {
          const data = await getCookiesFrom('token');
          setToken(data);
        } catch (err) {
          console.error(err);
        }
      })();
    }, []);

    useLayoutEffect(() => {
      if (token === null) {
        router.push('/login');
      }
    }, [token, router]);

    if (token === null) {
      return null;
    }

    return <Component {...props} />;
  };
}
