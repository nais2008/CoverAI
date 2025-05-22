export interface NewsCartProps {
  id: number
  title: string
  description: string
  createdAt: string
  image?: string
  onDelete: () => void
}

export interface NewsItem {
  pk: number
  title: string
  description: string
  created_at: string
  image?: { image: string }
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onNewsCreated: (item: NewsItem) => void
}
