export interface GetThreadsResponse {
  data: {
    uuid: string
    title: string
    created_at: string
    user: {
      uuid: string
      username: string
    },
    comments: {
      uuid: string
      content: string
      created_at: string
      user: {
        uuid: string
        username: string
        color_hex: string
      }
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
    user: {
      uuid: string
      username: string
    }
  }
}
