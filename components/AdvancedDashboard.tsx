"use client"
import type { Document } from "@/types"
import { BarChart3 } from "lucide-react"

interface AdvancedDashboardProps {
  documents: Document[]
}

export default function AdvancedDashboard({ documents }: AdvancedDashboardProps) {
  const totalPages = documents.reduce((sum, doc) => sum + (doc.pages || 0), 0)
  const totalWords = documents.reduce((sum, doc) => sum + (doc.wordCount || 0), 0)
  const processingTime = documents.length > 0 ? Math.floor(Math.random() * 120) + 30 : 0

  const stats = [
    {
      label: "Documents Processed",
      value: documents.length,
      icon: "📄",
      change: "+12% from last month",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "AI Accuracy Rate",
      value: "95%",
      icon: "⚡",
      change: "+3% improvement",
      color: "from-green-500 to-green-600",
    },
    {
      label: "Avg Processing Time",
      value: "2.3s",
      icon: "⏱️",
      change: "-15% faster",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Cost Savings",
      value: "$12,500",
      icon: "💰",
      change: "This month",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const systemAspects = [
    {
      name: "Data Processing Pipeline",
      icon: "🔄",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      efficiency: "92%",
      description: "PDF parsing, OCR, chunking, table extraction",
      tasks: [
        { label: "OCR Processing", progress: 88 },
        { label: "Text Extraction", progress: 95 },
        { label: "Layout Analysis", progress: 87 },
      ],
    },
    {
      name: "Retrieval-Augmented Generation (RAG)",
      icon: "🎯",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      efficiency: "94%",
      description: "Core method combining retrieval and generation",
      tasks: [
        { label: "Context Precision", progress: 91 },
        { label: "Context Recall", progress: 93 },
        { label: "Answer Relevance", progress: 96 },
      ],
    },
    {
      name: "Deep Learning Models",
      icon: "🧠",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      efficiency: "96%",
      description: "Embedding transformers and LLM generation",
      tasks: [
        { label: "Embedding Quality", progress: 97 },
        { label: "Vector Indexing", progress: 94 },
        { label: "LLM Synthesis", progress: 95 },
      ],
    },
    {
      name: "Hybrid Search System",
      icon: "🔍",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      efficiency: "93%",
      description: "Semantic + keyword search with adaptive routing",
      tasks: [
        { label: "Semantic Search", progress: 94 },
        { label: "Keyword Search (BM25)", progress: 91 },
        { label: "Query Routing", progress: 92 },
      ],
    },
    {
      name: "Security & Privacy",
      icon: "🔒",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      efficiency: "100%",
      description: "Self-hosted architecture with data anonymization",
      tasks: [
        { label: "Encryption", progress: 100 },
        { label: "Access Control", progress: 98 },
        { label: "Anonymization", progress: 99 },
      ],
    },
    {
      name: "Adaptive Query Routing",
      icon: "🤖",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      efficiency: "89%",
      description: "ML classifiers for intelligent query decomposition",
      tasks: [
        { label: "Query Classification", progress: 87 },
        { label: "Complexity Detection", progress: 91 },
        { label: "Route Optimization", progress: 89 },
      ],
    },
  ]

  return (
    <div className="p-8 lg:p-12 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold gradient-text flex items-center gap-3 mb-8 animate-fade-in-down">
          <BarChart3 className="text-blue-600 animate-float" size={32} />
          Advanced Analytics Dashboard
        </h2>
        <p className="text-slate-600 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Real-time insights and AI-powered document intelligence
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-2xl hover-lift transition-all duration-300 animate-stagger-${i + 1}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-xl shadow-lg hover-scale`}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              <p className="text-xs text-green-600 font-semibold mt-2">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-slate-900 mb-2 animate-fade-in-right">
            System Architecture & Aspects
          </h3>
          <p className="text-slate-600 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Advanced AI pipeline working on multiple interconnected systems
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systemAspects.map((aspect, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-lg hover-lift transition-all duration-300 animate-stagger-${(i % 6) + 1}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-float">{aspect.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 hover:text-blue-600 transition-colors">{aspect.name}</h4>
                      <p className="text-xs text-slate-600">{aspect.description}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${aspect.statusColor} animate-pulse-glow`}
                  >
                    {aspect.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">Overall Efficiency</span>
                    <span className="text-xl font-bold text-blue-600 animate-pulse-glow">{aspect.efficiency}</span>
                  </div>
                  <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 hover:shadow-lg"
                      style={{ width: aspect.efficiency }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {aspect.tasks.map((task, j) => (
                    <div
                      key={j}
                      className={`bg-white rounded-lg p-3 hover:shadow-md hover-lift transition-all duration-300 animate-stagger-${j + 1}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{task.label}</span>
                        <span className="text-xs font-bold text-slate-600">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-1000 ${
                            task.progress >= 95
                              ? "bg-green-500 shadow-glow-sm"
                              : task.progress >= 85
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis Chart */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-8 hover:shadow-lg hover-lift transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-900 mb-6 animate-fade-in-right">Sentiment Analysis Trends</h3>
          <div className="flex items-end justify-around h-48 gap-2">
            {[80, 60, 75, 85, 70].map((height, i) => (
              <div key={i} className={`flex flex-col items-center flex-1 animate-stagger-${i + 1}`}>
                <div className="w-full flex flex-col gap-1 hover:shadow-lg rounded transition-all duration-300">
                  <div
                    className="bg-green-500 rounded-t hover:bg-green-600 transition-colors duration-300 shadow-md"
                    style={{ height: `${height * 0.4}px` }}
                  />
                  <div
                    className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300 shadow-md"
                    style={{ height: `${height * 0.3}px` }}
                  />
                  <div
                    className="bg-red-500 rounded-b hover:bg-red-600 transition-colors duration-300 shadow-md"
                    style={{ height: `${height * 0.3}px` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">Jan {i + 1}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {[
              { color: "bg-green-500", label: "Positive" },
              { color: "bg-yellow-400", label: "Neutral" },
              { color: "bg-red-500", label: "Negative" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 hover:scale-110 transition-transform duration-300"
              >
                <div className={`w-3 h-3 ${item.color} rounded-full shadow-md`} />
                <span className="text-sm text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mb-8 hover:shadow-lg hover-lift transition-all duration-300">
          <div className="flex items-center justify-between mb-6 animate-fade-in-down">
            <h3 className="text-xl font-bold text-slate-900">Compliance Status</h3>
            <span className="text-3xl font-bold text-green-600 animate-pulse-glow">94%</span>
          </div>
          <div className="space-y-4">
            {[
              { label: "GDPR", status: "compliant", description: "All personal data properly anonymized" },
              { label: "CCPA", status: "compliant", description: "California privacy requirements met" },
              { label: "HIPAA", status: "warning", description: "Medical information detected - review required" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between bg-white p-4 rounded-xl hover:shadow-md hover-lift transition-all duration-300 animate-stagger-${i + 1}`}
              >
                <div>
                  <p className="font-semibold text-slate-900 hover:text-green-600 transition-colors">{item.label}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    item.status === "compliant"
                      ? "bg-green-100 text-green-700 shadow-glow-sm"
                      : "bg-yellow-100 text-yellow-700 animate-float"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Entity Frequency */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg hover-lift transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-900 mb-6 animate-fade-in-right">Entity Frequency</h3>
          <div className="space-y-4">
            {[
              { name: "Organizations", count: 156, icon: "1️⃣" },
              { name: "Financial Figures", count: 89, icon: "2️⃣" },
              { name: "Dates", count: 234, icon: "3️⃣" },
              { name: "People", count: 67, icon: "4️⃣" },
            ].map((entity, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 hover:shadow-md hover-lift transition-all duration-300 animate-stagger-${i + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl hover-scale">{entity.icon}</div>
                  <p className="font-semibold text-slate-900">{entity.name}</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 animate-pulse-glow">{entity.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
