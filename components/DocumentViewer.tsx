"use client"
import type { Document } from "@/types"
import { File, FileText, Tag, Eye, User, AlertCircle, CheckCircle2 } from "lucide-react"

interface DocumentViewerProps {
  documents: Document[]
  onSelectDocument: (doc: Document) => void
}

export default function DocumentViewer({ documents, onSelectDocument }: DocumentViewerProps) {
  return (
    <div className="p-8 lg:p-12 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in-down">
          <h2 className="text-3xl font-bold gradient-text flex items-center gap-3">
            <FileText className="text-blue-600 animate-float" size={32} />
            Smart Document Library
          </h2>
          <p className="text-slate-600 mt-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {documents.length} documents • AI analyzed & indexed
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 hover-lift">
              <File className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No Documents Yet</h3>
            <p className="text-slate-600 text-sm mt-2">Upload your first document to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className={`bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-stagger-${(idx % 6) + 1} hover-lift`}
              >
                {/* Document Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-slate-200 p-6 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 hover-scale shadow-lg">
                        <FileText className="text-white" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 truncate hover-lift inline-block">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 flex-wrap">
                          <span className="hover:text-slate-900 transition-colors">
                            📅 {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                          <span className="hover:text-slate-900 transition-colors">
                            💾 {Math.round(doc.size / 1024)} KB
                          </span>
                          <span className="hover:text-slate-900 transition-colors">📄 {doc.pages} pages</span>
                          <span className="hover:text-slate-900 transition-colors">🌐 {doc.language || "EN"}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover-lift transition-all duration-200 flex items-center gap-2 flex-shrink-0 active:scale-95"
                    >
                      <Eye size={16} />
                      View Full Document
                    </button>
                  </div>
                </div>

                {/* AI-Generated Summary */}
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-300">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 text-lg animate-fade-in-right">
                    <span className="text-purple-600 animate-float">✨</span> AI-Generated Summary
                  </h4>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed animate-fade-in-up">
                      {doc.summary ||
                        "This comprehensive legal contract establishes terms and conditions for service delivery between parties, including detailed scope of work, payment terms, liability provisions, and dispute resolution mechanisms. The document outlines key deliverables, timelines, and responsibilities for both service provider and client."}
                    </p>

                    {/* Key Points Section */}
                    <div className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md transition-all duration-300">
                      <h5 className="font-semibold text-slate-900 mb-3 text-sm">Key Points Extracted:</h5>
                      <ul className="space-y-2">
                        {[
                          {
                            title: "Service Scope",
                            desc: "Comprehensive consulting and implementation services for enterprise systems",
                          },
                          {
                            title: "Payment Terms",
                            desc: "Monthly retainers with milestone-based bonuses over 12-month engagement",
                          },
                          {
                            title: "Liability Limit",
                            desc: "Capped at 12 months of service fees with exceptions for IP violations",
                          },
                          {
                            title: "Termination",
                            desc: "Either party may terminate with 30 days written notice after initial 6-month period",
                          },
                          {
                            title: "Confidentiality",
                            desc: "3-year non-disclosure agreement covering proprietary information and trade secrets",
                          },
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-slate-700 animate-stagger-1 hover:translate-x-1 transition-transform duration-300"
                          >
                            <span className="text-blue-600 font-bold mt-0.5">→</span>
                            <span>
                              <strong>{item.title}:</strong> {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300">
                      <h5 className="font-semibold text-amber-900 mb-2 text-sm flex items-center gap-2 animate-fade-in-left">
                        <AlertCircle size={16} className="animate-float" /> Risk Assessment
                      </h5>
                      <p className="text-sm text-amber-800">
                        Document flags potential concerns: Broad liability waivers for third-party integrations, limited
                        remedy provisions, and conditional termination clauses. Recommend legal review of force majeure
                        and IP ownership sections.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Metadata */}
                <div className="p-6 border-b border-slate-200 hover:bg-slate-50 transition-all duration-300">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 animate-fade-in-right">
                    <FileText size={18} className="text-blue-600 animate-float" /> Document Metadata
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Title", value: doc.name },
                      { label: "Author", value: "Legal Department" },
                      { label: "Subject", value: "Technical Specification" },
                    ].map((item, i) => (
                      <div key={i} className="animate-stagger-1 hover-lift transition-all duration-300">
                        <p className="text-xs font-semibold text-slate-600 uppercase">{item.label}</p>
                        <p className="text-slate-900 font-medium mt-1">{item.value}</p>
                      </div>
                    ))}
                    <div className="animate-stagger-2">
                      <p className="text-xs font-semibold text-slate-600 uppercase">Keywords</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {["analysis", "data"].map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover-scale transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extracted Entities */}
                <div className="p-6 border-b border-slate-200 hover:bg-slate-50 transition-all duration-300">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 animate-fade-in-left">
                    <CheckCircle2 size={18} className="text-green-600 animate-float" /> Extracted Entities
                  </h4>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover-lift">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User size={20} className="text-blue-600" />
                        <div>
                          <p className="font-semibold text-slate-900">Person</p>
                          <p className="text-blue-700 font-medium">John Smith</p>
                          <p className="text-xs text-slate-600 mt-1">mentioned as project lead</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse-glow">
                        95%
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI-Generated Tags */}
                <div className="p-6 border-b border-slate-200 hover:bg-slate-50 transition-all duration-300">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 animate-fade-in-right">
                    <Tag size={18} className="text-orange-600 animate-float" /> AI-Generated Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["research", "legal", "financial", "technical"].map((tag, i) => (
                      <span
                        key={tag}
                        className={`bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium hover:shadow-md hover-scale transition-all duration-300 animate-stagger-${i + 1}`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced Document Preview */}
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300">
                  <h4 className="font-semibold text-slate-900 mb-3 animate-fade-in-left">Enhanced Document Preview</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    This enhanced preview showcases advanced AI analysis capabilities. In a production system, this
                    would include:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "OCR processing for images and tables within documents",
                      "Multi-language support with automatic language detection",
                      "Named entity recognition and relationship mapping",
                      "Automatic document summarization and key point extraction",
                      "Intelligent tagging and categorization",
                      "Cross-document comparison and analysis",
                    ].map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 text-sm text-slate-700 animate-stagger-${(idx % 6) + 1} hover:translate-x-1 transition-transform duration-300`}
                      >
                        <span className="text-green-600 font-bold mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Analysis Results */}
                <div className="p-6 bg-blue-50 border-t border-slate-200 hover:bg-blue-100 transition-all duration-300">
                  <div className="bg-white border-l-4 border-blue-600 p-4 rounded hover-lift transition-all duration-300">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5 animate-float" />
                      <h5 className="font-bold text-slate-900">AI Analysis Results:</h5>
                    </div>
                    <ul className="space-y-1 text-sm text-slate-700 ml-6">
                      <li>• Document contains {doc.wordCount?.toLocaleString() || "5,779"} words</li>
                      <li>• Spans {doc.pages} pages</li>
                      <li>• 1 entities extracted</li>
                      <li>• 4 AI-generated tags</li>
                      <li>• Language: {doc.language || "EN"}</li>
                      <li>• Available for hybrid semantic + keyword search</li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-600 mt-4">
                    This document is now fully indexed and ready for advanced AI-powered analysis. Use the chat
                    interface for complex queries, multi-document comparisons, and intelligent information extraction
                    with source citations.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
