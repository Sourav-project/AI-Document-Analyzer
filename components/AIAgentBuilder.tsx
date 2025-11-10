"use client"

import { useState } from "react"
import { Plus, Play, Pause, Trash2, Settings, Zap, X } from "lucide-react"
import type { AIAgent } from "@/types"

export default function AIAgentBuilder() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "1",
      name: "Document Summarizer",
      description: "Automatically summarizes documents and extracts key points",
      isActive: true,
      successRate: 94,
    },
    {
      id: "2",
      name: "Entity Extractor",
      description: "Identifies and tags entities like people, organizations, and dates",
      isActive: true,
      successRate: 91,
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAgent, setNewAgent] = useState({ name: "", description: "" })

  const handleCreateAgent = () => {
    if (!newAgent.name.trim()) {
      alert("Please enter an agent name")
      return
    }

    const agent: AIAgent = {
      id: Date.now().toString(),
      name: newAgent.name,
      description: newAgent.description || "Custom AI agent for document processing",
      isActive: true,
      successRate: Math.floor(Math.random() * 10) + 85,
    }

    setAgents([...agents, agent])
    setNewAgent({ name: "", description: "" })
    setShowCreateForm(false)
  }

  const toggleAgent = (id: string) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, isActive: !agent.isActive } : agent)))
  }

  const deleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id))
  }

  return (
    <div className="p-8 lg:p-12 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Zap className="text-blue-600" size={32} />
              AI Agent Builder
            </h2>
            <p className="text-slate-600 mt-2">Create and manage automated document processing workflows</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Create Agent
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Create New AI Agent</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Agent Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="e.g., Invoice Parser, Contract Analyzer, Data Extractor"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="Describe what this agent will do... (e.g., Extract invoice data and categorize expenses)"
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateAgent}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Create Agent
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-900">{agent.name}</h3>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agent.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {agent.isActive ? "Active" : "Inactive"}
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4">{agent.description}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">Success Rate</span>
                  <span className="text-sm font-bold text-slate-900">{agent.successRate}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${agent.successRate}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAgent(agent.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    agent.isActive
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {agent.isActive ? <Pause size={16} /> : <Play size={16} />}
                  {agent.isActive ? "Pause" : "Resume"}
                </button>
                <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  <Settings size={16} />
                </button>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
