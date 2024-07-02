'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export const withOutLogin = (WrappedComponent: any) => {
  const token = localStorage.getItem('token');
  let isUserAuthenticated = token ? true : false;
  console.log(isUserAuthenticated, '...');
  return function WithAuth(props: any) {
    const session = isUserAuthenticated;
    useEffect(() => {
      if (!session) {
        redirect('/');
      }
    }, []);

    if (!session) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
