# frozen_string_literal: true

# Typed models for the N10mlFragranceIndex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# N10MlFragranceIndex entity data model.
#
# @!attribute [rw] accords
#   @return [Array]
#
# @!attribute [rw] alternatives
#   @return [Array, nil]
#
# @!attribute [rw] character
#   @return [String]
#
# @!attribute [rw] closeness
#   @return [String]
#
# @!attribute [rw] concentration
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] exact
#   @return [Boolean]
#
# @!attribute [rw] family
#   @return [String]
#
# @!attribute [rw] famous_perfumes
#   @return [Array, nil]
#
# @!attribute [rw] found
#   @return [Boolean]
#
# @!attribute [rw] founded
#   @return [Float, nil]
#
# @!attribute [rw] gender
#   @return [String]
#
# @!attribute [rw] guide
#   @return [Hash]
#
# @!attribute [rw] guides
#   @return [Array, nil]
#
# @!attribute [rw] house
#   @return [Hash]
#
# @!attribute [rw] house_info
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key_notes
#   @return [Array]
#
# @!attribute [rw] known_for
#   @return [Array]
#
# @!attribute [rw] links
#   @return [Array, nil]
#
# @!attribute [rw] longevity
#   @return [Float, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] next_cursor
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [Hash]
#
# @!attribute [rw] occasions
#   @return [Array, nil]
#
# @!attribute [rw] original
#   @return [Hash]
#
# @!attribute [rw] other_matches
#   @return [Array, nil]
#
# @!attribute [rw] other_versions
#   @return [Array, nil]
#
# @!attribute [rw] perfume
#   @return [Hash]
#
# @!attribute [rw] perfumers
#   @return [Array, nil]
#
# @!attribute [rw] perfumes_in_index
#   @return [Float]
#
# @!attribute [rw] profile
#   @return [String]
#
# @!attribute [rw] projection
#   @return [Float, nil]
#
# @!attribute [rw] pyramid
#   @return [Hash]
#
# @!attribute [rw] seasons
#   @return [Array, nil]
#
# @!attribute [rw] shared_accords
#   @return [Array]
#
# @!attribute [rw] shared_notes
#   @return [Array]
#
# @!attribute [rw] signature_perfumes
#   @return [Array, nil]
#
# @!attribute [rw] similar
#   @return [Array, nil]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] styles
#   @return [Array, nil]
#
# @!attribute [rw] suggestions
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] topics
#   @return [Array]
#
# @!attribute [rw] total
#   @return [Float]
#
# @!attribute [rw] translated
#   @return [Boolean]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] why
#   @return [String]
#
# @!attribute [rw] year
#   @return [Float, nil]
N10MlFragranceIndex = Struct.new(
  :accords,
  :alternatives,
  :character,
  :closeness,
  :concentration,
  :country,
  :exact,
  :family,
  :famous_perfumes,
  :found,
  :founded,
  :gender,
  :guide,
  :guides,
  :house,
  :house_info,
  :id,
  :key_notes,
  :known_for,
  :links,
  :longevity,
  :message,
  :name,
  :next_cursor,
  :note,
  :occasions,
  :original,
  :other_matches,
  :other_versions,
  :perfume,
  :perfumers,
  :perfumes_in_index,
  :profile,
  :projection,
  :pyramid,
  :seasons,
  :shared_accords,
  :shared_notes,
  :signature_perfumes,
  :similar,
  :source,
  :styles,
  :suggestions,
  :title,
  :topics,
  :total,
  :translated,
  :type,
  :url,
  :why,
  :year,
  keyword_init: true
)

# Request payload for N10MlFragranceIndex#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] house
#   @return [String, nil]
N10MlFragranceIndexLoadMatch = Struct.new(
  :id,
  :format,
  :locale,
  :house,
  keyword_init: true
)

# Request payload for N10MlFragranceIndex#list.
#
# @!attribute [rw] closeness
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] house
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] perfume
#   @return [String, nil]
N10MlFragranceIndexListMatch = Struct.new(
  :closeness,
  :cursor,
  :house,
  :limit,
  :locale,
  :perfume,
  keyword_init: true
)

