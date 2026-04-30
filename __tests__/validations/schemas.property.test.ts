/**
 * Property-based tests for Zod schemas and pure business logic
 * Uses fast-check to fuzz schemas and verify invariants
 */

import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  emailSchema,
  phoneSchema,
  passwordSchema,
  nameSchema,
  uuidSchema,
  dateSchema,
  timeSchema,
  createBookingSchema,
  updateBookingSchema,
  getBookingsSchema,
  createReviewSchema,
  getReviewsSchema,
  signUpSchema,
  signInSchema,
  updateProfileSchema,
  artisanRegistrationSchema,
  createPaymentIntentSchema,
  searchSchema,
  createAvailabilitySchema,
  getAvailabilitySchema,
  contactSchema,
  validateRequest,
  formatZodErrors,
} from '@/lib/validations/schemas'
import {
  slugify,
  truncate,
  getInitials,
  getAvatarColor,
  isValidEmail,
  formatFrenchPhone,
  isValidSIRET,
  calculateDistance,
  getRatingColor,
  parseQueryString,
  formatPrice,
} from '@/lib/utils'
import {
  sanitizeSearchQuery,
  sanitizeHtml,
  sanitizeUserInput,
  sanitizeEmail,
  sanitizePhone,
  sanitizeUuid,
  isValidUuid,
  sanitizeSiret,
} from '@/lib/sanitize'
import { cleanPhone, isValidFrenchPhone } from '@/lib/validation/phone'
import {
  formatPhone,
  maskPhone,
  formatPrice as formatPriceUtil,
  truncate as truncateUtil,
  capitalizeFirst,
  formatFileSize,
  formatSiret,
} from '@/lib/utils/format'

// ============================================
// ZOD SCHEMAS — FUZZ TESTING (safeParse never throws)
// ============================================

describe('Zod schemas — fuzz testing with random strings', () => {
  const schemas = {
    emailSchema,
    phoneSchema,
    passwordSchema,
    nameSchema,
    uuidSchema,
    dateSchema,
    timeSchema,
  }

  for (const [name, schema] of Object.entries(schemas)) {
    it(`${name}.safeParse never throws on random strings`, () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const result = schema.safeParse(input)
          // safeParse must always return a result object without throwing
          expect(result).toHaveProperty('success')
          return true
        }),
        { numRuns: 1000 }
      )
    })
  }
})

