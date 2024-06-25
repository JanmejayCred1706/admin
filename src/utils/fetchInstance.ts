// utils/fetchInstance.ts
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// console.log(BASE_URL);

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
}

const responseInterceptor = async (response: Response) => {
  const res = await response.json();
  // console.log(res, 'response');
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = res;
    (error as any).status = response.status;
    throw error;
  }
  return res;
};

const fetchInstance = async (endpoint: string, options: FetchOptions = {}) => {
  const token = localStorage.getItem('token');

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

  // Pass the response through the interceptor
  const data = await responseInterceptor(response);

  return { data, response };
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
