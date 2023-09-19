import BaseApiService from './BaseApiService';

class SystemPromptService extends BaseApiService {
  static async fetchSystemPrompts() {
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/system-prompts/`,
      { method: 'GET' },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('An error occurred while fetching system prompts.');
    }
  }

  static async addOrUpdateSystemPrompt(prompt) {
    const apiUrl = prompt.id
      ? `${this.API_BASE_URL}/api/v1/chat/system-prompts/${prompt.id}/`
      : `${this.API_BASE_URL}/api/v1/chat/system-prompts/`;
    const method = prompt.id ? 'PUT' : 'POST';

    const response = await this.fetchDataWithAuth(
      apiUrl,
      {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prompt),
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('An error occurred while adding or updating the system prompt.');
    }
  }

  static async deleteSystemPrompt(id) {
    const apiUrl = `${this.API_BASE_URL}/api/v1/chat/system-prompts/${id}/`;

    const response = await this.fetchDataWithAuth(
      apiUrl,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('An error occurred while deleting the system prompt.');
    }
  }
}

export default SystemPromptService;
