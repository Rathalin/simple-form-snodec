// export interface LoginResponse {
//   user?: User,
//   error?: {
//     email?: {
//       required?: boolean
//       notExisting?: boolean
//     }
//     password?: {
//       required?: boolean
//       wrong?: boolean
//     }
//   }
// }

import type { IApiService } from "../api-service-interface"
import type { CreateCommentResponse } from "../api/comment-protocol"
import type { CreateThreadResponse, GetThreadByUuidResponse } from "../api/thread-protocol"
import type { CreateTopicResponse, GetTopicByUuidResponse, GetTopicsResponse } from "../api/topic-protocol"


class ApiMockService implements IApiService {

  private users = mockUserResponse
  private topics = mockTopicsResponse
  private threads = mockThreadsResponse

  // Public methods

  async login(email: string, password: string) {
    // const user: User = {
    //   uuid: crypto.randomUUID(),
    //   email,
    //   username: email,
    //   created_at: new Date().toDateString(),
    //   color_hex: this.getRandomDarkColor(),
    // }
    // this.users.push(user)
    // return {
    //   user
    // }
  }

  async logout(): Promise<void> {
    // this.users = this.users.filter(u => u.uuid != user.uuid)
  }


  async getTopics(): Promise<GetTopicsResponse> {
    const topics = structuredClone(this.topics)
    topics.data.forEach((t: { threads: any }) => {
      t.threads = undefined
    })
    return topics
  }

  async getTopicByUuid(uuid: string): Promise<GetTopicByUuidResponse> {
    return { data: structuredClone(this.topics.data.find((t: { uuid: string }) => t.uuid === uuid)!) }
  }

  async createTopic(title: string, description: string, user: { uuid: string, username: string, color_hex: string }): Promise<CreateTopicResponse> {
    const newTopic = {
      uuid: this.getNewUuid(),
      title,
      description,
      created_at: this.now(),
      user: { ...user },
      threads: [],
    }
    this.topics.data.push(newTopic)
    return { data: newTopic }
  }

  async getThreadByUuid(uuid: string): Promise<GetThreadByUuidResponse> {
    return { data: this.threads.data.find((thread: { uuid: string }) => thread.uuid === uuid)! }
  }

  async createThread(title: string, topicUuid: string, user: { uuid: string, username: string, color_hex: string }): Promise<CreateThreadResponse> {
    const newThread = {
      uuid: this.getNewUuid(),
      title,
      created_at: this.now(),
      user: { ...user },
      topic: {
        uuid: topicUuid,
        title: '',
      },
      comments: [],
    }
    this.threads.data.push(newThread)
    return { data: newThread }
    // const topic = await this.getTopicByUUID(topicUuid)
    // if (topic == null) {
    //   throw new Error(`Topic with uuid '${topicUuid}' not found.`)
    // }
    // this.threads.push({
    //   uuid: this.getNewUuid(),
    //   title,
    //   topic,
    //   created_at: this.now(),
    //   user: { ...user },
    // })
  }

  async createComment(content: string, threadUuid: string, user: { uuid: string, username: string, color_hex: string }): Promise<CreateCommentResponse> {
    const newComment = {
      uuid: this.getNewUuid(),
      content,
      created_at: this.now(),
      user: { ...user },
    }
    this.threads.data.find(th => th.uuid === threadUuid)!.comments.push(newComment)
    return { data: structuredClone(newComment) }
    // const thread = await this.getThreadByUUID(threadUuid)
    // if (thread == null) {
    //   throw new Error(`Thread with uuid '${threadUuid}' not found.`)
    // }
    // this.comments.push({
    //   uuid: this.getNewUuid(),
    //   content,
    //   created_at: this.now(),
    //   thread,
    //   user: { ...user },
    // })
  }

  // Private methods

  private now(): string {
    return new Date().toISOString()
  }


  private getNewUuid(): string {
    return crypto?.randomUUID() ?? `UUID${new Date().getTime()}`
  }

}

// Mock data

const mockUserResponse = [
  {
    uuid: '90fe2d9c-0b74-11ed-9873-08002771075f',
    username: 'Petrosilius Zwackelmann',
    email: 'petrosilius.zwackelmann@zwicki-buxtehude.de',
    color_hex: '#3d315b',
    created_at: '2015-03-11 02:40:19',
  },
]

const mockThreadsResponse = {
  data: [
    {
      uuid: 'b60af287-0b74-11ed-9873-08002771075f',
      title: 'Sacher Torte',
      created_at: '2022-07-23 20:13:38',
      user: {
        uuid: mockUserResponse[0].uuid,
        username: mockUserResponse[0].username,
        color_hex: mockUserResponse[0].color_hex,
      },
      topic: {
        uuid: 'aae74cc2-0b74-11ed-9873-08002771075f',
        title: 'Cake 🍰',
      },
      comments: [
        {
          uuid: 'c1f8d260-0b74-11ed-9873-08002771075f',
          content: 'I like Sacher Torte, pretty neat Austrian dish.',
          created_at: '2022-07-23 20:18:06',
          user: {
            uuid: '97c85a5f-0b74-11ed-9873-08002771075f',
            username: 'Wachtmeister Alois Dimpfelmoser',
            color_hex: '#444b6e',
          },
        },
      ]
    }
  ]
}

const mockTopicsResponse = {
  data: [
    {
      uuid: 'aae74cc2-0b74-11ed-9873-08002771075f',
      title: 'Cake 🍰',
      description: 'Discussions about cake',
      created_at: '2022-07-23 20:08:03',
      user: {
        uuid: mockUserResponse[0].uuid,
        username: mockUserResponse[0].username,
        color_hex: mockUserResponse[0].color_hex,
      },
      threads: [
        {
          uuid: mockThreadsResponse.data[0].uuid,
          title: mockThreadsResponse.data[0].title,
          created_at: mockThreadsResponse.data[0].created_at,
          user: {
            uuid: mockThreadsResponse.data[0].user.uuid,
            username: mockThreadsResponse.data[0].user.username,
          }
        },
      ]
    }
  ]
}


export const apiMockService = new ApiMockService()
