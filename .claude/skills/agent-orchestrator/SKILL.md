---
name: agent-orchestrator
description: Emergent/Replit/Lovable tarzı paralel ajan yürütme. Birden çok ajanı aynı anda koordine eder, task splitting + merge yapar.
---

# Agent Orchestrator — Paralel Ajan Koordinasyonu

## Misyon
Karmaşık işleri alt görevlere bölüp birden çok ajanı paralel çalıştırarak toplam üretim süresini düşürmek.

## Mimari
```
Kullanıcı Komutu
  ↓
Orchestrator (Planlama) → Task Graph oluştur
  ├── Agent 1: Backend API (auth + DB)
  ├── Agent 2: Frontend UI (components + pages)
  ├── Agent 3: Integration (Stripe + email)
  └── Agent 4: Testing (API test + UI test)
  ↓
Merge → Conflict Resolution → Deploy
```

## Task Graph Yapısı

```typescript
interface TaskGraph {
  id: string
  description: string
  dependencies: string[]  // Bu task'ten önce tamamlanması gereken task ID'leri
  agent: 'frontend' | 'backend' | 'integration' | 'design' | 'test'
  files: string[]         // Task'in dokunacağı dosyalar
  context: string         // Task için gereken bağlam
}

function planTaskGraph(userPrompt: string): TaskGraph[] {
  // Prompt'i analiz et, bağımlılıkları çıkar
  // Örnek:
  return [
    { id: 'db-schema', description: 'Create DB schema', dependencies: [], agent: 'backend', files: ['schema.prisma'] },
    { id: 'auth-api', description: 'Auth endpoints', dependencies: ['db-schema'], agent: 'backend', files: ['api/auth.ts'] },
    { id: 'ui-login', description: 'Login page', dependencies: ['auth-api'], agent: 'frontend', files: ['app/login/page.tsx'] },
    { id: 'ui-dashboard', description: 'Dashboard', dependencies: ['auth-api', 'db-schema'], agent: 'frontend', files: ['app/dashboard/page.tsx'] },
  ]
}
```

## Çakışma Çözümü (Conflict Resolution)

```typescript
function resolveConflicts(changes: Map<string, AgentChange[]>): ResolvedFile[] {
  for (const [file, agentChanges] of changes) {
    if (agentChanges.length === 1) {
      // Tek ajan dokunmuş → direkt kabul
      continue
    }
    
    // Aynı dosyaya iki ajan dokunmuş
    // 1. Satır bazında çakışma tespiti
    const conflicts = findLineConflicts(agentChanges)
    
    if (conflicts.length === 0) {
      // Farklı satırlar → merge et
      mergeNonConflicting(agentChanges)
    } else {
      // Aynı satırlara müdahale → LLM ile karar
      resolveWithLLM(conflicts, agentChanges.map(c => c.context))
    }
  }
}
```

## PowerShell Orchestrator

```powershell
# scripts/orchestrate.ps1
param(
  [string]$Task,
  [string]$ProjectDir
)

function Send-ToAgent {
  param($AgentType, $TaskDesc, $Context)
  
  switch ($AgentType) {
    'frontend' {
      # web-design-master skill'ini kullan
      return agent-browser evaluate --prompt @"
You are a frontend agent. Task: $TaskDesc
Context: $Context
Generate the React/Next.js component code.
"@
    }
    'backend' {
      return agent-browser evaluate --prompt @"
You are a backend agent. Task: $TaskDesc
Context: $Context
Generate the API route and schema.
"@
    }
    'integration' {
      return agent-browser evaluate --prompt @"
You are an integration agent. Task: $TaskDesc
Context: $Context
Generate the integration code.
"@
    }
    'test' {
      # systematic-debugging skill'ini kullan
      return agent-browser evaluate --prompt @"
You are a testing agent. Task: $TaskDesc
Generate tests for the code.
"@
    }
  }
}

# Paralel yürütme
$job1 = Start-Job { Send-ToAgent -AgentType 'frontend' -TaskDesc $using:Task }
$job2 = Start-Job { Send-ToAgent -AgentType 'backend' -TaskDesc $using:Task }

$result1 = Receive-Job -Job $job1 -Wait
$result2 = Receive-Job -Job $job2 -Wait

# Merge
Merge-AgentOutputs $result1, $result2
```

## Kalite Standartları
- Aynı dosyaya 2+ ajan yazıyorsa → conflict resolution gerekir
- Bağımlılık grafiği cyclesız olmalı (DAG)
- Her task izole environment'ta çalışır (geçici dizin)
- Merge sonrası `npm run build` ile doğrulama

## Referanslar
- Emergent: 5 ajan (Architect, Designer, Developer, Integration, PM) paralel koordinasyon
- Replit Agent 4: Parallel Agents + task-based workflow + Kanban board
- Lovable Subagents: May 2026'dan beri paralel build
