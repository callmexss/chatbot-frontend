import BaseApiService from './BaseApiService';

class DocumentService extends BaseApiService {
  static async fetchUserDocuments() {
    // 定义请求 URL 和请求方法
    const apiUrl = `${this.API_BASE_URL}/api/v1/user-documents/`;
    const method = 'GET';

    // 使用基础服务类的 fetchDataWithAuth 方法发送请求
    const response = await this.fetchDataWithAuth(apiUrl, { method });

    if (response.ok) {
      // 如果响应状态码为 200-299，则解析并返回 JSON 数据
      return await response.json();
    } else {
      // 如果响应状态码不在这个范围内，抛出一个错误
      throw new Error('An error occurred while fetching user documents.');
    }
  }
}

export default DocumentService;
