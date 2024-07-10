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
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const mutationOptions: UseMutationOptions<any, Error, any, unknown> = {
    mutationFn: postData,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {},
  };

  return useMutation(mutationOptions);
};

export default usePostRequest;
