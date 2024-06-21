import fetchInstance from '../utils/fetchInstance';

interface ApiResponse {
  data: any;
  // Add any other properties like headers, status, etc.
}

// GET request
export const useGet = <T = any>(
  endpoint: string,
  queryOptions?: UseQueryOptions<ApiResponse, Error>
) => {
  return useQuery<ApiResponse, Error>(
    ['get', endpoint],
    () => fetchInstance.get(endpoint),
    {
      ...queryOptions,
    }
  );
};

// POST request
export const usePost = <T = any>(
  endpoint: string,
  queryOptions?: UseQueryOptions<ApiResponse, Error>
) => {
  return useMutation<ApiResponse, Error, T>(
    (data: any) => fetchInstance.post(endpoint, data),
    {
      ...queryOptions,
    }
  );
};

// PUT request
export const usePut = <T = any>(
  endpoint: string,
  queryOptions?: UseQueryOptions<ApiResponse, Error>
) => {
  return useMutation<ApiResponse, Error, T>(
    (data: any) => fetchInstance.patch(endpoint, data),
    {
      ...queryOptions,
    }
  );
};

// DELETE request
export const useDelete = (
  endpoint: string,
  queryOptions?: UseQueryOptions<ApiResponse, Error>
) => {
  return useMutation<ApiResponse, Error>(() => fetchInstance.delete(endpoint), {
    ...queryOptions,
  });
};
