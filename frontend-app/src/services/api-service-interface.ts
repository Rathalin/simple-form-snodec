import type {
  CreateCommentResponse
} from "./api/comment-protocol"
import type {
  CreateThreadResponse,
  GetThreadsResponse,
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
  createTopic: (title: string, description: string) => Promise<CreateTopicResponse>
  getThreadByUuid: (uuid: string) => Promise<GetThreadsResponse>
  createThread: (title: string, topicUuid: string) => Promise<CreateThreadResponse>
  createComment: (content: string, threadUuid: string) => Promise<CreateCommentResponse>
}
