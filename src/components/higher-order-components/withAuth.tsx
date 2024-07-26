import { useRouter } from 'next/navigation';
import React, { useEffect, useState, ComponentType } from 'react';

function withAuth<P extends {}>(WrappedComponent: ComponentType<P>) {
  return (props: P) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      setToken(token);
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    // if (!token) {
    //   return null; // Optionally, show a loading spinner or a placeholder
    // }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
