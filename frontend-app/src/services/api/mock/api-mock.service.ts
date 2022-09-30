import type { UserDTO } from "@/types/UserDTO"
import type { IApiService } from "../api-service-interface"
import type { CreateCommentResponse } from "../protocols/comment-protocol"
import type { CreateThreadResponse, GetThreadByUuidResponse } from "../protocols/thread-protocol"
import type { CreateTopicResponse, GetTopicByUuidResponse, GetTopicsResponse } from "../protocols/topic-protocol"


class ApiMockService implements IApiService {

  private users: UserDTO[] = mockUserResponse
  private topics = mockTopicsResponse
  private threads = mockThreadsResponse

  // Public methods

  async login(email: string, password: string) {
    const user: UserDTO = {
      uuid: crypto.randomUUID(),
      email,
      username: email,
      created_at: new Date().toDateString(),
      color_hex: this.getRandomDarkColor(),
    }
    this.users.push(user)
    return {
      user
    }
  }

  async logout(): Promise<void> {
    // this.users = this.users.filter(u => u.uuid != user.uuid)
  }


  async getUserByUuid(uuid: string): Promise<UserDTO> {
    const foundUser = this.users.find(u => u.uuid === uuid)
    if (foundUser == null) {
      console.table(this.users)
      throw new Error(`No user found with uuid '${uuid}'`)
    }
    return foundUser
  }

  async getUsers(): Promise<UserDTO[]> {
    return [...this.users]
  }


  async getTopics(): Promise<GetTopicsResponse> {
    const topics = structuredClone(this.topics)
    topics.data.forEach((t: { threads: any }) => {
      t.threads = undefined
    })
    return topics
  }

  async getTopicByUuid(uuid: string): Promise<GetTopicByUuidResponse> {
    const foundTopic = { data: structuredClone(this.topics.data.find((t: { uuid: string }) => t.uuid === uuid)!) }
    console.table(foundTopic.data.threads)
    return foundTopic
  }

  async createTopic(title: string, description: string, user: UserDTO): Promise<CreateTopicResponse> {
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
    console.log(`GetThread by uuid ${uuid}`)
    return { data: this.threads.data.find((thread: { uuid: string }) => thread.uuid === uuid)! }
  }

  async createThread(title: string, topicUuid: string, user: UserDTO): Promise<CreateThreadResponse> {
    const newThread = {
      uuid: this.getNewUuid(),
      title,
      created_at: this.now(),
      user: { ...user },
      topic: {
        uuid: topicUuid,
        title: this.topics.data.find(t => t.uuid === topicUuid)!.title,
      },
      comments: [],
    }
    this.threads.data.push(newThread)
    this.topics.data.find(t => t.uuid === topicUuid)!.threads.push(newThread)
    return { data: newThread }
  }

  async createComment(content: string, threadUuid: string, user: UserDTO): Promise<CreateCommentResponse> {
    const newComment = {
      uuid: this.getNewUuid(),
      content,
      created_at: this.now(),
      user: { ...user },
    }
    this.threads.data.find(th => th.uuid === threadUuid)!.comments.push(newComment)
    return { data: structuredClone(newComment) }
  }

  public now(): string {
    return new Date().toISOString()
  }

  // Private methods

  private getNewUuid(): string {
    return crypto?.randomUUID() ?? `UUID${new Date().getTime()}`
  }

  private getRandomDarkColor() {
    const rgbMin = 30
    const rgbMax = 120
    const rgb: number[] = []
    for (let i = 0; i < 3; i++) {
      rgb.push(Math.floor((Math.random() * (rgbMax - rgbMin)) + rgbMin))
    }
    const hex = rgb
      .map(num => num.toString(16)) // To HEX
      .map(numStr => numStr.length === 1 ? '0' + numStr : numStr) // Add leading zero
    return `#${hex[0]}${hex[1]}${hex[2]}`
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

const mockThreadsResponse: {
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
  }[]
} = {
  data: [
    {
      uuid: 'b60af287-0b74-11ed-9873-08002771075f',
      title: 'Sacher Torte',
      created_at: '2022-07-23 20:13:38',
      user: {
        uuid: mockUserResponse[0].uuid,
        username: mockUserResponse[0].username,
        color_hex: mockUserResponse[0].color_hex,
        created_at: mockUserResponse[0].created_at,
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
            created_at: new Date().toString(),
          },
        },
      ]
    }
  ]
}

const mockTopicsResponse: {
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
  }[]
} = {
  data: [
    {
      uuid: 'aae74cc2-0b74-11ed-9873-08002771075f',
      title: 'Cake 🍰',
      description: 'Discussions about cake',
      created_at: '2022-07-23 20:08:03',
      user: {
        uuid: mockUserResponse[0].uuid,
        username: mockUserResponse[0].username,
        created_at: new Date().toString(),
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
            created_at: mockThreadsResponse.data[0].user.created_at,
          }
        },
      ]
    }
  ]
}


export const apiMockService = new ApiMockService()
