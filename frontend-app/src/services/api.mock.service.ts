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

  async getUsers() {
    return this.users
  }

  async getUserByUUID(uuid: string) {
    return this.users.find(user => user.uuid == uuid) ?? null
  }

  async getTopics() {
    return this.topics
  }

  async getTopicByUUID(uuid: string) {
    return this.topics.find(topic => topic.uuid === uuid) ?? null
  }

  async getThreads() {
    return this.threads
  }

  async getThreadByUUID(uuid: string) {
    return this.threads.find(thread => thread.uuid === uuid) ?? null
  }

  async getThreadsByTopicUUID(uuid: string) {
    return this.threads.filter(thread => thread.topic.uuid === uuid)
  }

  async getComments() {
    return this.comments
  }

  async getCommentsByThreadUuid(uuid: string) {
    return this.comments.filter(comment => comment.thread.uuid === uuid)
  }

}

export const apiMockService = new ApiMockService()
