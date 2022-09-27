import type { UserDTO } from "@/types/UserDTO"

export interface GetTopicsResponse {
  data: {
    uuid: string
    title: string
    description: string
    created_at: string
    user: UserDTO
  }[]
}

export interface GetTopicByUuidResponse {
  data: {
    uuid: string
    title: string
    description: string
    created_at: string
    user: UserDTO,
    threads: {
      uuid: string
      title: string
      created_at: string
      user: UserDTO
    }[]
  }
}

export interface CreateTopicRequest {
  title: string
  description: string
}

export interface CreateTopicResponse {
  data: {
    uuid: string
    title: string
    description: string
    created_at: string
    user: UserDTO
  }
}
