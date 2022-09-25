export interface CreateCommentRequest {
  content: string
  threadUuid: string
}

export interface CreateCommentResponse {
  data: {
    uuid: string
    content: string
    created_at: string
    user: {
      uuid: string
      username: string
    }
  }
}
