import fetchInstance from '@utils/fetchInstance';

export const postData = async (data: any) => {
  return await fetchInstance.post('user/login', data);
};
