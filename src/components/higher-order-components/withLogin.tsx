'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface withLoginProps {}

export const withLogin = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const router = useRouter();
    const [isUserAuthenticated, setIsUserAuthenticated] =
      useState<boolean>(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsUserAuthenticated(true);
        router.push('/admin/dashboard'); // Redirect to home if already logged in
      } else {
        setIsUserAuthenticated(false);
        router.push('/login');
      }
    }, [router]);

    if (isUserAuthenticated === null) {
      return null; // Show nothing while checking auth status
    }

    // if (isUserAuthenticated) {
    //   return null; // Optionally show a loader or redirect message
    // }

    return <WrappedComponent {...props} />;
  };
};
