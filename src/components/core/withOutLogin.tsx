'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const withOutLogin = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const router = useRouter();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<
      boolean | null
    >(null);

    useLayoutEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsUserAuthenticated(true);
        router.push('/'); // Redirect to home if already logged in
      } else {
        setIsUserAuthenticated(false);
      }
    }, [router]);

    if (isUserAuthenticated === null) {
      return null; // Show nothing while checking auth status
    }

    if (isUserAuthenticated) {
      return null; // Optionally show a loader or redirect message
    }

    return <WrappedComponent {...props} />;
  };
};
