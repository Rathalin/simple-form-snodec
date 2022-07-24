import type { Thread } from "./Thread"
import type { User } from "./User"

export interface Comment {
  uuid: string
  content: string
  created_at: string
  thread: Thread
  user: User
}