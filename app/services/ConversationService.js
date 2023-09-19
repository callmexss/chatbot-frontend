import BaseApiService from './BaseApiService';

class ConversationService extends BaseApiService {
  static async fetchConversations() {
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/conversations/`,
      { method: 'GET' },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('An error occurred while fetching conversations.');
    }
  }

  static async createConversation(name) {
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/conversations/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('An error occurred while creating the conversation.');
    }
  }

  static async deleteConversation(id) {
    const response = await this.fetchDataWithAuth(
      `${this.API_BASE_URL}/api/v1/chat/conversations/${id}/`,
      { method: 'DELETE' },
    );

    if (!response.ok) {
      throw new Error('An error occurred while deleting the conversation.');
    }
  }

    static async fetchMessagesForConversation(conversationId) {
    const response = await this.fetchDataWithAuth(
        `${this.API_BASE_URL}/api/v1/chat/conversations/${conversationId}/messages/`,
        { method: 'GET' },
    );

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('An error occurred while fetching messages.');
    }
    }

  static async sendMessageWithStream(content, systemPrompt, conversationId) {
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
    );

    if (response.ok) {
      return response.body.getReader();
    } else {
      throw new Error('An error occurred while sending the message.');
    }
  }

}

export default ConversationService;
