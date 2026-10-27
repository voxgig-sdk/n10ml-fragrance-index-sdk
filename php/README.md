# N10mlFragranceIndex PHP SDK



The PHP SDK for the N10mlFragranceIndex API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->N10MlFragranceIndex()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/n10ml-fragrance-index-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/n10ml-fragrance-index-sdk
composer config repositories.n10ml-fragrance-index-sdk path ./n10ml-fragrance-index-sdk/php
composer require voxgig-sdk/n10ml-fragrance-index-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'n10mlfragranceindex_sdk.php';

$client = new N10mlFragranceIndexSDK();
```

### 2. List n10mlfragranceindex records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $n10mlfragranceindexs = $client->N10MlFragranceIndex()->list();
    foreach ($n10mlfragranceindexs as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["accords"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a n10mlfragranceindex

```php
try {
    // load() returns the ENTITY — call data_get() for the N10MlFragranceIndex record (throws on error).
    $n10mlfragranceindex = $client->N10MlFragranceIndex()->load(["id" => "example_id"]);
    print_r($n10mlfragranceindex->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $n10mlfragranceindexs = $client->N10MlFragranceIndex()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = N10mlFragranceIndexSDK::test([
    "entity" => ["n10_ml_fragrance_index" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$n10mlfragranceindex = $client->N10MlFragranceIndex()->list();
print_r(array_map(fn($item) => $item->data_get(), $n10mlfragranceindex));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new N10mlFragranceIndexSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
N10ML_FRAGRANCE_INDEX_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### N10mlFragranceIndexSDK

```php
require_once 'n10mlfragranceindex_sdk.php';
$client = new N10mlFragranceIndexSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = N10mlFragranceIndexSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### N10mlFragranceIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `N10MlFragranceIndex` | `($data): N10MlFragranceIndexEntity` | Create a N10MlFragranceIndex entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$n10_ml_fragrance_index = $client->N10MlFragranceIndex();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accords` | `array` | Main accords, strongest first |
| `alternatives` | `array` |  |
| `character` | `string` | One-sentence description by 10ML's fragrance editors |
| `closeness` | `string` |  |
| `concentration` | `string` |  |
| `country` | `string` |  |
| `exact` | `bool` | False when this is a closest-match guess |
| `family` | `string` | Fragrance family, e.g. |
| `famous_perfumes` | `array` |  |
| `found` | `bool` |  |
| `founded` | `float` |  |
| `gender` | `string` |  |
| `guide` | `array` | The 10ML guide comparing this perfume with its alternatives |
| `guides` | `array` |  |
| `house` | `array` |  |
| `house_info` | `array` |  |
| `id` | `string` | Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes |
| `key_notes` | `array` | The defining notes (empty when no pyramid is published) |
| `known_for` | `array` |  |
| `links` | `array` | 1-3 relevant 10ml.com links |
| `longevity` | `float` | 1 (short) to 5 (very long) |
| `message` | `string` | Guidance when the result is empty, partial or needs a follow-up tool |
| `name` | `string` |  |
| `next_cursor` | `string` | Pass as cursor to get the next page; absent on the last page |
| `note` | `array` |  |
| `occasions` | `array` |  |
| `original` | `array` |  |
| `other_matches` | `array` | Other originals the query could also mean |
| `other_versions` | `array` | Ids of other concentrations or flankers of the same perfume in the index |
| `perfume` | `array` |  |
| `perfumers` | `array` |  |
| `perfumes_in_index` | `float` |  |
| `profile` | `string` |  |
| `projection` | `float` | 1 (skin scent) to 5 (fills a room) |
| `pyramid` | `array` |  |
| `seasons` | `array` |  |
| `shared_accords` | `array` |  |
| `shared_notes` | `array` |  |
| `signature_perfumes` | `array` |  |
| `similar` | `array` |  |
| `source` | `string` |  |
| `styles` | `array` |  |
| `suggestions` | `array` |  |
| `title` | `string` |  |
| `topics` | `array` |  |
| `total` | `float` | How many results matched in all |
| `translated` | `bool` | False when the guide is only available in English (the url is then the English page) |
| `type` | `string` |  |
| `url` | `string` |  |
| `why` | `string` |  |
| `year` | `float` | Launch year when known |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the N10MlFragranceIndex record (throws on error).
$n10_ml_fragrance_index = $client->N10MlFragranceIndex()->load(["id" => "n10_ml_fragrance_index_id"]);
```

#### Example: List

```php
// list() returns an array of N10MlFragranceIndex entities, one per record (throws on error).
$n10_ml_fragrance_indexs = $client->N10MlFragranceIndex()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── n10mlfragranceindex_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`n10mlfragranceindex_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$n10mlfragranceindex = $client->N10MlFragranceIndex();
$n10mlfragranceindex->list();

// $n10mlfragranceindex->data_get() now returns the n10mlfragranceindex data from the last list
// $n10mlfragranceindex->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
