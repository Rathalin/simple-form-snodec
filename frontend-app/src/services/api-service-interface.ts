import type {
  CreateCommentResponse
} from "./api/comment-protocol"
import type {
  CreateThreadResponse,
  GetThreadByUuidResponse,
} from "./api/thread-protocol"
import type {
  CreateTopicResponse,
  GetTopicByUuidResponse,
  GetTopicsResponse,
} from "./api/topic-protocol"

export interface IApiService {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  // getUsers: () => Promise<any[]>
  // getUserByUuid: () => Promise<any>
  getTopics: () => Promise<GetTopicsResponse>
  getTopicByUuid: (uuid: string) => Promise<GetTopicByUuidResponse>
  createTopic: (title: string, description: string, user: { uuid: string, username: string, color_hex: string }) => Promise<CreateTopicResponse>
  getThreadByUuid: (uuid: string) => Promise<GetThreadByUuidResponse>
  createThread: (title: string, topicUuid: string, user: { uuid: string, username: string, color_hex: string }) => Promise<CreateThreadResponse>
  createComment: (content: string, threadUuid: string, user: { uuid: string, username: string, color_hex: string }) => Promise<CreateCommentResponse>
}
