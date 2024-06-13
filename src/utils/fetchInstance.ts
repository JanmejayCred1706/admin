export const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || '';
console.log(baseURL);
let navigationRoute: string | null = null;

const token: string = '';
const getToken = async (): Promise<string> => {
  //   const { token } = getAdminInfo();
  //   return token;
  return ''; // Placeholder return, modify as needed
};

let timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
const fetchInstance = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token: string = await getToken();

  const defaultHeaders: Record<string, string> = {
    date: timeZone,
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
      method: 'POST',
    },
    body: JSON.stringify({
      email: 'admin@garantie.in',
      password: 'Garantie@1',
      user_type: 'admin',
      grant_type: 'password',
    }),
  };

  //   if (config?.navigateTo) {
  //     navigationRoute = config?.navigateTo;
  //     delete config?.navigateTo;
  //   }

  try {
    const response: Response = await fetch(`${baseURL}${url}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle errors globally
    console.error('Fetch error:', error);
    console.log(error.message);
    throw error;
  }
};

export default fetchInstance;
