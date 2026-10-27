# N10mlFragranceIndex Ruby SDK Reference

Complete API reference for the N10mlFragranceIndex Ruby SDK.


## N10mlFragranceIndexSDK

### Constructor

```ruby
require_relative 'N10mlFragranceIndex_sdk'

client = N10mlFragranceIndexSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `N10mlFragranceIndexSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = N10mlFragranceIndexSDK.test
```


### Instance Methods

#### `N10MlFragranceIndex(data = nil)`

Create a new `N10MlFragranceIndex` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## N10MlFragranceIndexEntity

```ruby
n10_ml_fragrance_index = client.N10MlFragranceIndex
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accords` | `Array` | Yes | Main accords, strongest first |
| `alternatives` | `Array` | No |  |
| `character` | `String` | Yes | One-sentence description by 10ML's fragrance editors |
| `closeness` | `String` | Yes |  |
| `concentration` | `String` | No |  |
| `country` | `String` | No |  |
| `exact` | `Boolean` | Yes | False when this is a closest-match guess |
| `family` | `String` | Yes | Fragrance family, e.g. |
| `famous_perfumes` | `Array` | No |  |
| `found` | `Boolean` | Yes |  |
| `founded` | `Float` | No |  |
| `gender` | `String` | Yes |  |
| `guide` | `Hash` | Yes | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `Array` | No |  |
| `house` | `Hash` | Yes |  |
| `house_info` | `Hash` | Yes |  |
| `id` | `String` | Yes | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `Array` | Yes | The defining notes (empty when no pyramid is published) |
| `known_for` | `Array` | Yes |  |
| `links` | `Array` | No | 1-3 relevant 10ml.com links |
| `longevity` | `Float` | No | 1 (short) to 5 (very long) |
| `message` | `String` | No | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `String` | Yes |  |
| `next_cursor` | `String` | No | Pass as cursor to get the next page; absent on the last page |
| `note` | `Hash` | Yes |  |
| `occasions` | `Array` | No |  |
| `original` | `Hash` | Yes |  |
| `other_matches` | `Array` | No | Other originals the query could also mean |
| `other_versions` | `Array` | No | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `Hash` | Yes |  |
| `perfumers` | `Array` | No |  |
| `perfumes_in_index` | `Float` | Yes |  |
| `profile` | `String` | Yes |  |
| `projection` | `Float` | No | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `Hash` | Yes |  |
| `seasons` | `Array` | No |  |
| `shared_accords` | `Array` | Yes |  |
| `shared_notes` | `Array` | Yes |  |
| `signature_perfumes` | `Array` | No |  |
| `similar` | `Array` | No |  |
| `source` | `String` | Yes |  |
| `styles` | `Array` | No |  |
| `suggestions` | `Array` | No |  |
| `title` | `String` | Yes |  |
| `topics` | `Array` | Yes |  |
| `total` | `Float` | Yes | How many results matched in all |
| `translated` | `Boolean` | Yes | False when the guide is only available in English (the url is then the English page) |
| `type` | `String` | Yes |  |
| `url` | `String` | No |  |
| `why` | `String` | Yes |  |
| `year` | `Float` | No | Launch year when known |

### Field Usage by Operation

| Field | load | list |
| --- | --- | --- |
| `accords` | - | - |
| `alternatives` | - | Yes |
| `character` | - | - |
| `closeness` | - | - |
| `concentration` | - | - |
| `country` | - | - |
| `exact` | - | - |
| `family` | - | - |
| `famous_perfumes` | - | - |
| `found` | - | - |
| `founded` | - | - |
| `gender` | - | - |
| `guide` | - | - |
| `guides` | - | - |
| `house` | - | - |
| `house_info` | - | - |
| `id` | - | - |
| `key_notes` | - | - |
| `known_for` | - | - |
| `links` | - | Yes |
| `longevity` | - | - |
| `message` | - | - |
| `name` | - | - |
| `next_cursor` | - | - |
| `note` | - | - |
| `occasions` | - | - |
| `original` | - | - |
| `other_matches` | - | - |
| `other_versions` | - | - |
| `perfume` | - | - |
| `perfumers` | - | - |
| `perfumes_in_index` | - | - |
| `profile` | - | - |
| `projection` | - | - |
| `pyramid` | - | - |
| `seasons` | - | - |
| `shared_accords` | - | - |
| `shared_notes` | - | - |
| `signature_perfumes` | - | - |
| `similar` | - | - |
| `source` | - | - |
| `styles` | - | - |
| `suggestions` | - | - |
| `title` | - | - |
| `topics` | - | - |
| `total` | - | - |
| `translated` | - | - |
| `type` | - | - |
| `url` | - | - |
| `why` | - | - |
| `year` | - | - |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.N10MlFragranceIndex.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.N10MlFragranceIndex.load({ "id" => "n10_ml_fragrance_index_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `N10MlFragranceIndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = N10mlFragranceIndexSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

