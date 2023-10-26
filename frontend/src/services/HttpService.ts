import axios, { Method } from 'axios';

import { API_URL } from 'src/config/env';
// import { errorToast } from '../utils/Toast'
import Storage from 'src/services/Storage';

const codes = {
  UNAUTHORIZED: 401,
  CUSTOM_TOKEN_EXPIRED: -2,
  REQUEST_TIMEOUT: 408,
  ECONNABORTED: 'ECONNABORTED'
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.data?.error?.code === codes.CUSTOM_TOKEN_EXPIRED) {
      console.log('token expired');
    }

    if (
      error?.response?.status === codes.REQUEST_TIMEOUT ||
      error.code === codes.ECONNABORTED
    ) {
      // Looks like the server is taking to long to respond, please try again in sometime.
      console.log(`A timeout happend on url ${error.config.url}`);
      // errorToast({ content: 'Server request timed out. Please retry again.' })
    }

    if (!error?.response?.data?.error) {
      console.log('Server error not found');
      // Add something went wrong toast error here
      // statusText in toast maybe.
    }
    return Promise.reject(error);
  }
);

const getFullUrl = (url: string) => `${API_URL}${url}`;

export type Irequest = {
  subUrl: string;
  method?: Method;
  data?: object;
  params?: object;
  headers?: object;
};

export const GET = (request: Irequest) => commonFetch({ method: 'get', ...request });

export const POST = (request: Irequest) => commonFetch({ method: 'post', ...request });

export const PUT = (request: Irequest) => commonFetch({ method: 'put', ...request });

export const PATCH = (request: Irequest) => commonFetch({ method: 'patch', ...request });

export const DELETE = (request: Irequest) => commonFetch({ method: 'delete', ...request });

const commonFetch = (request: Irequest) => {
  const { subUrl, method, data = {}, params, headers = {} } = request;
  const url = getFullUrl(subUrl);
  const commonHeaders = getCommonHeaders();

  return axios({
    method,
    url,
    params,
    data,
    headers: { ...commonHeaders, ...headers }
  });
};

export const contentTypes = {
  multipart: {
    'Content-Type': 'multipart/form-data'
  },
  json: {
    'Content-Type': 'application/json'
  }
};

const getCommonHeaders = () => {
  const authHeader : any = {};
  const token = Storage.getItem('token');

  if(token){
    authHeader['Authorization'] = `JWT ${token}`;
  }

  return {
    ...contentTypes.json,
    ...authHeader
  }
};
