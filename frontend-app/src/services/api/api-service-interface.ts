import type { UserDTO } from "@/types/UserDTO"
import type {
  CreateCommentResponse
} from "./protocols/comment-protocol"
import type {
  CreateThreadResponse,
  GetThreadByUuidResponse,
} from "./protocols/thread-protocol"
import type {
  CreateTopicResponse,
  GetTopicByUuidResponse,
  GetTopicsResponse,
} from "./protocols/topic-protocol"

export interface IApiService {
  login: (username: string, password: string) => Promise<{
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
  }>
  logout: () => Promise<void>
  getUsers: () => Promise<UserDTO[]>
  getUserByUuid: (uuid: string) => Promise<UserDTO>
  getTopics: () => Promise<GetTopicsResponse>
  getTopicByUuid: (uuid: string) => Promise<GetTopicByUuidResponse>
  createTopic: (title: string, description: string, user: UserDTO) => Promise<CreateTopicResponse>
  getThreadByUuid: (uuid: string) => Promise<GetThreadByUuidResponse>
  createThread: (title: string, topicUuid: string, user: UserDTO) => Promise<CreateThreadResponse>
  createComment: (content: string, threadUuid: string, user: UserDTO) => Promise<CreateCommentResponse>
}
