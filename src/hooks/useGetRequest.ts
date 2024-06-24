// hooks/useGetRequest.ts
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
      // console.log('Fetched data:', data); // Debugging log
      return data;
    } catch (error) {
      // console.error('Fetch error:', error);
      throw error;
    }
  };

  const queryOptions: UseQueryOptions<any, Error> = {
    queryKey: [endpoint, params, ...dependencies],
    queryFn: fetchData,
    retry: 3, // Number of retries on failure
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
    onError: (error: any) => {
      // console.error('Error fetching data:', error);
    },
  };

  return useQuery(queryOptions);
};

export default useGetRequest;
