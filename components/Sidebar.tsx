"use client"
import { MessageCircle, Library, Search, Zap, BarChart3, Plug, Upload, Brain, ChevronRight } from "lucide-react"

interface SidebarProps {
  activeView: string
  setActiveView: (view: any) => void
  documentCount: number
  setIsMobileMenuOpen?: (open: boolean) => void
}

export default function Sidebar({ activeView, setActiveView, documentCount, setIsMobileMenuOpen }: SidebarProps) {
  const menuItems = [
    { id: "upload", label: "Upload Documents", icon: Upload },
    { id: "chat", label: "Ask Questions", icon: MessageCircle },
    { id: "documents", label: "Document Library", icon: Library },
    { id: "search", label: "Search Results", icon: Search },
    { id: "agents", label: "AI Agents", icon: Zap },
    { id: "dashboard", label: "Analytics", icon: BarChart3 },
    { id: "integrations", label: "Integrations", icon: Plug },
  ]

  const handleNavigation = (view: string) => {
    setActiveView(view)
    setIsMobileMenuOpen?.(false)
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Logo - with float animation */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3 ml-12 animate-fade-in-right">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-lift animate-float">
            <Brain className="text-white" size={26} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-lg">AI Analyzer</h2>
            <p className="text-xs text-slate-500">Document Intelligence</p>
          </div>
        </div>
      </div>

      {/* Menu Items - styled with better hover effects and active state */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group hover-lift animate-stagger-${idx + 1} ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon
                  size={19}
                  className={`transition-transform duration-300 ${isActive ? "animate-scale-bounce" : ""}`}
                />
                {item.label}
              </span>
              {isActive && <ChevronRight size={18} className="animate-float" />}
            </button>
          )
        })}
      </nav>

      {/* CTA Button - added AI-Powered Search button */}
      <div className="p-4 border-t border-slate-200 space-y-4">
        <button
          onClick={() => handleNavigation("chat")}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover-lift transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          <Zap size={18} className="animate-float" />
          AI-Powered Search
        </button>

        {/* Footer Stats - with glow effect */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 shadow-glow-sm hover-lift transition-all duration-300">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Quick Stats</p>
          <p className="text-3xl font-bold gradient-text mt-2">{documentCount}</p>
          <p className="text-xs text-slate-600 mt-1">Documents Processed</p>
        </div>
      </div>
    </div>
  )
}
