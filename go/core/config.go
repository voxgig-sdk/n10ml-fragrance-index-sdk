package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "N10mlFragranceIndex",
			"slug": "n10ml-fragrance-index",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://mcp.10ml.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"n10_ml_fragrance_index": map[string]any{},
			},
		},
		"entity": map[string]any{
			"n10_ml_fragrance_index": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accords",
						"title": "Accords",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Main accords, strongest first",
					},
					map[string]any{
						"name": "alternatives",
						"title": "Alternatives",
						"type": "`$ARRAY`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "character",
						"title": "Character",
						"type": "`$STRING`",
						"req": true,
						"short": "One-sentence description by 10ML's fragrance editors",
					},
					map[string]any{
						"name": "closeness",
						"title": "Closeness",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "concentration",
						"title": "Concentration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exact",
						"title": "Exact",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "False when this is a closest-match guess",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
						"req": true,
						"short": "Fragrance family, e.g.",
					},
					map[string]any{
						"name": "famous_perfumes",
						"title": "Famous Perfumes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "found",
						"title": "Found",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "founded",
						"title": "Founded",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "gender",
						"title": "Gender",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "guide",
						"title": "Guide",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The 10ML guide comparing this perfume with its alternatives",
					},
					map[string]any{
						"name": "guides",
						"title": "Guides",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "house",
						"title": "House",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "house_info",
						"title": "House Info",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes",
					},
					map[string]any{
						"name": "key_notes",
						"title": "Key Notes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The defining notes (empty when no pyramid is published)",
					},
					map[string]any{
						"name": "known_for",
						"title": "Known For",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$ARRAY`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
						"short": "1-3 relevant 10ml.com links",
					},
					map[string]any{
						"name": "longevity",
						"title": "Longevity",
						"type": "`$NUMBER`",
						"short": "1 (short) to 5 (very long)",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"short": "Guidance when the result is empty, partial or needs a follow-up tool",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "next_cursor",
						"title": "Next Cursor",
						"type": "`$STRING`",
						"short": "Pass as cursor to get the next page; absent on the last page",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "occasions",
						"title": "Occasions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "original",
						"title": "Original",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "other_matches",
						"title": "Other Matches",
						"type": "`$ARRAY`",
						"short": "Other originals the query could also mean",
					},
					map[string]any{
						"name": "other_versions",
						"title": "Other Versions",
						"type": "`$ARRAY`",
						"short": "Ids of other concentrations or flankers of the same perfume in the index",
					},
					map[string]any{
						"name": "perfume",
						"title": "Perfume",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "perfumers",
						"title": "Perfumers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "perfumes_in_index",
						"title": "Perfumes In Index",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "profile",
						"title": "Profile",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "projection",
						"title": "Projection",
						"type": "`$NUMBER`",
						"short": "1 (skin scent) to 5 (fills a room)",
					},
					map[string]any{
						"name": "pyramid",
						"title": "Pyramid",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "seasons",
						"title": "Seasons",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "shared_accords",
						"title": "Shared Accords",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "shared_notes",
						"title": "Shared Notes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "signature_perfumes",
						"title": "Signature Perfumes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "similar",
						"title": "Similar",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "styles",
						"title": "Styles",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "suggestions",
						"title": "Suggestions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "topics",
						"title": "Topics",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$NUMBER`",
						"req": true,
						"short": "How many results matched in all",
					},
					map[string]any{
						"name": "translated",
						"title": "Translated",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "False when the guide is only available in English (the url is then the English page)",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "why",
						"title": "Why",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$NUMBER`",
						"short": "Launch year when known",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "n10_ml_fragrance_index",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/alternatives",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "alternatives",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"alternatives",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "closeness",
											"orig": "closeness",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "house",
											"orig": "house",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 6,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "perfume",
											"orig": "perfume",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/guides",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "guides",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"guides",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.guides`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 8,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/houses",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "houses",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"houses",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.houses`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/perfumes",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "perfumes",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"perfumes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "accord",
											"orig": "accords",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "family",
											"orig": "family",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "concise",
										},
										map[string]any{
											"name": "gender",
											"orig": "gender",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "house",
											"orig": "house",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "iconic",
											"orig": "iconic",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 8,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "notes_exclude",
											"orig": "notes_exclude",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "notes_include",
											"orig": "notes_include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "occasion",
											"orig": "occasion",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "style",
											"orig": "style",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/similar",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "similar",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"similar",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "accord",
											"orig": "accords",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "concise",
										},
										map[string]any{
											"name": "gender",
											"orig": "gender",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "house",
											"orig": "house",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 8,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "note",
											"orig": "notes",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "other_houses_only",
											"orig": "other_houses_only",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "perfume",
											"orig": "perfume",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "steer",
											"orig": "steer",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/houses/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "houses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"houses",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "concise",
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/notes/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "notes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"notes",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "concise",
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/perfumes/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "perfumes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"perfumes",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "concise",
										},
										map[string]any{
											"name": "house",
											"orig": "house",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
