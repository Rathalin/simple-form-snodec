import type { User } from "./User"

export interface Topic {
  uuid: string
  title: string
  description: string
  created_at: string
  user: User
}
