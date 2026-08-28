import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  readonly request: APIRequestContext;
  readonly baseUrl = 'https://reqres.in/api';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUser(id: number): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/users/${id}`);
  }

  async getUsersList(page: number): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/users?page=${page}`);
  }

  async createUser(name: string, job: string): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/users`, {
      data: { name, job },
    });
  }

  async updateUser(id: number, name: string, job: string): Promise<APIResponse> {
    return await this.request.put(`${this.baseUrl}/users/${id}`, {
      data: { name, job },
    });
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return await this.request.delete(`${this.baseUrl}/users/${id}`);
  }

  async login(email: string, password: string): Promise<APIResponse> {
  return await this.request.post(`${this.baseUrl}/login`, {
    data: { email, password },
  });
}
}