<?php
declare(strict_types=1);

// Typed models for the N10mlFragranceIndex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** N10MlFragranceIndex entity data model. */
class N10MlFragranceIndex
{
    public array $accords;
    public ?array $alternatives = null;
    public string $character;
    public string $closeness;
    public ?string $concentration = null;
    public ?string $country = null;
    public bool $exact;
    public string $family;
    public ?array $famous_perfumes = null;
    public bool $found;
    public ?float $founded = null;
    public string $gender;
    public array $guide;
    public ?array $guides = null;
    public array $house;
    public array $house_info;
    public string $id;
    public array $key_notes;
    public array $known_for;
    public ?array $links = null;
    public ?float $longevity = null;
    public ?string $message = null;
    public string $name;
    public ?string $next_cursor = null;
    public array $note;
    public ?array $occasions = null;
    public array $original;
    public ?array $other_matches = null;
    public ?array $other_versions = null;
    public array $perfume;
    public ?array $perfumers = null;
    public float $perfumes_in_index;
    public string $profile;
    public ?float $projection = null;
    public array $pyramid;
    public ?array $seasons = null;
    public array $shared_accords;
    public array $shared_notes;
    public ?array $signature_perfumes = null;
    public ?array $similar = null;
    public string $source;
    public ?array $styles = null;
    public ?array $suggestions = null;
    public string $title;
    public array $topics;
    public float $total;
    public bool $translated;
    public string $type;
    public ?string $url = null;
    public string $why;
    public ?float $year = null;
}

/** Request payload for N10MlFragranceIndex#load. */
class N10MlFragranceIndexLoadMatch
{
    public string $id;
    public ?string $format = null;
    public ?string $locale = null;
    public ?string $house = null;
}

/** Request payload for N10MlFragranceIndex#list. */
class N10MlFragranceIndexListMatch
{
    public ?string $closeness = null;
    public ?string $cursor = null;
    public ?string $house = null;
    public ?int $limit = null;
    public ?string $locale = null;
    public ?string $perfume = null;
}

