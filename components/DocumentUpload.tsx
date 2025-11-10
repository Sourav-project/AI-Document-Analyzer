"use client"

import type React from "react"
import { useState } from "react"
import { Upload, File, CheckCircle, Zap, Search, MessageSquare } from "lucide-react"
import type { Document } from "@/types"

interface DocumentUploadProps {
  onUpload: (documents: Document[]) => void
}

export default function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Document[]>([])
  const [uploading, setUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files ? Array.from(e.currentTarget.files) : []
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    setUploading(true)
    const newDocuments: Document[] = files.map((file) => ({
      id: Date.now() + Math.random().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date(),
      status: "processing" as const,
      pages: Math.floor(Math.random() * 50) + 5,
      wordCount: Math.floor(Math.random() * 10000) + 1000,
    }))

    setUploadedFiles((prev) => [...prev, ...newDocuments])

    setTimeout(() => {
      setUploadedFiles((prev) =>
        prev.map((doc) => (newDocuments.find((d) => d.id === doc.id) ? { ...doc, status: "completed" as const } : doc)),
      )
      onUpload(newDocuments.map((doc) => ({ ...doc, status: "completed" as const })))
      setUploading(false)
    }, 2000)
  }

  return (
    <div className="p-8 lg:p-12 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text-animate mb-4">Upload Your Documents</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Upload PDF, DOCX, or TXT files to create your searchable knowledge base. Our AI will process and analyze
            your documents for intelligent querying.
          </p>
        </div>

        {/* Upload Area - improved drag-and-drop with gradient */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-500 animate-stagger-1 ${
            dragActive
              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl scale-105"
              : "border-slate-300 bg-white hover:border-blue-400 hover:shadow-lg"
          }`}
        >
          <input
            type="file"
            id="file-input"
            multiple
            onChange={handleChange}
            className="hidden"
            accept=".pdf,.docx,.txt"
            disabled={uploading}
          />

          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center hover-lift">
              <Upload className="text-blue-600 animate-float" size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Drag and drop your files here</h3>
              <p className="text-slate-600 mt-2">Auto-redirecting to Document Library...</p>
              <p className="text-slate-500 text-sm mt-2">or click to browse your files</p>
            </div>
            <label htmlFor="file-input">
              <button
                type="button"
                onClick={() => document.getElementById("file-input")?.click()}
                disabled={uploading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover-lift shadow-glow-md transition-all duration-300 disabled:opacity-50 text-lg"
              >
                <span className="flex items-center gap-2">
                  <Upload size={20} />
                  {uploading ? "Processing..." : "Choose Files"}
                </span>
              </button>
            </label>
            <p className="text-slate-500 text-xs">Supported formats: PDF, DOCX, TXT (Max 10MB per file)</p>
          </div>
        </div>

        {/* Features Grid - added colorful icons and improved layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: Zap,
              title: "Multimodal AI Processing",
              desc: "OCR, table extraction, entity recognition, and semantic embeddings with multilingual support.",
              color: "blue",
            },
            {
              icon: Search,
              title: "Hybrid Search Engine",
              desc: "Combines semantic vector search with keyword matching, query expansion, and intelligent re-ranking.",
              color: "green",
            },
            {
              icon: MessageSquare,
              title: "Advanced Analytics",
              desc: "Document summarization, entity extraction, multi-document comparison, and conversation history.",
              color: "purple",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            const colorMap = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              purple: "from-purple-500 to-purple-600",
            }
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-8 border border-slate-200 hover-lift shadow-lg transition-all duration-300 animate-stagger-${idx + 2}`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${colorMap[feature.color as keyof typeof colorMap]} rounded-xl flex items-center justify-center mb-4 shadow-lg hover-scale`}
                >
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Advanced Features */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 border border-purple-200 shadow-glow-md hover-lift transition-all duration-300 animate-stagger-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Advanced Features</h3>
          <p className="text-slate-600 mb-8">Enterprise-grade capabilities for professional document analysis</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🌐", label: "Multi-Language", desc: "50+ languages supported" },
              { icon: "🏷️", label: "Auto-Tagging", desc: "AI-powered categorization" },
              { icon: "📄", label: "Summarization", desc: "Intelligent document summaries" },
              { icon: "👁️", label: "OCR & Tables", desc: "Extract from images & tables" },
            ].map((feature, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-4 text-center hover-lift transition-all duration-300 animate-stagger-${i + 1}`}
              >
                <div className="text-3xl mb-2 animate-float">{feature.icon}</div>
                <p className="font-semibold text-slate-900 text-sm">{feature.label}</p>
                <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Files - improved progress display */}
        {uploadedFiles.length > 0 && (
          <div className="mt-16 animate-fade-in-up">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Upload Progress</h3>
            <div className="space-y-4">
              {uploadedFiles.map((doc, idx) => (
                <div
                  key={doc.id}
                  className={`flex items-center justify-between bg-white p-5 rounded-xl border border-slate-200 hover-lift shadow-md transition-all duration-300 animate-stagger-${(idx % 6) + 1}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center hover-scale">
                      <File className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">
                        {Math.round(doc.size / 1024)} KB • {doc.pages} pages
                      </p>
                    </div>
                  </div>
                  {doc.status === "completed" ? (
                    <div className="flex items-center gap-2 text-green-600 animate-scale-bounce">
                      <CheckCircle size={20} />
                      <span className="text-sm font-semibold">Processed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600 animate-float">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-semibold">Processing</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
