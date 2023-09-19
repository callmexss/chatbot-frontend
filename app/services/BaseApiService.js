// services/apiService.js

class BaseApiService {
  static API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  static async fetchDataWithAuth(url, options) {
    let accessToken = localStorage.getItem('access_token');
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    };
    
    let response = await fetch(url, options);
    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      accessToken = await this.refreshAccessToken(refreshToken);
      localStorage.setItem('access_token', accessToken);
      console.log("new token: " + accessToken);
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }
    return response;
  }

  static async refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(`${this.API_BASE_URL}/api/v1/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.access;
    } else {
      throw new Error("Failed to refresh access token");
    }
  }
}

export default BaseApiService;
