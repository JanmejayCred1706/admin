export const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || '';
console.log(baseURL);
let navigationRoute: string | null = null;

const token: string = '';
const getToken = async (): Promise<string> => {
  //   const { token } = getAdminInfo();
  //   return token;
  return ''; // Placeholder return, modify as needed
};

const fetchInstance = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token: string = await getToken();

  const defaultHeaders: Record<string, string> = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
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
