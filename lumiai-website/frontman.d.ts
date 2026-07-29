declare module '@frontman-ai/nextjs' {
  import type { NextResponse } from 'next/server'
  export function createMiddleware(opts?: Record<string, unknown>): (req: Request) => Promise<NextResponse | undefined>
}

declare module '@frontman-ai/nextjs/Instrumentation' {
  export function setup(): [any, any]
}
