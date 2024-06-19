'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const token = localStorage.getItem('token');
    useEffect(() => {
      if (!token) {
        redirect('/login');
      }
    }, []);

    if (!token) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
export default withAuth;
