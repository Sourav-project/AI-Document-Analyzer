export interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  status: "processing" | "completed" | "error"
  pages?: number
  wordCount?: number
  summary?: string
  tags?: string[]
  language?: string
  securityLevel?: "public" | "confidential" | "restricted"
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  sourceDocuments?: string[]
  confidence?: number
}

export interface SearchResult {
  id: string
  documentId: string
  documentName: string
  excerpt: string
  relevanceScore: number
  pageNumber: number
  searchType: "semantic" | "keyword" | "hybrid"
}

export interface AIAgent {
  id: string
  name: string
  description: string
  isActive: boolean
  successRate: number
}

export interface Integration {
  id: string
  name: string
  type: "storage" | "crm" | "api"
  status: "connected" | "disconnected"
}
