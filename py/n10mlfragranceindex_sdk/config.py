# N10mlFragranceIndex SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "N10mlFragranceIndex",
            "slug": "n10ml-fragrance-index",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://mcp.10ml.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "n10_ml_fragrance_index": {},
            },
        },
        "entity": {
      "n10_ml_fragrance_index": {
        "fields": [
          {
            "name": "accords",
            "title": "Accords",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Main accords, strongest first",
          },
          {
            "name": "alternatives",
            "title": "Alternatives",
            "type": "`$ARRAY`",
            "op": {
              "list": {
                "req": True,
                "type": "`$ARRAY`",
              },
            },
          },
          {
            "name": "character",
            "title": "Character",
            "type": "`$STRING`",
            "req": True,
            "short": "One-sentence description by 10ML's fragrance editors",
          },
          {
            "name": "closeness",
            "title": "Closeness",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "concentration",
            "title": "Concentration",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
          },
          {
            "name": "exact",
            "title": "Exact",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "False when this is a closest-match guess",
          },
          {
            "name": "family",
            "title": "Family",
            "type": "`$STRING`",
            "req": True,
            "short": "Fragrance family, e.g.",
          },
          {
            "name": "famous_perfumes",
            "title": "Famous Perfumes",
            "type": "`$ARRAY`",
          },
          {
            "name": "found",
            "title": "Found",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "founded",
            "title": "Founded",
            "type": "`$NUMBER`",
          },
          {
            "name": "gender",
            "title": "Gender",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "guide",
            "title": "Guide",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The 10ML guide comparing this perfume with its alternatives",
          },
          {
            "name": "guides",
            "title": "Guides",
            "type": "`$ARRAY`",
          },
          {
            "name": "house",
            "title": "House",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "house_info",
            "title": "House Info",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes",
          },
          {
            "name": "key_notes",
            "title": "Key Notes",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The defining notes (empty when no pyramid is published)",
          },
          {
            "name": "known_for",
            "title": "Known For",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$ARRAY`",
            "op": {
              "list": {
                "req": True,
                "type": "`$ARRAY`",
              },
            },
            "short": "1-3 relevant 10ml.com links",
          },
          {
            "name": "longevity",
            "title": "Longevity",
            "type": "`$NUMBER`",
            "short": "1 (short) to 5 (very long)",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "Guidance when the result is empty, partial or needs a follow-up tool",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "next_cursor",
            "title": "Next Cursor",
            "type": "`$STRING`",
            "short": "Pass as cursor to get the next page; absent on the last page",
          },
          {
            "name": "note",
            "title": "Note",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "occasions",
            "title": "Occasions",
            "type": "`$ARRAY`",
          },
          {
            "name": "original",
            "title": "Original",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "other_matches",
            "title": "Other Matches",
            "type": "`$ARRAY`",
            "short": "Other originals the query could also mean",
          },
          {
            "name": "other_versions",
            "title": "Other Versions",
            "type": "`$ARRAY`",
            "short": "Ids of other concentrations or flankers of the same perfume in the index",
          },
          {
            "name": "perfume",
            "title": "Perfume",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "perfumers",
            "title": "Perfumers",
            "type": "`$ARRAY`",
          },
          {
            "name": "perfumes_in_index",
            "title": "Perfumes In Index",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "profile",
            "title": "Profile",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "projection",
            "title": "Projection",
            "type": "`$NUMBER`",
            "short": "1 (skin scent) to 5 (fills a room)",
          },
          {
            "name": "pyramid",
            "title": "Pyramid",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "seasons",
            "title": "Seasons",
            "type": "`$ARRAY`",
          },
          {
            "name": "shared_accords",
            "title": "Shared Accords",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "shared_notes",
            "title": "Shared Notes",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "signature_perfumes",
            "title": "Signature Perfumes",
            "type": "`$ARRAY`",
          },
          {
            "name": "similar",
            "title": "Similar",
            "type": "`$ARRAY`",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "styles",
            "title": "Styles",
            "type": "`$ARRAY`",
          },
          {
            "name": "suggestions",
            "title": "Suggestions",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "topics",
            "title": "Topics",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "total",
            "title": "Total",
            "type": "`$NUMBER`",
            "req": True,
            "short": "How many results matched in all",
          },
          {
            "name": "translated",
            "title": "Translated",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "False when the guide is only available in English (the url is then the English page)",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
          },
          {
            "name": "why",
            "title": "Why",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$NUMBER`",
            "short": "Launch year when known",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "n10_ml_fragrance_index",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/alternatives",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "alternatives",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "alternatives",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "closeness",
                      "orig": "closeness",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "house",
                      "orig": "house",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 6,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "perfume",
                      "orig": "perfume",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/guides",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "guides",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "guides",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.guides`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 8,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/houses",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "houses",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "houses",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.houses`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/perfumes",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "perfumes",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "perfumes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "query": [
                    {
                      "name": "accord",
                      "orig": "accords",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "family",
                      "orig": "family",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "concise",
                    },
                    {
                      "name": "gender",
                      "orig": "gender",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "house",
                      "orig": "house",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "iconic",
                      "orig": "iconic",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 8,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "notes_exclude",
                      "orig": "notes_exclude",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "notes_include",
                      "orig": "notes_include",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "occasion",
                      "orig": "occasion",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "season",
                      "orig": "season",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "style",
                      "orig": "style",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/similar",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "similar",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "similar",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "query": [
                    {
                      "name": "accord",
                      "orig": "accords",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "concise",
                    },
                    {
                      "name": "gender",
                      "orig": "gender",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "house",
                      "orig": "house",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 8,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "note",
                      "orig": "notes",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "other_houses_only",
                      "orig": "other_houses_only",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "perfume",
                      "orig": "perfume",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "steer",
                      "orig": "steer",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/houses/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "houses",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "houses",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "concise",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/notes/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "notes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "notes",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "concise",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/perfumes/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "perfumes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "perfumes",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "concise",
                    },
                    {
                      "name": "house",
                      "orig": "house",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
