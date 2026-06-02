import { randomUUID } from 'crypto'

export type Entity = {
  id: string
  createdAt: string
  updatedAt: string
}

export type CreateInput<T extends Entity> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export class BaseRepository<T extends Entity> {
  protected records = new Map<string, T>()

  findAll() {
    return Array.from(this.records.values())
  }

  findById(id: string) {
    return this.records.get(id) ?? null
  }

  create(input: CreateInput<T>) {
    const now = new Date().toISOString()
    const record = { ...input, id: randomUUID(), createdAt: now, updatedAt: now } as T
    this.records.set(record.id, record)
    return record
  }

  update(id: string, input: Partial<CreateInput<T>>) {
    const existing = this.findById(id)
    if (!existing) return null
    const updated = { ...existing, ...input, updatedAt: new Date().toISOString() }
    this.records.set(id, updated)
    return updated
  }

  delete(id: string) {
    return this.records.delete(id)
  }
}
