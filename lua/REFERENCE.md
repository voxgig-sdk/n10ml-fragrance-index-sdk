# N10mlFragranceIndex Lua SDK Reference

Complete API reference for the N10mlFragranceIndex Lua SDK.


## N10mlFragranceIndexSDK

### Constructor

```lua
local sdk = require("n10ml-fragrance-index_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `N10MlFragranceIndex(data)`

Create a new `N10MlFragranceIndex` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## N10MlFragranceIndexEntity

```lua
local n10_ml_fragrance_index = client:N10MlFragranceIndex(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accords` | `table` | Yes | Main accords, strongest first |
| `alternatives` | `table` | No |  |
| `character` | `string` | Yes | One-sentence description by 10ML's fragrance editors |
| `closeness` | `string` | Yes |  |
| `concentration` | `string` | No |  |
| `country` | `string` | No |  |
| `exact` | `boolean` | Yes | False when this is a closest-match guess |
| `family` | `string` | Yes | Fragrance family, e.g. |
| `famous_perfumes` | `table` | No |  |
| `found` | `boolean` | Yes |  |
| `founded` | `number` | No |  |
| `gender` | `string` | Yes |  |
| `guide` | `table` | Yes | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `table` | No |  |
| `house` | `table` | Yes |  |
| `house_info` | `table` | Yes |  |
| `id` | `string` | Yes | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `table` | Yes | The defining notes (empty when no pyramid is published) |
| `known_for` | `table` | Yes |  |
| `links` | `table` | No | 1-3 relevant 10ml.com links |
| `longevity` | `number` | No | 1 (short) to 5 (very long) |
| `message` | `string` | No | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `string` | Yes |  |
| `next_cursor` | `string` | No | Pass as cursor to get the next page; absent on the last page |
| `note` | `table` | Yes |  |
| `occasions` | `table` | No |  |
| `original` | `table` | Yes |  |
| `other_matches` | `table` | No | Other originals the query could also mean |
| `other_versions` | `table` | No | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `table` | Yes |  |
| `perfumers` | `table` | No |  |
| `perfumes_in_index` | `number` | Yes |  |
| `profile` | `string` | Yes |  |
| `projection` | `number` | No | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `table` | Yes |  |
| `seasons` | `table` | No |  |
| `shared_accords` | `table` | Yes |  |
| `shared_notes` | `table` | Yes |  |
| `signature_perfumes` | `table` | No |  |
| `similar` | `table` | No |  |
| `source` | `string` | Yes |  |
| `styles` | `table` | No |  |
| `suggestions` | `table` | No |  |
| `title` | `string` | Yes |  |
| `topics` | `table` | Yes |  |
| `total` | `number` | Yes | How many results matched in all |
| `translated` | `boolean` | Yes | False when the guide is only available in English (the url is then the English page) |
| `type` | `string` | Yes |  |
| `url` | `string` | No |  |
| `why` | `string` | Yes |  |
| `year` | `number` | No | Launch year when known |

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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:N10MlFragranceIndex():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:N10MlFragranceIndex():load({ id = "n10_ml_fragrance_index_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `N10MlFragranceIndexEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

