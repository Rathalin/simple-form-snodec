import type { Thread } from "./Thread"
import type { User } from "./User"

export interface Comment {
  id: number
  content: string
  created_at: string
  thread: Thread
  user: User
}