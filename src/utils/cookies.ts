'use server';
import { cookies } from 'next/headers';

export async function addCookies(keys: string[], values: string[]) {
  if (keys.length !== values.length) {
    throw new Error('Keys and values arrays must have the same length');
  }

  keys.forEach((key, index) => {
    cookies().set(key, values[index], { secure: true });
  });
}

export async function getCookies(keys: string) {
  const cookieStore = cookies();
  const getKey = cookieStore.get(keys);
  return getKey;
}
