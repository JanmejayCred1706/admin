'use client';
import { allowedLabelsFor } from '@functions/LayoutFn';
import { findUserRole } from '@functions/globalFn';
import { getCookies, getCookiesFrom } from '@utils/cookies';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <>
      <div>
        <h1>Jor se bolo</h1>
        <button>Jai mata di</button>
      </div>
    </>
  );
}
