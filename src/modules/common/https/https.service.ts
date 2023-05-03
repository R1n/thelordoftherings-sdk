import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: any;
}

@Injectable()
export class HttpsService {
  async makeRequest(auth: string, config: AxiosRequestConfig): Promise<ApiResponse<any>> {
    try {
      const response: AxiosResponse = await axios.request({
        baseURL: process.env.API,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        ...config,
      });

      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error(`No response received: ${error.request.message}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Error setting up request: ${error.message}`);
        }
      } else {
        // error is not of type AxiosError, so it could be any other error type
        throw error;
      }
    }
  }
}
