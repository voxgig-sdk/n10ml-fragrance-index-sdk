# Typed models for the N10mlFragranceIndex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class N10MlFragranceIndexRequired(TypedDict):
    accords: list
    character: str
    closeness: str
    exact: bool
    family: str
    found: bool
    gender: str
    guide: dict
    house: dict
    house_info: dict
    id: str
    key_notes: list
    known_for: list
    name: str
    note: dict
    original: dict
    perfume: dict
    perfumes_in_index: float
    profile: str
    pyramid: dict
    shared_accords: list
    shared_notes: list
    source: str
    title: str
    topics: list
    total: float
    translated: bool
    type: str
    why: str


class N10MlFragranceIndex(N10MlFragranceIndexRequired, total=False):
    alternatives: list
    concentration: str
    country: str
    famous_perfumes: list
    founded: float
    guides: list
    links: list
    longevity: float
    message: str
    next_cursor: str
    occasions: list
    other_matches: list
    other_versions: list
    perfumers: list
    projection: float
    seasons: list
    signature_perfumes: list
    similar: list
    styles: list
    suggestions: list
    url: str
    year: float


class N10MlFragranceIndexLoadMatchRequired(TypedDict):
    id: str


class N10MlFragranceIndexLoadMatch(N10MlFragranceIndexLoadMatchRequired, total=False):
    format: str
    locale: str
    house: str


class N10MlFragranceIndexListMatch(TypedDict, total=False):
    closeness: str
    cursor: str
    house: str
    limit: int
    locale: str
    perfume: str
