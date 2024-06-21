// hooks/usePlans.ts
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import fetchInstance from '@utils/fetchInstance';

interface PlanListingData {
  id: string;
  name: string;
  // Define other properties based on your API response
}

const getAllPlansListing = async (data: any) => {
  const { data: responseData, response } = await fetchInstance.get(
    'v2/orders',
    data
  );
  return { data: responseData as PlanListingData[], response };
};

export const getPlans = (data: any, options?: UseQueryOptions<any, Error>) => {
  return useQuery({
    queryKey: ['plans', data], // Include data in the query key to differentiate queries with different payloads
    queryFn: () => getAllPlansListing(data),
    ...options, // Pass any additional options to useQuery
  });
};
