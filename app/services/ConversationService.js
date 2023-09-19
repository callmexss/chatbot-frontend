import BaseApiService from './BaseApiService';

class ConversationService extends BaseApiService {
  static async fetchConversations() {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/conversations/`,
      { method: 'GET' },
      refreshToken
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('An error occurred while fetching conversations.');
    }
  }

  static async createConversation(name) {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/conversations/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
      refreshToken
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('An error occurred while creating the conversation.');
    }
  }

  static async deleteConversation(id) {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/conversations/${id}/`,
      { method: 'DELETE' },
      refreshToken
    );

    if (!response.ok) {
      throw new Error('An error occurred while deleting the conversation.');
    }
  }

    static async fetchMessagesForConversation(conversationId) {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await this.fetchDataWithAuth(
        `${this.API_BASE_URL}/api/v1/chat/conversations/${conversationId}/messages/`,
        { method: 'GET' },
        refreshToken
    );

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('An error occurred while fetching messages.');
    }
    }

  static async sendMessageWithStream(content, systemPrompt, conversationId) {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/openai/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          system_prompt: systemPrompt,
          conversation_id: conversationId,
        }),
      },
      refreshToken
    );

    if (response.ok) {
      return response.body.getReader();
    } else {
      throw new Error('An error occurred while sending the message.');
    }
  }

}

export default ConversationService;
