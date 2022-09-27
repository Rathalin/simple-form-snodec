import type { UserDTO } from "@/types/UserDTO"

export interface GetThreadByUuidResponse {
  data: {
    uuid: string
    title: string
    created_at: string
    user: UserDTO,
    topic: {
      uuid: string
      title: string
    }
    comments: {
      uuid: string
      content: string
      created_at: string
      user: UserDTO
    }[]
  }
}

export interface CreateThreadRequest {
  title: string
  topicUuid: string
}

export interface CreateThreadResponse {
  data: {
    uuid: string
    title: string
    created_at: string
    user: UserDTO
  }
}
