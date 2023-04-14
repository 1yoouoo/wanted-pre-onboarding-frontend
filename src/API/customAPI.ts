/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const ApiBase = 'https://www.pre-onboarding-selection-task.shop/';
const token = localStorage.getItem('token');

const axiosApi = ({ options }: any) => {
  const instance = axios.create({
    baseURL: ApiBase,
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.response.use(
    (response) => {
      console.log('interceptor > response', response);
      return response;
    },
    (error) => {
      console.log('interceptor > error', error);
      alert(error.response.data.message);
      return Promise.reject(error);
    }
  );
  instance.interceptors.request.use(
    (request) => {
      console.log('interceptor > request', request);
      return request;
    },
    (error) => {
      console.log('interceptor > error', error);
      alert(error.response.data.message);
      return Promise.reject(error);
    }
  );
  instance.defaults.timeout = 2500;
  return instance;
};

const axiosAuthApi = ({ options }: any) => {
  const instance = axios.create({
    baseURL: ApiBase,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  instance.interceptors.response.use(
    (response) => {
      console.log('interceptor > response', response);
      return response;
    },
    (error) => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.request.use(
    (request) => {
      console.log('interceptor > request', request);

      return request;
    },
    (error) => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );
  instance.defaults.timeout = 2500;
  return instance;
};

export const defaultInstance = axiosApi(ApiBase);
export const authInstance = axiosAuthApi(ApiBase);
