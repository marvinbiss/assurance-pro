import { z } from 'zod'

// Cursor-based pagination schema
export const cursorPaginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
})

export type CursorPagination = z.infer<typeof cursorPaginationSchema>

type CursorData = { created_at: string; id: string }

export function encodeCursor(item: CursorData): string {
  return Buffer.from(JSON.stringify({
    c: item.created_at,
    i: item.id
  })).toString('base64url')
}

export function decodeCursor(cursor: string): CursorData {
  const parsed = JSON.parse(Buffer.from(cursor, 'base64url').toString())
  return { created_at: parsed.c, id: parsed.i }
}

export function paginateResult<T extends CursorData>(
  data: T[] | null,
  limit: number
): {
  items: T[]
  nextCursor: string | null
  hasMore: boolean
} {
  const items = data?.slice(0, limit) ?? []
  const hasMore = (data?.length ?? 0) > limit
  const lastItem = items[items.length - 1]

  return {
    items,
    nextCursor: hasMore && lastItem ? encodeCursor(lastItem) : null,
    hasMore,
  }
}
