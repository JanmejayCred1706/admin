'use client';
import { getCookies } from '@utils/cookies';
import { useEffect, useState } from 'react';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const cookie = await getCookies('token');
      setToken(cookie?.value || null);
    };

    fetchToken();
  }, []);

  return (
    <>
      <div>
        <h1>Jor se bolo</h1>
        <button>Jai mata di</button>
      </div>
    </>
  );
}
