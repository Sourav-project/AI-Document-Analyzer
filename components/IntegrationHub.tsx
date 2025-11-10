"use client"

import { useState } from "react"
import { Plug, Check, Eye, EyeOff } from "lucide-react"
import type { Integration } from "@/types"

interface ConnectedIntegration extends Integration {
  credentials?: {
    apiKey?: string
    email?: string
    password?: string
    token?: string
    webhookUrl?: string
  }
  connectedAt?: string
  activeConnections?: number
}

export default function IntegrationHub() {
  const [integrations, setIntegrations] = useState<ConnectedIntegration[]>([
    {
      id: "1",
      name: "Google Drive",
      type: "storage",
      status: "connected",
      connectedAt: "Nov 10, 2025",
      activeConnections: 3,
    },
    {
      id: "2",
      name: "Salesforce CRM",
      type: "crm",
      status: "connected",
      connectedAt: "Nov 8, 2025",
      activeConnections: 2,
    },
    {
      id: "3",
      name: "Zapier",
      type: "api",
      status: "disconnected",
    },
    {
      id: "4",
      name: "Slack",
      type: "api",
      status: "disconnected",
    },
    {
      id: "5",
      name: "Microsoft 365",
      type: "storage",
      status: "disconnected",
    },
    {
      id: "6",
      name: "QuickBooks",
      type: "crm",
      status: "disconnected",
    },
  ])

  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  const connectionForms: Record<string, { fields: string[]; placeholder: Record<string, string> }> = {
    "1": {
      fields: ["email", "password"],
      placeholder: {
        email: "Your Google Email",
        password: "Google App Password",
      },
    },
    "2": {
      fields: ["email", "apiKey", "instanceUrl"],
      placeholder: {
        email: "Salesforce Email",
        apiKey: "API Key / Consumer Key",
        instanceUrl: "Your Salesforce Instance URL",
      },
    },
    "3": {
      fields: ["apiKey", "webhookUrl"],
      placeholder: {
        apiKey: "Zapier API Key",
        webhookUrl: "Webhook URL from Zapier",
      },
    },
    "4": {
      fields: ["botToken", "channelId"],
      placeholder: {
        botToken: "Slack Bot Token",
        channelId: "Channel ID or Webhook URL",
      },
    },
    "5": {
      fields: ["email", "password", "tenantId"],
      placeholder: {
        email: "Microsoft 365 Email",
        password: "Microsoft Password",
        tenantId: "Tenant ID (Optional)",
      },
    },
    "6": {
      fields: ["realmId", "apiKey", "email"],
      placeholder: {
        realmId: "QuickBooks Realm ID",
        apiKey: "Consumer Key",
        email: "QuickBooks Email",
      },
    },
  }

  const integrationDetails: Record<
    string,
    {
      desc: string
      features: string[]
      icon: string
      color: string
    }
  > = {
    "1": {
      desc: "Sync documents from Google Drive automatically",
      features: ["Auto-sync", "Real-time processing", "Folder monitoring"],
      icon: "🔵",
      color: "from-blue-500 to-blue-600",
    },
    "2": {
      desc: "Extract data and sync with Salesforce records",
      features: ["Lead extraction", "Contact sync", "Opportunity tracking"],
      icon: "☁️",
      color: "from-blue-600 to-blue-700",
    },
    "3": {
      desc: "Connect to 5000+ apps with automated workflows",
      features: ["Custom triggers", "Multi-step workflows", "Error handling"],
      icon: "⚡",
      color: "from-orange-500 to-orange-600",
    },
    "4": {
      desc: "Send notifications and summaries to Slack channels",
      features: ["Channel notifications", "Direct messages", "Custom alerts"],
      icon: "💬",
      color: "from-purple-500 to-purple-600",
    },
    "5": {
      desc: "Process documents from OneDrive and SharePoint",
      features: ["OneDrive sync", "SharePoint integration", "Teams notifications"],
      icon: "📁",
      color: "from-blue-600 to-purple-600",
    },
    "6": {
      desc: "Automatically process invoices and financial documents",
      features: ["Invoice processing", "Expense tracking", "Financial reporting"],
      icon: "💚",
      color: "from-green-500 to-green-600",
    },
  }

  const handleConnect = (integrationId: string) => {
    const forms = connectionForms[integrationId]
    if (!forms) return

    const hasAllFields = forms.fields.every((field) => formData[`${integrationId}-${field}`])

    if (!hasAllFields) {
      alert("Please fill in all required fields")
      return
    }

    setIntegrations(
      integrations.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              status: "connected",
              connectedAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              activeConnections: 1,
            }
          : int,
      ),
    )

    setSelectedIntegration(null)
    setFormData({})
    alert(`Successfully connected to ${integrations.find((i) => i.id === integrationId)?.name}!`)
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              status: "disconnected",
              connectedAt: undefined,
              activeConnections: 0,
            }
          : int,
      ),
    )
    setSelectedIntegration(null)
    setFormData({})
  }

  return (
    <div className="p-8 lg:p-12 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Plug className="text-blue-600" size={32} />
            Integration Hub
          </h2>
          <p className="text-slate-600 mt-2">Connect your favorite tools and automate document workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => {
            const details = integrationDetails[integration.id as keyof typeof integrationDetails] || {}
            const isSelected = selectedIntegration === integration.id

            return (
              <div
                key={integration.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all"
              >
                {/* Top colored bar */}
                <div className={`h-1 bg-gradient-to-r ${details.color || "from-blue-500 to-blue-600"}`} />

                <div className="p-6">
                  {/* Header with icon and status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{details.icon || "🔌"}</div>
                    {integration.status === "connected" && (
                      <div className="flex flex-col items-end gap-1">
                        <Check className="text-green-600" size={24} />
                        <span className="text-xs text-green-600 font-semibold">Connected</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{integration.name}</h3>
                  <p className="text-slate-600 text-sm mt-2 mb-4">
                    {details.desc || `Integration with ${integration.name}`}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {(details.features || []).map((feature: string, j: number) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check size={14} className="text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Connection info if connected */}
                  {integration.status === "connected" && integration.connectedAt && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4 text-sm">
                      <p className="text-green-800">
                        <span className="font-semibold">Connected since:</span> {integration.connectedAt}
                      </p>
                      {integration.activeConnections && (
                        <p className="text-green-700">
                          <span className="font-semibold">Active connections:</span> {integration.activeConnections}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Connection form */}
                  {isSelected && integration.status === "disconnected" && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-3">
                      {connectionForms[integration.id as keyof typeof connectionForms]?.fields.map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          {field === "password" || field === "apiKey" || field === "botToken" ? (
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder={
                                  connectionForms[integration.id as keyof typeof connectionForms]?.placeholder[field] ||
                                  field
                                }
                                value={formData[`${integration.id}-${field}`] || ""}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    [`${integration.id}-${field}`]: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-slate-600 hover:text-slate-900"
                              >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              placeholder={
                                connectionForms[integration.id as keyof typeof connectionForms]?.placeholder[field] ||
                                field
                              }
                              value={formData[`${integration.id}-${field}`] || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [`${integration.id}-${field}`]: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="space-y-2">
                    {integration.status === "disconnected" ? (
                      <>
                        <button
                          onClick={() => setSelectedIntegration(isSelected ? null : integration.id)}
                          className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 ${
                            isSelected
                              ? `bg-slate-200 text-slate-900`
                              : `bg-gradient-to-r ${details.color || "from-blue-500 to-blue-600"} text-white hover:shadow-lg`
                          }`}
                        >
                          {isSelected ? "Cancel" : "Connect"}
                        </button>
                        {isSelected && (
                          <button
                            onClick={() => handleConnect(integration.id)}
                            className={`w-full font-semibold py-3 rounded-xl bg-gradient-to-r ${details.color || "from-blue-500 to-blue-600"} text-white hover:shadow-lg transition-all`}
                          >
                            Authenticate & Connect
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => handleDisconnect(integration.id)}
                        className="w-full font-semibold py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
                      >
                        Disconnect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
