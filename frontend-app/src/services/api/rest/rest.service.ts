import type { UserDTO } from "@/types/UserDTO"
import type { IApiService } from "../api-service-interface"
import type {
  CreateCommentRequest,
  CreateCommentResponse,
} from "../protocols/comment-protocol"
import type {
  CreateThreadRequest,
  CreateThreadResponse,
  GetThreadByUuidResponse,
} from "../protocols/thread-protocol"
import type {
  CreateTopicRequest,
  CreateTopicResponse,
  GetTopicByUuidResponse,
  GetTopicsResponse,
} from "../protocols/topic-protocol"

class RestService implements IApiService {
  private readonly API_URL: string = 'http://localhost:8080/api'

  async login(username: string, password: string): Promise<{
    user?: UserDTO,
    error?: {
      email?: {
        required?: boolean
        notExisting?: boolean
      }
      password?: {
        required?: boolean
        wrong?: boolean
      }
    }
  }> {
    // TODO
    return {

    }
  }

  async logout() {
    //TODO
  }


  async getUsers() {
    const response = await fetch(`${this.API_URL}/users`, {
      method: 'GET',
    })
    return await response.json()
  }

  async getUserByUuid(uuid: string): Promise<{
    uuid: string
    username: string
    email: string
    created_at: string
    color_hex: string
  }> {
    const response = await fetch(`${this.API_URL}/users/${uuid}`, {
      method: 'GET',
    })
    return await response.json()
  }


  async getTopics(): Promise<GetTopicsResponse> {
    const response = await fetch(`${this.API_URL}/topic`, {
      method: 'GET',
    })
    return { data: await response.json() }
  }

  async getTopicByUuid(uuid: string): Promise<GetTopicByUuidResponse> {
    const response = await fetch(`${this.API_URL}/topic/${uuid}`, {
      method: 'POST',
    })
    return { data: await response.json() }
  }

  async createTopic(title: string, description: string): Promise<CreateTopicResponse> {
    const requestData: CreateTopicRequest = {
      title,
      description,
    }
    const response = await fetch(`${this.API_URL}/topic`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
    return { data: await response.json() }
  }


  async getThreadByUuid(uuid: string): Promise<GetThreadByUuidResponse> {
    const response = await fetch(`${this.API_URL}/thread/${uuid}`, {
      method: 'GET',
    })
    return { data: await response.json() }
  }

  async createThread(title: string, topicUuid: string): Promise<CreateThreadResponse> {
    const requestData: CreateThreadRequest = {
      title,
      topicUuid,
    }
    const response = await fetch(`${this.API_URL}/thread/`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
    return { data: await response.json() }
  }


  async createComment(content: string, threadUuid: string): Promise<CreateCommentResponse> {
    const requestData: CreateCommentRequest = {
      content,
      threadUuid,
    }
    const response = await fetch(`${this.API_URL}/comment/`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
    return { data: await response.json() }
  }

}

export const apiService = new RestService()
