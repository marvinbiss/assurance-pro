/**
 * Envelope encryption AES-256-GCM pour secrets at-rest.
 *
 * Use case: webhook signing secrets, future API keys, OAuth client secrets.
 *
 * Sécurité:
 *   - Master key dans env var WEBHOOK_ENCRYPTION_KEY (64 hex chars = 32 bytes AES-256)
 *   - IV 12 bytes random par chiffrement
 *   - Auth tag 16 bytes (intégrité + confidentialité GCM)
 *   - Output base64url(iv || ciphertext || tag)
 *
 * Rotation:
 *   - Si rotation master key, déchiffrer avec ancienne + rechiffrer avec nouvelle
 *   - Ajouter prefix de version dans ciphertext pour multi-key support futur
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const AUTH_TAG_LENGTH = 16
const KEY_LENGTH = 32

function getMasterKey(): Buffer {
  const raw = process.env.WEBHOOK_ENCRYPTION_KEY
  if (!raw) {
    throw new Error('WEBHOOK_ENCRYPTION_KEY not set — generate with: openssl rand -hex 32')
  }
  if (raw.length !== KEY_LENGTH * 2) {
    throw new Error(`WEBHOOK_ENCRYPTION_KEY must be ${KEY_LENGTH * 2} hex chars (32 bytes)`)
  }
  return Buffer.from(raw, 'hex')
}

export function encryptSecret(plaintext: string): string {
  const key = getMasterKey()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return Buffer.concat([iv, encrypted, authTag]).toString('base64url')
}

export function decryptSecret(ciphertext: string): string {
  const key = getMasterKey()
  const buffer = Buffer.from(ciphertext, 'base64url')
  if (buffer.length < IV_LENGTH + AUTH_TAG_LENGTH) {
    throw new Error('Ciphertext too short')
  }
  const iv = buffer.subarray(0, IV_LENGTH)
  const authTag = buffer.subarray(buffer.length - AUTH_TAG_LENGTH)
  const encrypted = buffer.subarray(IV_LENGTH, buffer.length - AUTH_TAG_LENGTH)
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

export function isEncryptionConfigured(): boolean {
  try {
    getMasterKey()
    return true
  } catch {
    return false
  }
}
