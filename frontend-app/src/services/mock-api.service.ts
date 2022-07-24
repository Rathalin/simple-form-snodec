import type { Comment } from "@/types/Comment"
import type { Thread } from "@/types/Thread"
import type { Topic } from "@/types/Topic"
import type { User } from "@/types/User"

class MockApiService {

  private readonly users: User[] = [
    {
      uuid: '0',
      email: 'petrosilius.zwackelmann@zwicki-buxtehude.de',
      created_at: '2015-03-11 02:40:19',
    },
    {
      uuid: '1',
      email: 'alois.dimpfelmoser@polizei.de',
      created_at: '2020-02-20 09:58:07',
    },
    {
      uuid: '2',
      email: 'seppel.schubert@tum.de',
      created_at: '2017-09-25 03:00:00',
    },
    {
      uuid: '3',
      email: 'kasperl.wimmer@tum.de',
      created_at: '2017-09-25 03:00:00',
    },
  ]

  private readonly topics: Topic[] = [
    {
      uuid: '0',
      title: 'Cake',
      description: 'Discussions about cake',
      created_at: '2022-07-23 20:08:03',
      user: this.users[2],
    },
    {
      uuid: '1',
      title: 'Soup',
      description: 'Share your thoughts about soup',
      created_at: '2022-07-23 20:11:35',
      user: this.users[3],
    },
  ]

  private readonly threads: Thread[] = [
    {
      uuid: '0',
      title: 'Sacher Torte',
      created_at: '2022-07-23 20:13:38',
      topic: this.topics[0],
      user: this.users[2],
    },
    {
      uuid: '1',
      title: 'Eating cake with a straw',
      created_at: '2022-07-23 20:15:16',
      topic: this.topics[0],
      user: this.users[0],
    },
  ]

  private readonly comments: Comment[] = [
    {
      uuid: '0',
      content: 'I like Sacher Torte, pretty neat Austrian dish.',
      created_at: '2022-07-23 20:18:06',
      thread: this.threads[0],
      user: this.users[1],
    },
    {
      uuid: '1',
      content: '????',
      created_at: '2022-07-23 20:20:14',
      thread: this.threads[0],
      user: this.users[2],
    },
    {
      uuid: '2',
      content: 'Yeah, wtf dude',
      created_at: '2022-07-23 20:20:39',
      thread: this.threads[0],
      user: this.users[3],
    },
    {
      uuid: '3',
      content: 'You kids need to expand your horizon. I always blend cake with some cat milk to get it more enjoyable.',
      created_at: '2022-07-23 20:24:33',
      thread: this.threads[0],
      user: this.users[0],
    },
    {
      uuid: '4',
      content: 'Not ok. Not even for a wizard.',
      created_at: '2022-07-23 20:25:46',
      thread: this.threads[0],
      user: this.users[3],
    },
  ]

  async getUsers() {
    return Promise.resolve(this.users)
  }

  async getTopics() {
    return Promise.resolve(this.topics)
  }

  async getTopicByUUID(uuid: string) {
    return Promise.resolve(this.topics.find(topic => topic.uuid === uuid) ?? null)
  }

  async getThreads() {
    return Promise.resolve(this.threads)
  }

  async getThreadByUUID(uuid: string) {
    return Promise.resolve(this.threads.find(thread => thread.uuid === uuid) ?? null)
  }

  async getThreadsByTopicUUID(uuid: string) {
    return Promise.resolve(this.threads.filter(thread => thread.topic.uuid === uuid))
  }

  async getComments() {
    return Promise.resolve(this.comments)
  }

  async getCommentsByThreadUuid(uuid: string) {
    return Promise.resolve(this.comments.filter(comment => comment.thread.uuid === uuid))
  }

}

export const mockApiService = new MockApiService()
