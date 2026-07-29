---
name: supabase-agent
description: Lovable tarzı Supabase entegrasyonu — PostgreSQL schema, RLS politikaları, Auth, Storage ve Edge Functions otomatik konfigürasyon.
---

# Supabase Agent — Backend-as-a-Service Entegrasyonu

## Misyon
Supabase'i prompt'tan oluşturma: DB schema, Row Level Security, Authentication, Storage bucket'ları ve Edge Functions'ları otomatik kurulum.

## Yetenekler

| Özellik | Açıklama |
|---------|----------|
| Schema Generation | Prompt'tan PostgreSQL tabloları + ilişkileri + index'leri oluşturma |
| RLS Policies | Row Level Security politikalarını otomatik yazma |
| Auth | Email/Google/GitHub OAuth yapılandırması |
| Storage | File bucket + public/private erişim kuralları |
| Edge Functions | Serverless TypeScript fonksiyonları |
| Real-time | Subscription kanalları + broadcast |

## Schema Generation

```typescript
interface SchemaDefinition {
  tables: TableDef[]
  policies: PolicyDef[]
  seedData?: Record<string, any[]>
}

interface TableDef {
  name: string
  columns: { name: string; type: string; primary?: boolean; references?: string; default?: string }[]
  indexes?: { columns: string[]; unique?: boolean }[]
}

// Prompt'tan schema çıkarımı
function generateSchema(prompt: string): SchemaDefinition {
  // "Bir todo uygulaması: kullanıcılar todo ekleyebilir, silebilir, tamamlayabilir"
  // → users, todos, categories tabloları
  return {
    tables: [
      { name: 'users', columns: [{ name: 'id', type: 'uuid', primary: true }, { name: 'email', type: 'text' }] },
      { name: 'todos', columns: [
        { name: 'id', type: 'bigint', primary: true },
        { name: 'user_id', type: 'uuid', references: 'users.id' },
        { name: 'title', type: 'text' },
        { name: 'completed', type: 'boolean', default: 'false' },
        { name: 'created_at', type: 'timestamptz', default: 'now()' },
      ]},
    ],
    policies: [
      { table: 'todos', action: 'SELECT', using: 'user_id = auth.uid()' },
      { table: 'todos', action: 'INSERT', check: 'user_id = auth.uid()' },
    ],
    seedData: {
      todos: [{ user_id: '{{user_id}}', title: 'Welcome! This is your first todo' }],
    }
  }
}
```

## Edge Functions

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { type, data } = await req.json()

  if (type === 'checkout.session.completed') {
    await supabase.from('orders').insert({
      user_id: data.object.client_reference_id,
      amount: data.object.amount_total,
      status: 'completed',
    })
  }

  return new Response('ok', { status: 200 })
})
```

## PowerShell Supabase CLI Entegrasyonu

```powershell
# scripts/supabase-setup.ps1
param(
  [string]$ProjectDir,
  [string]$Prompt,
  [string]$SupabaseProjectRef
)

# 1. Schema oluştur (LLM ile)
$schema = agent-browser evaluate --prompt @"
Generate a Supabase schema for: $Prompt
Return as JSON with tables, columns, policies, and relations.
"@

# 2. Migration dosyasına yaz
$migrationFile = "$ProjectDir\supabase\migrations\$(Get-Date -Format 'yyyyMMddHHmmss')_auto.sql"
$schema.tables | ForEach-Object {
  $sql = Generate-CreateTableSQL $_ | Out-File $migrationFile -Append
}

# 3. RLS politikaları
$schema.policies | ForEach-Object {
  Generate-RLSPolicy $_ | Out-File $migrationFile -Append
}

# 4. Supabase'e push
supabase link --project-ref $SupabaseProjectRef
supabase db push

# 5. TypeScript tipleri oluştur
supabase gen types typescript --local > "$ProjectDir\lib\database.types.ts"
```

## RLS Policy Generator

```typescript
function generateRLSPolicy(policy: PolicyDef): string {
  const templates = {
    SELECT: `
CREATE POLICY "Users can view own ${policy.table}" 
ON ${policy.table} FOR SELECT 
USING (${policy.using || 'true'});`,
    INSERT: `
CREATE POLICY "Users can insert own ${policy.table}" 
ON ${policy.table} FOR INSERT 
WITH CHECK (${policy.check || 'true'});`,
    UPDATE: `
CREATE POLICY "Users can update own ${policy.table}" 
ON ${policy.table} FOR UPDATE 
USING (${policy.using || 'true'});`,
    DELETE: `
CREATE POLICY "Users can delete own ${policy.table}" 
ON ${policy.table} FOR DELETE 
USING (${policy.using || 'true'});`,
  }
  return templates[policy.action] || ''
}
```

## Kalite Standartları
- Her tabloda `created_at` timestamp + `user_id` foreign key
- RLS mutlaka açık (anonim erişim YASAK)
- Index'ler sorgu pattern'ine göre (en çok sorgulanan kolon)
- Edge Functions'da CORS header'ları
- Seed data ile test ortamı kurulumu

## Referanslar
- Lovable: Supabase Integration 2.0 — MCP ile bidirectional backend access
- Lovable Cloud: built-in Postgres + Auth + Storage + Edge Functions
- Supabase MCP: AI agent'in schema/auth/logs'a direkt erişimi
