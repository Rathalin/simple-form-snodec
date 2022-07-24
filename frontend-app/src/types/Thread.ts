import type { Topic } from "./Topic"
import type { User } from "./User"

export interface Thread {
  uuid: string
  title: string
  created_at: string
  topic: Topic
  user: User
}
