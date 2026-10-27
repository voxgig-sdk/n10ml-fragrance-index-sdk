# N10mlFragranceIndex TypeScript SDK Reference

Complete API reference for the N10mlFragranceIndex TypeScript SDK.


## N10mlFragranceIndexSDK

### Constructor

```ts
new N10mlFragranceIndexSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `N10mlFragranceIndexSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = N10mlFragranceIndexSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `N10mlFragranceIndexSDK` instance in test mode.


### Instance Methods

#### `N10MlFragranceIndex(data?: object)`

Create a new `N10MlFragranceIndex` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `N10MlFragranceIndexEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `N10mlFragranceIndexSDK.test()`.

**Returns:** `N10mlFragranceIndexSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## N10MlFragranceIndexEntity

```ts
const n10_ml_fragrance_index = client.N10MlFragranceIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accords` | `any[]` | Yes | Main accords, strongest first |
| `alternatives` | `any[]` | No |  |
| `character` | `string` | Yes | One-sentence description by 10ML's fragrance editors |
| `closeness` | `string` | Yes |  |
| `concentration` | `string` | No |  |
| `country` | `string` | No |  |
| `exact` | `boolean` | Yes | False when this is a closest-match guess |
| `family` | `string` | Yes | Fragrance family, e.g. |
| `famous_perfumes` | `any[]` | No |  |
| `found` | `boolean` | Yes |  |
| `founded` | `number` | No |  |
| `gender` | `string` | Yes |  |
| `guide` | `Record<string, any>` | Yes | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `any[]` | No |  |
| `house` | `Record<string, any>` | Yes |  |
| `house_info` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `any[]` | Yes | The defining notes (empty when no pyramid is published) |
| `known_for` | `any[]` | Yes |  |
| `links` | `any[]` | No | 1-3 relevant 10ml.com links |
| `longevity` | `number` | No | 1 (short) to 5 (very long) |
| `message` | `string` | No | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `string` | Yes |  |
| `next_cursor` | `string` | No | Pass as cursor to get the next page; absent on the last page |
| `note` | `Record<string, any>` | Yes |  |
| `occasions` | `any[]` | No |  |
| `original` | `Record<string, any>` | Yes |  |
| `other_matches` | `any[]` | No | Other originals the query could also mean |
| `other_versions` | `any[]` | No | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `Record<string, any>` | Yes |  |
| `perfumers` | `any[]` | No |  |
| `perfumes_in_index` | `number` | Yes |  |
| `profile` | `string` | Yes |  |
| `projection` | `number` | No | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `Record<string, any>` | Yes |  |
| `seasons` | `any[]` | No |  |
| `shared_accords` | `any[]` | Yes |  |
| `shared_notes` | `any[]` | Yes |  |
| `signature_perfumes` | `any[]` | No |  |
| `similar` | `any[]` | No |  |
| `source` | `string` | Yes |  |
| `styles` | `any[]` | No |  |
| `suggestions` | `any[]` | No |  |
| `title` | `string` | Yes |  |
| `topics` | `any[]` | Yes |  |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.N10MlFragranceIndex().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.N10MlFragranceIndex().load({ id: 'n10_ml_fragrance_index_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `N10MlFragranceIndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `N10mlFragranceIndexSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new N10mlFragranceIndexSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

