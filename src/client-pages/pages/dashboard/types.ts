export interface DashboardItem {
  id: string
  userId: string
  createdAt: Date
  published: boolean
  name: string
  description: string
  content: string
  visits: number
  submissions: number
  shareURL: string
  coverThumbnail?: string
}
