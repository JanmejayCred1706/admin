// hooks/usePostRequest.ts
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useAppStore } from '@utils/Store';
import fetchInstance from '@utils/fetchInstance';

interface FetchData {
  data: any;
  response: Response;
}

const usePostRequest = (
  endpoint: string,
  options: RequestInit = {},
  onSuccess?: (data: any) => void
): UseMutationResult<any, Error, any, unknown> => {
  const { setIsLoading } = useAppStore();
  const postData = async (body: any): Promise<any> => {
    setIsLoading(true);
    try {
      const { data }: FetchData = await fetchInstance.post(
        endpoint,
        body,
        options
      );
      //   console.log('Posted data:', data); // Debugging log
      return data;
    } catch (error) {
      //   console.error('Fetch error:', error);
      throw error;
    } finally {
      setIsLoading(true);
    }
  };

  const mutationOptions: UseMutationOptions<any, Error, any, unknown> = {
    mutationFn: postData,
    onSuccess: (data) => {
      // console.log('Success:', data);
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      //   console.error('Error posting data:', error);
    },
  };

  return useMutation(mutationOptions);
};

export default usePostRequest;
