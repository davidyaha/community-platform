// React apps populate a process variable, however it might not always be accessible outside
// (e.g. cypress will instead use it's own env to populate a prefix)
const e = process ? process.env : ({} as any)

/**
 * A prefix can be used to simplify large-scale schema changes or multisite hosting
 * and allow multiple sites to use one DB (used for parallel test seed DBs)
 * e.g. oa_
 * SessionStorage prefixes are used to allow test ci environments to dynamically set a db endpoint
 */
const DB_PREFIX = sessionStorage.DB_PREFIX || e.REACT_APP_DB_PREFIX || ''

/**
 * Mapping of generic database endpoints to specific prefixed and revisioned versions for the
 * current implementation
 * @example
 * ```
 * const allHowtos = await db.get(DB_ENDPOINTS.howtos)
 * ```
 * NOTE - these are a bit messy due to various migrations and changes
 * In the future all endpoints should try to just retain prefix-base-revision, e.g. oa_users_rev20201012
 */
export const DB_ENDPOINTS = {
  howtos: `${DB_PREFIX}v3_howtos`,
  users: `${DB_PREFIX}v3_users`,
  tags: `${DB_PREFIX}v3_tags`,
  events: `${DB_PREFIX}v3_events`,
  mappins: `${DB_PREFIX}v3_mappins`,
  research: `${DB_PREFIX}research_rev20201020`,
}
export type DBEndpoint = keyof typeof DB_ENDPOINTS
