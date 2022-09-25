export interface GetTopicsResponse {
  data: {
    uuid: string
    title: string
    description: string
    created_at: string
    user: {
      uuid: string
      username: string
    }
  }[]
}

export interface GetTopicByUuidResponse {
  data: {
    uuid: string
    title: string
    description: string
    created_at: string
    user: {
      uuid: string
      username: string
      color_hex: string
    },
    threads: {
      uuid: string
      title: string
      created_at: string
      user: {
        uuid: string
        username: string
      }
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
    user: {
      uuid: string
      username: string
    }
  }
}
