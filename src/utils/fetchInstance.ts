// utils/fetchInstance.ts
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log(BASE_URL);

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
}

const fetchInstance = async (endpoint: string, options: FetchOptions = {}) => {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN; // Replace with your token logic

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const url = new URL(`${BASE_URL}${endpoint}`);

  if (options.body && options.method === 'GET') {
    Object.keys(options.body).forEach((key) =>
      url.searchParams.append(key, options.body[key])
    );
    delete options.body;
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  console.log(response);
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }
  return response.json();
};

fetchInstance.get = (
  endpoint: string,
  params: any = {},
  options: FetchOptions = {}
) => {
  return fetchInstance(endpoint, { ...options, method: 'GET', body: params });
};

fetchInstance.post = (
  endpoint: string,
  data: any,
  options: FetchOptions = {}
) => {
  return fetchInstance(endpoint, { ...options, method: 'POST', body: data });
};

fetchInstance.patch = (
  endpoint: string,
  data: any,
  options: FetchOptions = {}
) => {
  return fetchInstance(endpoint, { ...options, method: 'PATCH', body: data });
};

fetchInstance.delete = (endpoint: string, options: FetchOptions = {}) => {
  return fetchInstance(endpoint, { ...options, method: 'DELETE' });
};

export default fetchInstance;
