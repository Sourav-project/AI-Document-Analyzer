"use client"
import type { SearchResult } from "@/types"
import { Search, AlertCircle, ChevronDown, Download, Share2, Eye } from "lucide-react"
import { useState } from "react"

interface SearchResultsProps {
  results: SearchResult[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  const [selectedResult, setSelectedResult] = useState<string | null>(null)

  const getSearchTypeColor = (type: string) => {
    switch (type) {
      case "semantic":
        return "bg-purple-100 text-purple-700"
      case "keyword":
        return "bg-blue-100 text-blue-700"
      case "hybrid":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="p-8 lg:p-12 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in-down">
          <h2 className="text-3xl font-bold gradient-text flex items-center gap-3">
            <Search className="text-blue-600 animate-float" size={32} />
            Search Results
          </h2>
          <p className="text-slate-600 mt-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {results.length} results found
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 animate-fade-in-up hover-lift">
            <AlertCircle className="mx-auto text-slate-300 mb-4 animate-float" size={48} />
            <p className="text-slate-600">No search results yet. Try searching your documents.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, idx) => (
              <div key={result.id} className={`space-y-2 animate-stagger-${(idx % 6) + 1}`}>
                {/* Main result card */}
                <div
                  onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
                  className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover-lift transition-all duration-300 cursor-pointer active:scale-98"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-bold text-slate-900 flex-1 hover:text-blue-600 transition-colors">
                      {result.documentName}
                    </h3>
                    <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full flex-shrink-0 hover-scale">
                      <span className="text-sm font-semibold text-green-700">
                        {Math.round(result.relevanceScore * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm mb-3">{result.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Page {result.pageNumber} • {result.searchType} search
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover-scale ${getSearchTypeColor(result.searchType)}`}
                      >
                        {result.searchType}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 ${
                          selectedResult === result.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {selectedResult === result.id && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 space-y-4 animate-fade-in-up hover-lift">
                    {/* Document Preview */}
                    <div className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md hover-lift transition-all duration-300">
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 animate-fade-in-right">
                        <Eye size={16} className="text-blue-600 animate-float" />
                        Document Preview
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        This document contains comprehensive information about service delivery terms, including
                        detailed provisions for payment processing, liability limitations, and confidentiality
                        agreements. The content spans across multiple sections with legal implications.
                      </p>
                    </div>

                    {/* Key Metadata */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "File Size", value: "42.59 KB" },
                        { label: "Upload Date", value: "Nov 10, 2025" },
                        { label: "Total Pages", value: "23 pages" },
                        { label: "Language", value: "English" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md hover-lift transition-all duration-300 animate-stagger-${i + 1}`}
                        >
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{item.label}</p>
                          <p className="text-lg font-bold text-slate-900">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Extracted Info */}
                    <div className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md transition-all duration-300">
                      <h4 className="font-semibold text-slate-900 mb-3 animate-fade-in-left">Extracted Information</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-slate-700 hover:text-slate-900 transition-colors">
                          <span className="font-medium">Entities Found:</span> 12 people, 8 organizations, 15 dates
                        </p>
                        <p className="text-slate-700 hover:text-slate-900 transition-colors">
                          <span className="font-medium">Key Phrases:</span> payment terms, liability, confidentiality,
                          scope of work
                        </p>
                        <p className="text-slate-700 hover:text-slate-900 transition-colors">
                          <span className="font-medium">Sentiment:</span> Neutral (Legal document)
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover-lift transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
                        <Eye size={16} />
                        View Full Document
                      </button>
                      <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:shadow-md hover-scale transition-all duration-300 flex items-center justify-center gap-2">
                        <Download size={16} />
                      </button>
                      <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:shadow-md hover-scale transition-all duration-300 flex items-center justify-center gap-2">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
