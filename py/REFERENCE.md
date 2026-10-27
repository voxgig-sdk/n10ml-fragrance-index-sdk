# N10mlFragranceIndex Python SDK Reference

Complete API reference for the N10mlFragranceIndex Python SDK.


## N10mlFragranceIndexSDK

### Constructor

```python
from n10mlfragranceindex_sdk import N10mlFragranceIndexSDK

client = N10mlFragranceIndexSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `N10mlFragranceIndexSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = N10mlFragranceIndexSDK.test()
```


### Instance Methods

#### `N10MlFragranceIndex(data=None)`

Create a new `N10MlFragranceIndexEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## N10MlFragranceIndexEntity

```python
n10_ml_fragrance_index = client.N10MlFragranceIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accords` | `list` | Yes | Main accords, strongest first |
| `alternatives` | `list` | No |  |
| `character` | `str` | Yes | One-sentence description by 10ML's fragrance editors |
| `closeness` | `str` | Yes |  |
| `concentration` | `str` | No |  |
| `country` | `str` | No |  |
| `exact` | `bool` | Yes | False when this is a closest-match guess |
| `family` | `str` | Yes | Fragrance family, e.g. |
| `famous_perfumes` | `list` | No |  |
| `found` | `bool` | Yes |  |
| `founded` | `float` | No |  |
| `gender` | `str` | Yes |  |
| `guide` | `dict` | Yes | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `list` | No |  |
| `house` | `dict` | Yes |  |
| `house_info` | `dict` | Yes |  |
| `id` | `str` | Yes | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `list` | Yes | The defining notes (empty when no pyramid is published) |
| `known_for` | `list` | Yes |  |
| `links` | `list` | No | 1-3 relevant 10ml.com links |
| `longevity` | `float` | No | 1 (short) to 5 (very long) |
| `message` | `str` | No | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `str` | Yes |  |
| `next_cursor` | `str` | No | Pass as cursor to get the next page; absent on the last page |
| `note` | `dict` | Yes |  |
| `occasions` | `list` | No |  |
| `original` | `dict` | Yes |  |
| `other_matches` | `list` | No | Other originals the query could also mean |
| `other_versions` | `list` | No | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `dict` | Yes |  |
| `perfumers` | `list` | No |  |
| `perfumes_in_index` | `float` | Yes |  |
| `profile` | `str` | Yes |  |
| `projection` | `float` | No | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `dict` | Yes |  |
| `seasons` | `list` | No |  |
| `shared_accords` | `list` | Yes |  |
| `shared_notes` | `list` | Yes |  |
| `signature_perfumes` | `list` | No |  |
| `similar` | `list` | No |  |
| `source` | `str` | Yes |  |
| `styles` | `list` | No |  |
| `suggestions` | `list` | No |  |
| `title` | `str` | Yes |  |
| `topics` | `list` | Yes |  |
| `total` | `float` | Yes | How many results matched in all |
| `translated` | `bool` | Yes | False when the guide is only available in English (the url is then the English page) |
| `type` | `str` | Yes |  |
| `url` | `str` | No |  |
| `why` | `str` | Yes |  |
| `year` | `float` | No | Launch year when known |

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

#### `list(reqmatch=None, ctrl=None) -> list[N10MlFragranceIndexEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.N10MlFragranceIndex().list()
for n10_ml_fragrance_index in results:
    print(n10_ml_fragrance_index.data_get())
```

#### `load(reqmatch, ctrl=None) -> N10MlFragranceIndexEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.N10MlFragranceIndex().load({"id": "n10_ml_fragrance_index_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `N10MlFragranceIndexEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = N10mlFragranceIndexSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

