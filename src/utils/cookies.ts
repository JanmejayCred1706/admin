'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function addCookies(keys: string[], values: string[]) {
  if (keys.length !== values.length) {
    throw new Error('Keys and values arrays must have the same length');
  }

  keys.forEach((key, index) => {
    cookies().set(key, values[index], { secure: true });
  });
}
// for server side
export const getCookies = async (
  key: string,
  req: NextRequest
): Promise<string | null> => {
  const cookies = req.cookies.get(key);
  return cookies ? cookies.value : null;
};
// for client side 
export async function getCookiesFrom(keys: string) {
  const cookieStore = cookies();
  const getKey = cookieStore.get(keys);
  return getKey;
}
export async function deleteCookies(keys: string) {
  const cookieStore = cookies();
  cookieStore.delete(keys);
  redirect('/login');
}

