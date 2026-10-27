# N10mlFragranceIndex Golang SDK



The Golang SDK for the N10mlFragranceIndex API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.N10MlFragranceIndex(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/n10ml-fragrance-index-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go=../n10ml-fragrance-index-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go"
)

func main() {
    client := sdk.New()

    // List n10MlFragranceIndex records — the value is a []any of entities, one per record.
    n10MlFragranceIndexs, err := client.N10MlFragranceIndex(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range n10MlFragranceIndexs.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }

    // Load a single n10MlFragranceIndex — the value is the entity; Data() reads its record.
    n10MlFragranceIndex, err := client.N10MlFragranceIndex(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(n10MlFragranceIndex.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
n10mlfragranceindexs, err := client.N10MlFragranceIndex(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = n10mlfragranceindexs
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

n10MlFragranceIndexs, err := client.N10MlFragranceIndex(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range n10MlFragranceIndexs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewN10mlFragranceIndexSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
N10ML_FRAGRANCE_INDEX_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewN10mlFragranceIndexSDK

```go
func NewN10mlFragranceIndexSDK(options map[string]any) *N10mlFragranceIndexSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *N10mlFragranceIndexSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### N10mlFragranceIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `N10MlFragranceIndex` | `(data map[string]any) N10mlFragranceIndexEntity` | Create a N10MlFragranceIndex entity instance. |

### Entity interface (N10mlFragranceIndexEntity)

All entities implement the `N10mlFragranceIndexEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    n10MlFragranceIndex, err := client.N10MlFragranceIndex(nil).List(nil, nil)
    if err != nil { /* handle */ }
    // n10MlFragranceIndex is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### N10MlFragranceIndex

| Field | Description |
| --- | --- |
| `"accords"` | Main accords, strongest first |
| `"alternatives"` |  |
| `"character"` | One-sentence description by 10ML's fragrance editors |
| `"closeness"` |  |
| `"concentration"` |  |
| `"country"` |  |
| `"exact"` | False when this is a closest-match guess |
| `"family"` | Fragrance family, e.g. |
| `"famous_perfumes"` |  |
| `"found"` |  |
| `"founded"` |  |
| `"gender"` |  |
| `"guide"` | The 10ML guide comparing this perfume with its alternatives |
| `"guides"` |  |
| `"house"` |  |
| `"house_info"` |  |
| `"id"` | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `"key_notes"` | The defining notes (empty when no pyramid is published) |
| `"known_for"` |  |
| `"links"` | 1-3 relevant 10ml.com links |
| `"longevity"` | 1 (short) to 5 (very long) |
| `"message"` | Guidance when the result is empty, partial or needs a follow-up tool |
| `"name"` |  |
| `"next_cursor"` | Pass as cursor to get the next page; absent on the last page |
| `"note"` |  |
| `"occasions"` |  |
| `"original"` |  |
| `"other_matches"` | Other originals the query could also mean |
| `"other_versions"` | Ids of other concentrations or flankers of the same perfume in the index |
| `"perfume"` |  |
| `"perfumers"` |  |
| `"perfumes_in_index"` |  |
| `"profile"` |  |
| `"projection"` | 1 (skin scent) to 5 (fills a room) |
| `"pyramid"` |  |
| `"seasons"` |  |
| `"shared_accords"` |  |
| `"shared_notes"` |  |
| `"signature_perfumes"` |  |
| `"similar"` |  |
| `"source"` |  |
| `"styles"` |  |
| `"suggestions"` |  |
| `"title"` |  |
| `"topics"` |  |
| `"total"` | How many results matched in all |
| `"translated"` | False when the guide is only available in English (the url is then the English page) |
| `"type"` |  |
| `"url"` |  |
| `"why"` |  |
| `"year"` | Launch year when known |

Operations: List, Load.

API path: `/api/v1/alternatives`



## Entities


### N10MlFragranceIndex

Create an instance: `n10MlFragranceIndex := client.N10MlFragranceIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accords` | `[]any` | Main accords, strongest first |
| `alternatives` | `[]any` |  |
| `character` | `string` | One-sentence description by 10ML's fragrance editors |
| `closeness` | `string` |  |
| `concentration` | `string` |  |
| `country` | `string` |  |
| `exact` | `bool` | False when this is a closest-match guess |
| `family` | `string` | Fragrance family, e.g. |
| `famous_perfumes` | `[]any` |  |
| `found` | `bool` |  |
| `founded` | `float64` |  |
| `gender` | `string` |  |
| `guide` | `map[string]any` | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `[]any` |  |
| `house` | `map[string]any` |  |
| `house_info` | `map[string]any` |  |
| `id` | `string` | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `[]any` | The defining notes (empty when no pyramid is published) |
| `known_for` | `[]any` |  |
| `links` | `[]any` | 1-3 relevant 10ml.com links |
| `longevity` | `float64` | 1 (short) to 5 (very long) |
| `message` | `string` | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `string` |  |
| `next_cursor` | `string` | Pass as cursor to get the next page; absent on the last page |
| `note` | `map[string]any` |  |
| `occasions` | `[]any` |  |
| `original` | `map[string]any` |  |
| `other_matches` | `[]any` | Other originals the query could also mean |
| `other_versions` | `[]any` | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `map[string]any` |  |
| `perfumers` | `[]any` |  |
| `perfumes_in_index` | `float64` |  |
| `profile` | `string` |  |
| `projection` | `float64` | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `map[string]any` |  |
| `seasons` | `[]any` |  |
| `shared_accords` | `[]any` |  |
| `shared_notes` | `[]any` |  |
| `signature_perfumes` | `[]any` |  |
| `similar` | `[]any` |  |
| `source` | `string` |  |
| `styles` | `[]any` |  |
| `suggestions` | `[]any` |  |
| `title` | `string` |  |
| `topics` | `[]any` |  |
| `total` | `float64` | How many results matched in all |
| `translated` | `bool` | False when the guide is only available in English (the url is then the English page) |
| `type` | `string` |  |
| `url` | `string` |  |
| `why` | `string` |  |
| `year` | `float64` | Launch year when known |

#### Example: Load

```go
n10MlFragranceIndex, err := client.N10MlFragranceIndex(nil).Load(map[string]any{"id": "n10_ml_fragrance_index_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(n10MlFragranceIndex.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
n10MlFragranceIndexs, err := client.N10MlFragranceIndex(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range n10MlFragranceIndexs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go/
├── n10ml-fragrance-index.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
n10mlfragranceindex := client.N10MlFragranceIndex(nil)
n10mlfragranceindex.List(nil, nil)

// n10mlfragranceindex.Data() now returns the n10mlfragranceindex data from the last list
// n10mlfragranceindex.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
