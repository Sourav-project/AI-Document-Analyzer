"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, Zap, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"
import type { ChatMessage, Document } from "@/types"

interface ChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (content: string) => void
  documents: Document[]
}

const AI_RESPONSES = [
  {
    type: "analysis",
    content: `Based on my comprehensive analysis of your uploaded documents, I identified several key findings:\n\n• Contract Duration: 3-year service agreement with automatic renewal provisions\n• Payment Terms: Net-30 with quarterly reconciliation\n• Risk Factors: Limitation of liability capped at 12 months of service fees\n• Critical Clause: Force majeure provisions exclude pandemic-related events\n\nI found 12 potential areas requiring legal review, particularly around IP ownership clauses.`,
    confidence: 0.94,
  },
  {
    type: "extraction",
    content: `I've successfully extracted the following key entities from your documents:\n\nOrganizations: Acme Corp, Global Finance Inc, TechVentures LLC\nPeople: John Smith (Legal Lead), Sarah Johnson (CFO), Michael Chen (CTO)\nLocations: New York, London, Singapore\n\nThese entities are cross-referenced across 8 documents with 156 total mentions.`,
  },
  {
    type: "summary",
    content: `Document Summary:\n\nThis is a comprehensive service agreement establishing terms between the parties. Key highlights:\n\n✓ Scope: 24/7 managed IT services including infrastructure, security, and support\n✓ Duration: 36 months with performance SLAs of 99.9% uptime\n✓ Cost: $250K annually with volume discounts for additional services\n✓ Governance: Quarterly business reviews with escalation procedures\n✓ Compliance: GDPR, SOC2 Type II certified, regular audit rights\n\nThe agreement is favorable for both parties with balanced risk allocation.`,
  },
  {
    type: "comparison",
    content: `Comparative Analysis of 3 contracts:\n\nClient A Agreement:\n→ 2-year term | $180K/year | 99% uptime SLA\n→ Payment: Net-60 | Standard liability cap\n→ Termination: 90-day notice required\n\nClient B Agreement:\n→ 3-year term | $250K/year | 99.9% uptime SLA  \n→ Payment: Net-30 | Enhanced liability cap (18 months)\n→ Termination: 60-day notice required\n\nKey Difference: Client B agreement has more favorable terms with shorter notice period and better uptime guarantees.`,
  },
  {
    type: "risk",
    content: `⚠️ Risk Assessment Report:\n\nHigh Risk Items (2):\n1. Unlimited indemnification obligations in Section 7.2\n2. One-sided termination rights favoring vendor\n\nMedium Risk Items (4):\n1. Data retention policies not clearly defined\n2. Subcontractor approval process missing\n3. Change order procedures lack clarity\n4. Performance metrics lack financial penalties\n\nLow Risk Items (3):\n1. Standard confidentiality clauses\n2. Normal IP ownership provisions\n3. Standard insurance requirements\n\nRecommendation: Negotiate items 1 and 2 before signing.`,
  },
  {
    type: "insights",
    content: `Advanced Insights from Multi-Document Analysis:\n\n📊 Market Trends Identified:\n• Average contract value increased 23% YoY\n• Service SLA standards trending toward 99.95%\n• Payment terms shifting from Net-60 to Net-45\n• Auto-renewal clauses in 87% of recent contracts\n\n💡 Your Position:\n• Your contracts align with market standards\n• Payment terms are favorable compared to peers\n• Missing auto-escalation clauses vs. 65% of market\n\nAction Items:\n→ Consider adding auto-escalation for inflation (2.5% annually)\n→ Add quarterly adjustment provisions\n→ Include technology refresh provisions`,
  },
]

export default function ChatInterface({ messages, onSendMessage, documents }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    setLoading(true)
    onSendMessage(input)
    setInput("")
    setLoading(false)
  }

  const renderAIResponse = (response: (typeof AI_RESPONSES)[0]) => {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          {response.type === "analysis" && (
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1 animate-float" size={20} />
          )}
          {response.type === "extraction" && (
            <TrendingUp className="text-green-600 flex-shrink-0 mt-1 animate-float" size={20} />
          )}
          {response.type === "summary" && (
            <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1 animate-float" size={20} />
          )}
          {response.type === "comparison" && (
            <TrendingUp className="text-orange-600 flex-shrink-0 mt-1 animate-float" size={20} />
          )}
          {response.type === "risk" && (
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1 animate-float" size={20} />
          )}
          {response.type === "insights" && (
            <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1 animate-float" size={20} />
          )}
        </div>
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{response.content}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="glass-effect border-b border-slate-200 px-8 py-6 shadow-sm animate-fade-in-down">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 animate-fade-in-right">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-lift">
            <MessageCircle className="text-white animate-float" size={24} />
          </div>
          Advanced Document Intelligence Ready
        </h2>
        <p className="text-slate-600 text-sm mt-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Ask complex questions, compare documents, extract entities, generate summaries, and get answers with precise
          source citations.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center animate-fade-in-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 hover-lift animate-float">
                <Zap className="text-blue-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 animate-fade-in-up">Start your conversation</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Ask me anything about your documents. I'll analyze them and provide answers with source citations.
              </p>

              {/* Suggestion Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  "Perform multi-document RAG analysis to compare contract terms and identify risks",
                  "Generate AI summary with sentiment analysis and compliance checking across all documents",
                  "Extract entities and perform blockchain verification of document authenticity",
                  "Create automated workflow to process invoices and sync with accounting systems",
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => onSendMessage(suggestion)}
                    className={`text-left bg-white rounded-xl p-4 border border-slate-200 hover-lift hover:border-blue-400 transition-all duration-300 animate-stagger-${i + 1}`}
                  >
                    <p className="text-sm text-slate-700 font-medium">{suggestion}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-stagger-${(idx % 6) + 1}`}
              >
                {msg.sender === "user" ? (
                  // User message
                  <div className="max-w-md lg:max-w-xl rounded-2xl px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover-lift transition-all duration-300">
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ) : (
                  // AI response with rich formatting
                  <div className="max-w-2xl rounded-2xl px-6 py-5 bg-white text-slate-900 border border-slate-200 shadow-md hover-lift transition-all duration-300">
                    {renderAIResponse(AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)])}
                    {msg.confidence && (
                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                        <span>Confidence: {Math.round(msg.confidence * 100)}%</span>
                        <span className="text-green-600 font-semibold animate-float">✓ Verified</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="glass-effect border-t border-slate-200 p-6 shadow-lg animate-fade-in-up">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask questions, request summaries, compare documents..."
            disabled={loading || documents.length === 0}
            className="flex-1 px-6 py-4 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent hover-lift transition-all duration-300"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim() || documents.length === 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover-lift shadow-glow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <div
          className="flex justify-center gap-3 mt-4 text-xs text-slate-500 flex-wrap animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="flex items-center gap-1">● Semantic Search</span>
          <span className="flex items-center gap-1">● Entity Extraction</span>
          <span className="flex items-center gap-1">● Multi-Document Analysis</span>
        </div>
      </div>
    </div>
  )
}
