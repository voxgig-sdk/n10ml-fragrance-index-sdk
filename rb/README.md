# N10mlFragranceIndex Ruby SDK



The Ruby SDK for the N10mlFragranceIndex API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.N10MlFragranceIndex` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/n10ml-fragrance-index-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/n10ml-fragrance-index-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-n10ml-fragrance-index-sdk", path: "./n10ml-fragrance-index-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "N10mlFragranceIndex_sdk"

client = N10mlFragranceIndexSDK.new
```

### 2. List n10mlfragranceindex records

```ruby
begin
  # list returns an Array of N10MlFragranceIndex entities, one per record; data_get reads the record.
  n10mlfragranceindexs = client.N10MlFragranceIndex.list
  n10mlfragranceindexs.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["accords"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a n10mlfragranceindex

```ruby
begin
  # load returns the ENTITY — call data_get for the N10MlFragranceIndex record (raises on error).
  n10mlfragranceindex = client.N10MlFragranceIndex.load({ "id" => "example_id" })
  puts n10mlfragranceindex.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  n10mlfragranceindexs = client.N10MlFragranceIndex.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = N10mlFragranceIndexSDK.test({
  "entity" => { "n10_ml_fragrance_index" => { "test01" => { "id" => "test01" } } },
})

# list returns an Array of N10MlFragranceIndex entities, one per mock record (raises on
# error); data_get reads each record.
n10mlfragranceindexs = client.N10MlFragranceIndex.list()
n10mlfragranceindexs.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = N10mlFragranceIndexSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### N10mlFragranceIndexSDK

```ruby
require_relative "N10mlFragranceIndex_sdk"
client = N10mlFragranceIndexSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = N10mlFragranceIndexSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### N10mlFragranceIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `N10MlFragranceIndex` | `(data) -> N10MlFragranceIndexEntity` | Create a N10MlFragranceIndex entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`N10mlFragranceIndexError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### N10MlFragranceIndex

| Field | Description |
| --- | --- |
| `accords` | Main accords, strongest first |
| `alternatives` |  |
| `character` | One-sentence description by 10ML's fragrance editors |
| `closeness` |  |
| `concentration` |  |
| `country` |  |
| `exact` | False when this is a closest-match guess |
| `family` | Fragrance family, e.g. |
| `famous_perfumes` |  |
| `found` |  |
| `founded` |  |
| `gender` |  |
| `guide` | The 10ML guide comparing this perfume with its alternatives |
| `guides` |  |
| `house` |  |
| `house_info` |  |
| `id` | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | The defining notes (empty when no pyramid is published) |
| `known_for` |  |
| `links` | 1-3 relevant 10ml.com links |
| `longevity` | 1 (short) to 5 (very long) |
| `message` | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` |  |
| `next_cursor` | Pass as cursor to get the next page; absent on the last page |
| `note` |  |
| `occasions` |  |
| `original` |  |
| `other_matches` | Other originals the query could also mean |
| `other_versions` | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` |  |
| `perfumers` |  |
| `perfumes_in_index` |  |
| `profile` |  |
| `projection` | 1 (skin scent) to 5 (fills a room) |
| `pyramid` |  |
| `seasons` |  |
| `shared_accords` |  |
| `shared_notes` |  |
| `signature_perfumes` |  |
| `similar` |  |
| `source` |  |
| `styles` |  |
| `suggestions` |  |
| `title` |  |
| `topics` |  |
| `total` | How many results matched in all |
| `translated` | False when the guide is only available in English (the url is then the English page) |
| `type` |  |
| `url` |  |
| `why` |  |
| `year` | Launch year when known |

Operations: List, Load.

API path: `/api/v1/alternatives`



## Entities


### N10MlFragranceIndex

Create an instance: `n10_ml_fragrance_index = client.N10MlFragranceIndex`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accords` | `Array` | Main accords, strongest first |
| `alternatives` | `Array` |  |
| `character` | `String` | One-sentence description by 10ML's fragrance editors |
| `closeness` | `String` |  |
| `concentration` | `String` |  |
| `country` | `String` |  |
| `exact` | `Boolean` | False when this is a closest-match guess |
| `family` | `String` | Fragrance family, e.g. |
| `famous_perfumes` | `Array` |  |
| `found` | `Boolean` |  |
| `founded` | `Float` |  |
| `gender` | `String` |  |
| `guide` | `Hash` | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `Array` |  |
| `house` | `Hash` |  |
| `house_info` | `Hash` |  |
| `id` | `String` | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `Array` | The defining notes (empty when no pyramid is published) |
| `known_for` | `Array` |  |
| `links` | `Array` | 1-3 relevant 10ml.com links |
| `longevity` | `Float` | 1 (short) to 5 (very long) |
| `message` | `String` | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `String` |  |
| `next_cursor` | `String` | Pass as cursor to get the next page; absent on the last page |
| `note` | `Hash` |  |
| `occasions` | `Array` |  |
| `original` | `Hash` |  |
| `other_matches` | `Array` | Other originals the query could also mean |
| `other_versions` | `Array` | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `Hash` |  |
| `perfumers` | `Array` |  |
| `perfumes_in_index` | `Float` |  |
| `profile` | `String` |  |
| `projection` | `Float` | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `Hash` |  |
| `seasons` | `Array` |  |
| `shared_accords` | `Array` |  |
| `shared_notes` | `Array` |  |
| `signature_perfumes` | `Array` |  |
| `similar` | `Array` |  |
| `source` | `String` |  |
| `styles` | `Array` |  |
| `suggestions` | `Array` |  |
| `title` | `String` |  |
| `topics` | `Array` |  |
| `total` | `Float` | How many results matched in all |
| `translated` | `Boolean` | False when the guide is only available in English (the url is then the English page) |
| `type` | `String` |  |
| `url` | `String` |  |
| `why` | `String` |  |
| `year` | `Float` | Launch year when known |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the N10MlFragranceIndex record (raises on error).
n10_ml_fragrance_index = client.N10MlFragranceIndex.load({ "id" => "n10_ml_fragrance_index_id" })
```

#### Example: List

```ruby
# list returns an Array of N10MlFragranceIndex entities, one per record (raises on error).
n10_ml_fragrance_indexs = client.N10MlFragranceIndex.list
n10_ml_fragrance_indexs.each { |item| puts item.data_get }
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── N10mlFragranceIndex_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`N10mlFragranceIndex_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
n10mlfragranceindex = client.N10MlFragranceIndex
n10mlfragranceindex.list()

# n10mlfragranceindex.data_get now returns the n10mlfragranceindex data from the last list
# n10mlfragranceindex.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
