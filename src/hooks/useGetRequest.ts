import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useAppStore } from '@utils/Store';
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
  const { setIsLoading } = useAppStore();

  const decodeParams = (params: Record<string, any>): Record<string, any> => {
    const decodedParams: Record<string, any> = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        let value = params[key];
        if (key.includes('startDate') || key.includes('endDate')) {
          value = value.replace(/\//g, '-');
        }
        decodedParams[key] = value;
      }
    }
    return decodedParams;
  };

  const fetchData = async (): Promise<any> => {
    setIsLoading(true);
    try {
      const decodedParams = decodeParams(params);
      const { data }: FetchData = await fetchInstance.get(
        endpoint,
        decodedParams,
        options
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
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
    onSuccess: (data: any) => {},
    onError: (error: any) => {},
  };

  return useQuery(queryOptions);
};

export default useGetRequest;
