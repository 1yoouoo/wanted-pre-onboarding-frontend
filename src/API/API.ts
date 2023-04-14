import { AxiosResponse } from 'axios';
import { authInstance, defaultInstance } from './customAPI';

interface UserData {
  email: string;
  password: string;
}

interface UpdateTodo {
  todo: string;
  isCompleted: boolean;
  id: number;
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

  getTodos: async (): Promise<AxiosResponse> => {
    const response = await authInstance.get(`todos`);
    return response;
  },

  createTodo: async (todo: string): Promise<AxiosResponse> => {
    const response = await authInstance.post(`todos`, { todo: String(todo) });
    return response;
  },

  updateTodo: async (data: UpdateTodo): Promise<AxiosResponse> => {
    const response = await authInstance.put(`todos/${data.id}`, {
      todo: String(data.todo),
      isCompleted: data.isCompleted,
    });
    return response;
  },

  deleteTodo: async (id: number): Promise<AxiosResponse> => {
    const response = await authInstance.delete(`todos/${id}`);
    return response;
  },
};
export default API;
