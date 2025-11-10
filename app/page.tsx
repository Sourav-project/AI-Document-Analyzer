"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import DocumentUpload from "@/components/DocumentUpload"
import ChatInterface from "@/components/ChatInterface"
import DocumentViewer from "@/components/DocumentViewer"
import SearchResults from "@/components/SearchResults"
import AIAgentBuilder from "@/components/AIAgentBuilder"
import AdvancedDashboard from "@/components/AdvancedDashboard"
import IntegrationHub from "@/components/IntegrationHub"
import type { Document, ChatMessage, SearchResult } from "@/types"

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [activeView, setActiveView] = useState<
    "upload" | "chat" | "documents" | "search" | "agents" | "dashboard" | "integrations"
  >("upload")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleDocumentUpload = (newDocuments: Document[]) => {
    setDocuments((prev) => [...prev, ...newDocuments])
    const allProcessed = newDocuments.every((doc) => doc.status === "completed")
    if (allProcessed && newDocuments.length > 0) {
      setTimeout(() => setActiveView("documents"), 1000)
    }
  }

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Based on RAG-enhanced analysis of your documents, I found relevant information about "${content}". The system extracted key entities and identified supporting citations with 92% confidence.`,
        sender: "ai",
        timestamp: new Date(),
        sourceDocuments: documents.slice(0, 2).map((doc) => doc.id),
        confidence: 0.92,
      }

      setMessages((prev) => [...prev, aiResponse])

      const mockResults: SearchResult[] = [
        {
          id: "1",
          documentId: documents[0]?.id || "1",
          documentName: documents[0]?.name || "Sample Document.pdf",
          excerpt: "Relevant information extracted from your documents...",
          relevanceScore: 0.92,
          pageNumber: 15,
          searchType: "hybrid",
        },
      ]

      setSearchResults(mockResults)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Mobile menu button - added animations */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg shadow-lg hover-lift active:scale-95 transition-all duration-300"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - added smooth animation */}
      <div
        className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative w-72 h-screen bg-white shadow-2xl transition-all duration-500 z-40 border-r border-slate-100 animate-fade-in-left`}
      >
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          documentCount={documents.length}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - enhanced with premium effects */}
        <div className="glass-effect border-b border-slate-200/40 px-8 py-6 flex items-center justify-between shadow-sm">
          <div className="ml-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold gradient-text-animate">AI Document Analyzer</h1>
            <p className="text-slate-500 text-sm mt-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Advanced document intelligence platform
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover-lift animate-pulse-glow">
            {documents.length} documents processed
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeView === "upload" && <DocumentUpload onUpload={handleDocumentUpload} />}
          {activeView === "chat" && (
            <ChatInterface messages={messages} onSendMessage={handleSendMessage} documents={documents} />
          )}
          {activeView === "documents" && (
            <DocumentViewer documents={documents} onSelectDocument={setSelectedDocument} />
          )}
          {activeView === "search" && <SearchResults results={searchResults} />}
          {activeView === "agents" && <AIAgentBuilder />}
          {activeView === "dashboard" && <AdvancedDashboard documents={documents} />}
          {activeView === "integrations" && <IntegrationHub />}
        </div>
      </div>
    </div>
  )
}
