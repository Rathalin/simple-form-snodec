import type { User } from "./User"

export interface Topic {
  id: number
  title: string
  description: string
  created_at: string
  user: User
}
