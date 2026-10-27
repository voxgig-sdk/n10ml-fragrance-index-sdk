// Typed models for the N10mlFragranceIndex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface N10MlFragranceIndex {
  accords: any[]
  alternatives?: any[]
  character: string
  closeness: string
  concentration?: string
  country?: string
  exact: boolean
  family: string
  famous_perfumes?: any[]
  found: boolean
  founded?: number
  gender: string
  guide: Record<string, any>
  guides?: any[]
  house: Record<string, any>
  house_info: Record<string, any>
  id: string
  key_notes: any[]
  known_for: any[]
  links?: any[]
  longevity?: number
  message?: string
  name: string
  next_cursor?: string
  note: Record<string, any>
  occasions?: any[]
  original: Record<string, any>
  other_matches?: any[]
  other_versions?: any[]
  perfume: Record<string, any>
  perfumers?: any[]
  perfumes_in_index: number
  profile: string
  projection?: number
  pyramid: Record<string, any>
  seasons?: any[]
  shared_accords: any[]
  shared_notes: any[]
  signature_perfumes?: any[]
  similar?: any[]
  source: string
  styles?: any[]
  suggestions?: any[]
  title: string
  topics: any[]
  total: number
  translated: boolean
  type: string
  url?: string
  why: string
  year?: number
}

export interface N10MlFragranceIndexLoadMatch {
  id: string
  format?: string
  locale?: string
  house?: string
}

export interface N10MlFragranceIndexListMatch {
  closeness?: string
  cursor?: string
  house?: string
  limit?: number
  locale?: string
  perfume?: string
}