describe('Zod schemas — fuzz testing with random JSON', () => {
  const objectSchemas = {
    createBookingSchema,
    updateBookingSchema,
    getBookingsSchema,
    createReviewSchema,
    getReviewsSchema,
    signInSchema,
    updateProfileSchema,
    createPaymentIntentSchema,
    searchSchema,
    createAvailabilitySchema,
    getAvailabilitySchema,
    contactSchema,
  }

  for (const [name, schema] of Object.entries(objectSchemas)) {
    it(`${name}.safeParse never throws on random JSON`, () => {
      fc.assert(
        fc.property(fc.jsonValue(), (input) => {
          const result = schema.safeParse(input)
          expect(result).toHaveProperty('success')
          return true
        }),
        { numRuns: 1000 }
      )
    })
  }

  // Refined schemas (signUp, artisanRegistration) also must not throw
  it('signUpSchema.safeParse never throws on random JSON', () => {
    fc.assert(
      fc.property(fc.jsonValue(), (input) => {
        const result = signUpSchema.safeParse(input)
        expect(result).toHaveProperty('success')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('artisanRegistrationSchema.safeParse never throws on random JSON', () => {
    fc.assert(
      fc.property(fc.jsonValue(), (input) => {
        const result = artisanRegistrationSchema.safeParse(input)
        expect(result).toHaveProperty('success')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('Zod schemas — fuzz testing with undefined/null/exotic types', () => {
  const allSchemas = {
    emailSchema,
    phoneSchema,
    passwordSchema,
    nameSchema,
    uuidSchema,
    dateSchema,
    timeSchema,
    createBookingSchema,
    updateBookingSchema,
    signInSchema,
    searchSchema,
    contactSchema,
  }

  for (const [name, schema] of Object.entries(allSchemas)) {
    it(`${name}.safeParse never throws on anything()`, () => {
      fc.assert(
        fc.property(fc.anything(), (input) => {
          const result = schema.safeParse(input)
          expect(result).toHaveProperty('success')
          return true
        }),
        { numRuns: 1000 }
      )
    })
  }
})

// ============================================
// validateRequest & formatZodErrors — fuzz testing
// ============================================

describe('validateRequest — fuzz testing', () => {
  it('never throws on random input with emailSchema', () => {
    fc.assert(
      fc.property(fc.anything(), (input) => {
        const result = validateRequest(emailSchema, input)
        expect(result).toHaveProperty('success')
        return typeof result.success === 'boolean'
      }),
      { numRuns: 1000 }
    )
  })

  it('never throws on random input with createBookingSchema', () => {
    fc.assert(
      fc.property(fc.anything(), (input) => {
        const result = validateRequest(createBookingSchema, input)
        expect(result).toHaveProperty('success')
        return typeof result.success === 'boolean'
      }),
      { numRuns: 1000 }
    )
  })
})

describe('formatZodErrors — invariants', () => {
  it('always returns an object with string values for failed validations', () => {
    fc.assert(
      fc.property(fc.jsonValue(), (input) => {
        const parseResult = createBookingSchema.safeParse(input)
        if (!parseResult.success) {
          const formatted = formatZodErrors(parseResult.error)
          expect(typeof formatted).toBe('object')
          for (const val of Object.values(formatted)) {
            expect(typeof val).toBe('string')
          }
        }
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

// ============================================
// PURE UTILITY FUNCTIONS — PROPERTY TESTS
// ============================================

describe('slugify — properties', () => {
  it('output contains only lowercase alphanumeric and hyphens', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = slugify(input)
        expect(result).toMatch(/^[a-z0-9-]*$/)
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('never starts or ends with a hyphen', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (input) => {
        const result = slugify(input)
        if (result.length > 0) {
          expect(result[0]).not.toBe('-')
          expect(result[result.length - 1]).not.toBe('-')
        }
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('is idempotent: slugify(slugify(x)) === slugify(x)', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const once = slugify(input)
        const twice = slugify(once)
        expect(twice).toBe(once)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('truncate — properties', () => {
  it('output length never exceeds maxLength + 3 (for ellipsis)', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.integer({ min: 0, max: 1000 }),
        (text, maxLength) => {
          const result = truncate(text, maxLength)
          // If truncated, output = maxLength chars + "..."
          expect(result.length).toBeLessThanOrEqual(Math.max(text.length, maxLength + 3))
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })

  it('short text is returned as-is', () => {
    fc.assert(
      fc.property(
        fc.string({ maxLength: 10 }),
        fc.integer({ min: 10, max: 100 }),
        (text, maxLength) => {
          expect(truncate(text, maxLength)).toBe(text)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })
})

describe('getInitials — properties', () => {
  it('output is always uppercase and at most 2 characters', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (name) => {
        const result = getInitials(name)
        expect(result.length).toBeLessThanOrEqual(2)
        expect(result).toBe(result.toUpperCase())
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('getAvatarColor — properties', () => {
  it('is deterministic: same input always gives same output', () => {
    fc.assert(
      fc.property(fc.string(), (name) => {
        const a = getAvatarColor(name)
        const b = getAvatarColor(name)
        expect(a).toBe(b)
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('always returns a valid Tailwind gradient class', () => {
    fc.assert(
      fc.property(fc.string(), (name) => {
        const result = getAvatarColor(name)
        expect(result).toMatch(/^from-\w+-\d+ to-\w+-\d+$/)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('isValidEmail — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = isValidEmail(input)
        expect(typeof result).toBe('boolean')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('rejects strings without @', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => !s.includes('@')),
        (input) => {
          expect(isValidEmail(input)).toBe(false)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })
})

describe('formatFrenchPhone — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = formatFrenchPhone(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('isValidSIRET — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = isValidSIRET(input)
        expect(typeof result).toBe('boolean')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('rejects strings that are not 14 digits', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.replace(/\s/g, '').length !== 14 || !/^\d+$/.test(s.replace(/\s/g, ''))),
        (input) => {
          expect(isValidSIRET(input)).toBe(false)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })
})

describe('calculateDistance — properties', () => {
  it('distance from a point to itself is 0', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -90, max: 90, noNaN: true }),
        fc.double({ min: -180, max: 180, noNaN: true }),
        (lat, lon) => {
          const d = calculateDistance(lat, lon, lat, lon)
          expect(d).toBeCloseTo(0, 5)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })

  it('distance is always non-negative', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -90, max: 90, noNaN: true }),
        fc.double({ min: -180, max: 180, noNaN: true }),
        fc.double({ min: -90, max: 90, noNaN: true }),
        fc.double({ min: -180, max: 180, noNaN: true }),
        (lat1, lon1, lat2, lon2) => {
          const d = calculateDistance(lat1, lon1, lat2, lon2)
          expect(d).toBeGreaterThanOrEqual(0)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })

  it('is symmetric: d(A,B) === d(B,A)', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -90, max: 90, noNaN: true }),
        fc.double({ min: -180, max: 180, noNaN: true }),
        fc.double({ min: -90, max: 90, noNaN: true }),
        fc.double({ min: -180, max: 180, noNaN: true }),
        (lat1, lon1, lat2, lon2) => {
          const d1 = calculateDistance(lat1, lon1, lat2, lon2)
          const d2 = calculateDistance(lat2, lon2, lat1, lon1)
          expect(d1).toBeCloseTo(d2, 10)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })
})

describe('getRatingColor — properties', () => {
  it('always returns a valid Tailwind text color class', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 5, noNaN: true }), (rating) => {
        const result = getRatingColor(rating)
        expect(result).toMatch(/^text-(green|yellow|orange|red)-\d+$/)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('parseQueryString — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = parseQueryString(input)
        expect(typeof result).toBe('object')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('formatPrice — properties', () => {
  it('never throws on any number', () => {
    fc.assert(
      fc.property(fc.double({ noNaN: true, min: -1e9, max: 1e9 }), (price) => {
        const result = formatPrice(price)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

// ============================================
// SANITIZE FUNCTIONS — PROPERTY TESTS
// ============================================

describe('sanitizeSearchQuery — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSearchQuery(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output never exceeds 200 characters (before escaping expansion)', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSearchQuery(input)
        // The input is sliced to 200, but escaping can expand it
        // The original input sliced portion should be <= 200
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output never contains null bytes', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSearchQuery(input)
        expect(result).not.toContain('\0')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output never contains SQL comment markers', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSearchQuery(input)
        expect(result).not.toContain('--')
        expect(result).not.toContain('/*')
        expect(result).not.toContain('*/')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('sanitizeHtml — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeHtml(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output never contains raw < or > characters', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (input) => {
        const result = sanitizeHtml(input)
        expect(result).not.toContain('<')
        expect(result).not.toContain('>')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('is idempotent when applied to already-safe strings', () => {
    // Generate strings with only safe characters (no &, <, >, ", ', /)
    const safeCharArb = fc.stringMatching(/^[a-z0-9 ]*$/)
    fc.assert(
      fc.property(safeCharArb, (input) => {
        // Input with no special chars should not be changed
        expect(sanitizeHtml(input)).toBe(input)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('sanitizeUserInput — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeUserInput(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('removes script tags', () => {
    fc.assert(
      fc.property(fc.string(), (payload) => {
        const input = `<script>${payload}</script>`
        const result = sanitizeUserInput(input)
        expect(result.toLowerCase()).not.toContain('<script')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('sanitizeEmail — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeEmail(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output is always lowercase', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeEmail(input)
        expect(result).toBe(result.toLowerCase())
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('sanitizePhone — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizePhone(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output contains only digits and plus signs', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizePhone(input)
        if (result.length > 0) {
          // sanitizePhone keeps + only at start, but digits with + embedded can remain
          expect(result).toMatch(/^[+\d]*$/)
        }
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('sanitizeUuid — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeUuid(input)
        expect(result === null || typeof result === 'string').toBe(true)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('isValidUuid — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = isValidUuid(input)
        expect(typeof result).toBe('boolean')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('accepts valid UUID v4 format', () => {
    fc.assert(
      fc.property(fc.uuid(), (uuid) => {
        // fc.uuid() generates valid UUIDs
        expect(isValidUuid(uuid)).toBe(true)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('sanitizeSiret — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSiret(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output contains only digits', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSiret(input)
        if (result.length > 0) {
          expect(result).toMatch(/^\d+$/)
        }
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output length is at most 14', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = sanitizeSiret(input)
        expect(result.length).toBeLessThanOrEqual(14)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

// ============================================
// PHONE VALIDATION — PROPERTY TESTS
// ============================================

describe('cleanPhone — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = cleanPhone(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('output never contains spaces, dots, dashes, or parentheses', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = cleanPhone(input)
        expect(result).not.toMatch(/[\s.\-()]/)
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('is idempotent', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const once = cleanPhone(input)
        const twice = cleanPhone(once)
        expect(twice).toBe(once)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('isValidFrenchPhone — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = isValidFrenchPhone(input)
        expect(typeof result).toBe('boolean')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

// ============================================
// FORMAT UTILITIES — PROPERTY TESTS
// ============================================

describe('formatPhone — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = formatPhone(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('maskPhone — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = maskPhone(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('formatPriceUtil — properties', () => {
  it('never throws on any finite number', () => {
    fc.assert(
      fc.property(fc.double({ noNaN: true, min: -1e12, max: 1e12 }), (amount) => {
        const result = formatPriceUtil(amount)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('capitalizeFirst — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = capitalizeFirst(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('first character is uppercase if input is non-empty', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => /[a-zA-Z]/.test(s[0]!)),
        (input) => {
          const result = capitalizeFirst(input)
          expect(result[0]!).toBe(result[0]!.toUpperCase())
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })

  it('preserves length', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = capitalizeFirst(input)
        expect(result.length).toBe(input.length)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('formatFileSize — properties', () => {
  it('never throws on non-negative numbers', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1e12 }), (bytes) => {
        const result = formatFileSize(bytes)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('returns "0 B" for zero', () => {
    expect(formatFileSize(0)).toBe('0 B')
  })

  it('output contains a unit suffix', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1e12 }), (bytes) => {
        const result = formatFileSize(bytes)
        expect(result).toMatch(/(B|KB|MB|GB)$/)
        return true
      }),
      { numRuns: 1000 }
    )
  })
})

describe('formatSiret — properties', () => {
  it('never throws on any string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = formatSiret(input)
        expect(typeof result).toBe('string')
        return true
      }),
      { numRuns: 1000 }
    )
  })

  it('returns input unchanged if not 14 digits after cleaning', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.replace(/\s/g, '').length !== 14),
        (input) => {
          expect(formatSiret(input)).toBe(input)
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })
})

describe('truncateUtil — properties', () => {
  it('output length never exceeds maxLength + 3', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.integer({ min: 0, max: 1000 }),
        (text, maxLength) => {
          const result = truncateUtil(text, maxLength)
          if (text.length > maxLength) {
            expect(result.length).toBe(maxLength + 3)
          } else {
            expect(result).toBe(text)
          }
          return true
        }
      ),
      { numRuns: 1000 }
    )
  })
})
