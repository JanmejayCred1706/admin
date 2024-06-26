import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import fetchInstance from '@utils/fetchInstance';

interface FetchData {
  data: any;
  response: Response;
}

const useGetRequest = (
  endpoint: string,
  params: any = {},
  options: RequestInit = {},
  dependencies: any[] = []
): UseQueryResult<any, Error> => {
  const fetchData = async (): Promise<any> => {
    try {
      const { data }: FetchData = await fetchInstance.get(
        endpoint,
        params,
        options
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const queryOptions: UseQueryOptions<any, Error> = {
    queryKey: [endpoint, params, ...dependencies],
    queryFn: fetchData,
    retry: 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: false, // Disable automatic fetching
    onSuccess: (data: any) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error: any) => {
      console.error('Error fetching data:', error);
    },
  };

  return useQuery(queryOptions);
};

export default useGetRequest;
