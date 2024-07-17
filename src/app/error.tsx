'use client';
import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default ErrorComponent;
