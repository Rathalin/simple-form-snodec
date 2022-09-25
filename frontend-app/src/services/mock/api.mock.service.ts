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

import { useAuthStore } from "@/stores/auth-store"
import type { IApiService } from "../api-service-interface"
import type { CreateCommentResponse } from "../api/comment-protocol"
import type { CreateThreadResponse, GetThreadsResponse } from "../api/thread-protocol"
import type { CreateTopicResponse, GetTopicByUuidResponse, GetTopicsResponse } from "../api/topic-protocol"


class ApiMockService implements IApiService {

  private users = [...mockUserResponses]
  private topics = [...mockTopicsResponses]
  private threads = [...mockThreadsResponses]
  private authStore = useAuthStore()

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
    topics.forEach((t: { data: { threads: any } }) => t.data.threads = undefined)
    return topics
  }

  async getTopicByUuid(uuid: string): Promise<GetTopicByUuidResponse> {
    return structuredClone(this.topics.find(t => t.data.uuid === uuid)!)
  }

  async createTopic(title: string, description: string): Promise<CreateTopicResponse> {
    const newTopic = {
      data: {
        uuid: this.getNewUuid(),
        title,
        description,
        created_at: this.now(),
        user: { ...this.authStore.user! },
        threads: [],
      }
    }
    this.topics.push(newTopic)
    return newTopic
  }

  async getThreadByUuid(uuid: string): Promise<GetThreadsResponse> {
    return structuredClone(this.threads.find(thread => thread.data.uuid === uuid))
  }

  async createThread(title: string, topicUuid: string): Promise<CreateThreadResponse> {
    const newThread = {
      data: {
        uuid: this.getNewUuid(),
        title,
        created_at: this.now(),
        user: { ...this.authStore.user! },
        comments: [],
      }
    }
    this.threads.push(newThread)
    return newThread
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

  async createComment(content: string, threadUuid: string): Promise<CreateCommentResponse> {
    const newComment = {
      uuid: this.getNewUuid(),
      content,
      created_at: this.now(),
      user: {
        uuid: this.authStore.user!.uuid,
        username: this.authStore.user!.username,
        color_hex: this.authStore.user!.color_hex,
      },
    }
    this.threads.find(th => th.data.uuid === threadUuid)!.data.comments.push(newComment)
    return { data: newComment }
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

const mockUserResponses = [
  {
    uuid: '90fe2d9c-0b74-11ed-9873-08002771075f',
    username: 'Petrosilius Zwackelmann',
    email: 'petrosilius.zwackelmann@zwicki-buxtehude.de',
    color_hex: '#3d315b',
    created_at: '2015-03-11 02:40:19',
  },
]

const mockThreadsResponses = [
  {
    data: {
      uuid: 'b60af287-0b74-11ed-9873-08002771075f',
      title: 'Sacher Torte',
      created_at: '2022-07-23 20:13:38',
      user: {
        uuid: mockUserResponses[0].uuid,
        username: mockUserResponses[0].username,
        color_hex: mockUserResponses[0].color_hex,
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
  },
]

const mockTopicsResponses = [
  {
    data: {
      uuid: 'aae74cc2-0b74-11ed-9873-08002771075f',
      title: 'Cake 🍰',
      description: 'Discussions about cake',
      created_at: '2022-07-23 20:08:03',
      user: {
        uuid: mockUserResponses[0].uuid,
        username: mockUserResponses[0].username,
      },
      threads: [
        {
          uuid: mockThreadsResponses[0].data.uuid,
          title: mockThreadsResponses[0].data.title,
          created_at: mockThreadsResponses[0].data.created_at,
          user: {
            uuid: mockThreadsResponses[0].data.user.uuid,
            username: mockThreadsResponses[0].data.user.username,
          }
        },
      ]
    }
  },
]


export const apiMockService = new ApiMockService()
