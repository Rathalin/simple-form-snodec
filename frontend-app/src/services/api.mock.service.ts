import type { Comment } from "@/types/Comment"
import type { Thread } from "@/types/Thread"
import type { Topic } from "@/types/Topic"
import type { User } from "@/types/User"

class ApiMockService {

  private readonly users: User[] = [
    {
      uuid: '90fe2d9c-0b74-11ed-9873-08002771075f',
      username: 'Petrosilius Zwackelmann',
      email: 'petrosilius.zwackelmann@zwicki-buxtehude.de',
      color_hex: '#3d315b',
      created_at: '2015-03-11 02:40:19',
    },
    {
      uuid: '97c85a5f-0b74-11ed-9873-08002771075f',
      username: 'Wachtmeister Alois Dimpfelmoser',
      email: 'alois.dimpfelmoser@polizei.de',
      color_hex: '#444b6e',
      created_at: '2020-02-20 09:58:07',
    },
    {
      uuid: '9feb62b2-0b74-11ed-9873-08002771075f',
      username: 'Seppl1994',
      email: 'seppel.schubert@tum.de',
      color_hex: '#848607',
      created_at: '2017-09-25 03:00:00',
    },
    {
      uuid: 'a48fae48-0b74-11ed-9873-08002771075f',
      username: 'xXL9Sn1pr360Xx',
      email: 'kasperl.wimmer@tum.de',
      color_hex: '#4c6134',
      created_at: '2017-09-25 03:00:00',
    },
    {
      uuid: '7fea61b2-0b74-11ed-9873-08002771075f',
      username: 'Phil Toolan 🍀',
      email: 'philtoolan@gmail.com',
      color_hex: '#d31717',
      created_at: '2022-08-18 10:40:01',
    },
  ]

  private readonly topics: Topic[] = [
    {
      uuid: 'aae74cc2-0b74-11ed-9873-08002771075f',
      title: 'Cake 🍰',
      description: 'Discussions about cake',
      created_at: '2022-07-23 20:08:03',
      user: this.users[2],
    },
    {
      uuid: 'b0eebc52-0b74-11ed-9873-08002771075f',
      title: 'Soup 🥣',
      description: 'Share your thoughts about soup',
      created_at: '2022-07-23 20:11:35',
      user: this.users[3],
    },
    {
      uuid: 'f38d81d7-0d18-11ed-9af8-08002771075f',
      title: 'Wonton / Dumplings 🥟',
      description: 'Share your thoughts about soup',
      created_at: '2022-07-23 20:11:35',
      user: this.users[3],
    },
  ]

  private readonly threads: Thread[] = [
    {
      uuid: 'b60af287-0b74-11ed-9873-08002771075f',
      title: 'Sacher Torte',
      created_at: '2022-07-23 20:13:38',
      topic: this.topics[0],
      user: this.users[2],
    },
    {
      uuid: 'bb73a5ae-0b74-11ed-9873-08002771075f',
      title: 'Eating cake with a straw',
      created_at: '2022-07-23 20:15:16',
      topic: this.topics[0],
      user: this.users[0],
    },
    {
      uuid: '31d29be3-0d18-11ed-9af8-08002771075f',
      title: 'Is tea soup?',
      created_at: '2022-07-22 15:23:09',
      topic: this.topics[1],
      user: this.users[3],
    },
    {
      uuid: '3c29a7f9-0d18-11ed-9af8-08002771075f',
      title: 'Soup seasoning',
      created_at: '2022-07-23 11:24:27',
      topic: this.topics[1],
      user: this.users[0],
    },
    {
      uuid: '410716cd-0d18-11ed-9af8-08002771075f',
      title: 'Goulash soup is the best soup',
      created_at: '2022-07-26 21:26:12',
      topic: this.topics[1],
      user: this.users[2],
    },
  ]

  private readonly comments: Comment[] = [
    {
      uuid: 'c1f8d260-0b74-11ed-9873-08002771075f',
      content: 'I like Sacher Torte, pretty neat Austrian dish.',
      created_at: '2022-07-23 20:18:06',
      thread: this.threads[0],
      user: this.users[1],
    },
    {
      uuid: 'c5dfcb12-0b74-11ed-9873-08002771075f',
      content: '????',
      created_at: '2022-07-23 20:20:14',
      thread: this.threads[1],
      user: this.users[2],
    },
    {
      uuid: 'cf0503cc-0b74-11ed-9873-08002771075f',
      content: 'Yeah, wtf dude',
      created_at: '2022-07-23 20:20:39',
      thread: this.threads[1],
      user: this.users[3],
    },
    {
      uuid: 'd3663df9-0b74-11ed-9873-08002771075f',
      content: 'You kids need to expand your horizon. I always blend cake with some almond milk to make it more enjoyable.',
      created_at: '2022-07-23 20:24:33',
      thread: this.threads[1],
      user: this.users[0],
    },
    {
      uuid: 'd9bdca23-0b74-11ed-9873-08002771075f',
      content: 'Not ok. Not even for a wizard.',
      created_at: '2022-07-23 20:25:46',
      thread: this.threads[1],
      user: this.users[3],
    },
  ]

  public demoUser: User = this.users[4]

  private now(): string {
    return new Date().toISOString()
  }

  private getNewUuid(): string {
    return self.crypto?.randomUUID() ?? `UUID${new Date().getTime()}`
  }

  async getUsers(): Promise<User[]> {
    return structuredClone(this.users)
  }

  async getUserByUUID(uuid: string): Promise<User | null> {
    return structuredClone(this.users.find(user => user.uuid == uuid) ?? null)
  }

  async getTopics(): Promise<Topic[]> {
    return structuredClone(this.topics)
  }

  async getTopicByUUID(uuid: string): Promise<Topic | null> {
    return structuredClone(this.topics.find(topic => topic.uuid === uuid) ?? null)
  }

  async createTopic(title: string, description: string): Promise<void> {
    this.topics.push({
      uuid: this.getNewUuid(),
      title,
      description,
      created_at: this.now(),
      user: this.demoUser,
    })
  }

  async getThreadByUUID(uuid: string): Promise<Thread | null> {
    return structuredClone(this.threads.find(thread => thread.uuid === uuid) ?? null)
  }

  async createThread(title: string, topicUuid: string): Promise<void> {
    const topic = await this.getTopicByUUID(topicUuid)
    if (topic == null) {
      throw new Error(`Topic with uuid '${topicUuid}' not found.`)
    }
    this.threads.push({
      uuid: this.getNewUuid(),
      title,
      topic,
      created_at: this.now(),
      user: this.demoUser,
    })
  }

  async getThreadsByTopicUUID(uuid: string): Promise<Thread[]> {
    return structuredClone(this.threads.filter(thread => thread.topic.uuid === uuid))
  }

  async getCommentsByThreadUuid(uuid: string): Promise<Comment[]> {
    return structuredClone(this.comments.filter(comment => comment.thread.uuid === uuid))
  }

  async createComment(content: string, threadUuid: string): Promise<void> {
    const thread = await this.getThreadByUUID(threadUuid)
    if (thread == null) {
      throw new Error(`Thread with uuid '${threadUuid}' not found.`)
    }
    this.comments.push({
      uuid: this.getNewUuid(),
      content,
      created_at: this.now(),
      thread,
      user: this.demoUser,
    })
  }

}

export const apiMockService = new ApiMockService()
