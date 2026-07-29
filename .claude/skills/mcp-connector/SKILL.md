---
name: mcp-connector
description: Model Context Protocol (MCP) sunucuları yönetimi. Canva/Emergent/Lovable tarzı harici araç entegrasyonu (Figma, Notion, GitHub, Supabase, Stripe).
---

# MCP Connector — Model Context Protocol Entegrasyonu

## Misyon
Harici servisleri (Figma, GitHub, Supabase, Stripe, Notion) MCP protokolü ile AI agent'ına bağlayarak context içinde kullanılabilir hale getirmek.

## MCP Nedir?
MCP (Model Context Protocol), AI agent'ların harici araçlarla iletişim kurmasını sağlayan açık protokol. Bir MCP server, tool'larını ve kaynaklarını expose eder; AI agent'ı bunları çağırabilir.

## Mimarî
```
AI Agent (Claude/GPT)
  ↓ MCP Client
  ├── MCP Server: Supabase (schema, data, auth)
  ├── MCP Server: GitHub (repos, PRs, issues)
  ├── MCP Server: Figma (design tokens, components)
  ├── MCP Server: Stripe (products, customers, payments)
  └── MCP Server: Notion (pages, databases, search)
```

## MCP Server Şablonu (TypeScript)

```typescript
// servers/supabase-mcp.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const server = new Server(
  { name: 'supabase-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

// Tool tanımları
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'query_database',
      description: 'Supabase veritabanında SQL sorgusu çalıştırır',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'SQL sorgusu' },
        },
        required: ['query'],
      },
    },
    {
      name: 'get_schema',
      description: 'Tüm tablo yapısını getirir',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'create_migration',
      description: 'Yeni migration oluşturur',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          sql: { type: 'string' },
        },
        required: ['name', 'sql'],
      },
    },
  ],
}))

// Tool çalıştırma
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'query_database': {
      const result = await supabase.rpc('execute_sql', { query_text: args?.query })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    }
    case 'get_schema': {
      const { data } = await supabase.rpc('get_schema')
      return { content: [{ type: 'text', text: JSON.stringify(data) }] }
    }
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
```

## Hazır MCP Sunucuları

### Supabase MCP
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_SERVICE_KEY": "${SUPABASE_SERVICE_KEY}"
      }
    }
  }
}
```

### GitHub MCP
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

### Figma MCP
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-figma"],
      "env": { "FIGMA_ACCESS_TOKEN": "${FIGMA_TOKEN}" }
    }
  }
}
```

### Stripe MCP
```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["@stripe/mcp-server"],
      "env": { "STRIPE_SECRET_KEY": "${STRIPE_KEY}" }
    }
  }
}
```

## Auto-Discovery Script

```powershell
# scripts/mcp-discover.ps1
param(
  [string]$ConfigPath = "./.opencode/mcp.json"
)

# Mevcut MCP server'ları tara
$mcpServers = @{}

# npm'de yüklü MCP server'ları bul
$npmMcp = npm list -g --depth=0 2>$null | Select-String "@modelcontextprotocol/server-|@supabase/mcp|@stripe/mcp"

# Proje bazlı MCP config'ini oku
if (Test-Path $ConfigPath) {
  $config = Get-Content $ConfigPath | ConvertFrom-Json
  $mcpServers = $config.mcpServers
}

Write-Output "Active MCP Servers:"
$mcpServers | Format-Table Name, Command
```

## useMCPServer Hook (React)

```tsx
// Agent'in MCP araçlarını kullanması için hook
function useMCPServer(serverName: string) {
  const [tools, setTools] = useState<MCPTool[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const connect = async () => {
      const response = await fetch('/api/mcp/list-tools', {
        method: 'POST',
        body: JSON.stringify({ server: serverName }),
      })
      const { tools } = await response.json()
      setTools(tools)
      setConnected(true)
    }
    connect()
  }, [serverName])

  const callTool = async (toolName: string, args: any) => {
    const response = await fetch('/api/mcp/call-tool', {
      method: 'POST',
      body: JSON.stringify({ server: serverName, tool: toolName, args }),
    })
    return response.json()
  }

  return { tools, connected, callTool }
}
```

## Kalite Standartları
- Her MCP server için tool listesi + input schema belirtilmiş olmalı
- API key'ler asla koda gömülmez (env variable)
- Tool çağrıları timeout: 30 saniye
- Hata durumunda fallback mesajı dön
- MCP server'ları `.opencode/mcp.json` altında topla

## Referanslar
- Canva AI 2.0: official Dev MCP Server (10+ tool, Claude Code/Cursor entegrasyonu)
- Emergent: Playbooks (pre-tested integration configs) + MCP for custom APIs
- Lovable: Chat connectors (MCP server'ları build session'ına bağlama)
- Anthropic: MCP specification (open standard)
