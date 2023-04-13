import { AxiosResponse } from 'axios';
import { defaultInstance } from './customAPI';

interface UserData {
  email: string;
  password: string;
}

const API = {
  signUp: async (data: UserData): Promise<AxiosResponse> => {
    const response = await defaultInstance.post(`auth/signup`, data);
    return response;
  },

  signIn: async (data: UserData): Promise<AxiosResponse> => {
    const response = await defaultInstance.post(`auth/signin`, data);
    return response;
  },
};

export default API;
