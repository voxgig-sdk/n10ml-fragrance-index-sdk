

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { N10mlFragranceIndexSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('N10MlFragranceIndexEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N10ML_FRAGRANCE_INDEX_TEST_LIVE=TRUE.
  afterEach(liveDelay('N10ML_FRAGRANCE_INDEX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N10mlFragranceIndexSDK.test()
    const ent = testsdk.N10MlFragranceIndex()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('n10_ml_fragrance_index hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of N10mlFragranceIndexSDK.test(offline).N10MlFragranceIndex().stream('list')) { }
    }, /offline/)

    for await (const _item of N10mlFragranceIndexSDK.test(offline).N10MlFragranceIndex()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = N10mlFragranceIndexSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.N10MlFragranceIndex().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of N10mlFragranceIndexSDK.test().N10MlFragranceIndex().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new N10mlFragranceIndexSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.N10MlFragranceIndex().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.N10MlFragranceIndex().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = N10mlFragranceIndexSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.N10MlFragranceIndex().list({"closeness":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N10ML_FRAGRANCE_INDEX_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'n10_ml_fragrance_index.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accords":{"a":true,"h":"Accords","n":"accords","r":true,"sh":"Main accords, strongest first","t":"`$ARRAY`","key$":"accords","index$":0},"alternatives":{"a":true,"h":"Alternatives","n":"alternatives","op":{"list":{"req":true,"type":"`$ARRAY`"}},"r":false,"t":"`$ARRAY`","key$":"alternatives","index$":1},"character":{"a":true,"h":"Character","n":"character","r":true,"sh":"One-sentence description by 10ML's fragrance editors","t":"`$STRING`","key$":"character","index$":2},"closeness":{"a":true,"h":"Closeness","n":"closeness","r":true,"t":"`$STRING`","key$":"closeness","index$":3},"concentration":{"a":true,"h":"Concentration","n":"concentration","r":false,"t":"`$STRING`","key$":"concentration","index$":4},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":5},"exact":{"a":true,"h":"Exact","n":"exact","r":true,"sh":"False when this is a closest-match guess","t":"`$BOOLEAN`","key$":"exact","index$":6},"family":{"a":true,"h":"Family","n":"family","r":true,"sh":"Fragrance family, e.g.","t":"`$STRING`","key$":"family","index$":7},"famous_perfumes":{"a":true,"h":"Famous Perfumes","n":"famous_perfumes","r":false,"t":"`$ARRAY`","key$":"famous_perfumes","index$":8},"found":{"a":true,"h":"Found","n":"found","r":true,"t":"`$BOOLEAN`","key$":"found","index$":9},"founded":{"a":true,"h":"Founded","n":"founded","r":false,"t":"`$NUMBER`","key$":"founded","index$":10},"gender":{"a":true,"h":"Gender","n":"gender","r":true,"t":"`$STRING`","key$":"gender","index$":11},"guide":{"a":true,"h":"Guide","n":"guide","r":true,"sh":"The 10ML guide comparing this perfume with its alternatives","t":"`$OBJECT`","key$":"guide","index$":12},"guides":{"a":true,"h":"Guides","n":"guides","r":false,"t":"`$ARRAY`","key$":"guides","index$":13},"house":{"a":true,"h":"House","n":"house","r":true,"t":"`$OBJECT`","key$":"house","index$":14},"house_info":{"a":true,"h":"House Info","n":"house_info","r":true,"t":"`$OBJECT`","key$":"house_info","index$":15},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Stable Fragrance Index id, usable with get_perfume and find_similar_perfumes","t":"`$STRING`","key$":"id","index$":16},"key_notes":{"a":true,"h":"Key Notes","n":"key_notes","r":true,"sh":"The defining notes (empty when no pyramid is published)","t":"`$ARRAY`","key$":"key_notes","index$":17},"known_for":{"a":true,"h":"Known For","n":"known_for","r":true,"t":"`$ARRAY`","key$":"known_for","index$":18},"links":{"a":true,"h":"Links","n":"links","op":{"list":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"1-3 relevant 10ml.com links","t":"`$ARRAY`","key$":"links","index$":19},"longevity":{"a":true,"h":"Longevity","n":"longevity","r":false,"sh":"1 (short) to 5 (very long)","t":"`$NUMBER`","key$":"longevity","index$":20},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"Guidance when the result is empty, partial or needs a follow-up tool","t":"`$STRING`","key$":"message","index$":21},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":22},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":false,"sh":"Pass as cursor to get the next page; absent on the last page","t":"`$STRING`","key$":"next_cursor","index$":23},"note":{"a":true,"h":"Note","n":"note","r":true,"t":"`$OBJECT`","key$":"note","index$":24},"occasions":{"a":true,"h":"Occasions","n":"occasions","r":false,"t":"`$ARRAY`","key$":"occasions","index$":25},"original":{"a":true,"h":"Original","n":"original","r":true,"t":"`$OBJECT`","key$":"original","index$":26},"other_matches":{"a":true,"h":"Other Matches","n":"other_matches","r":false,"sh":"Other originals the query could also mean","t":"`$ARRAY`","key$":"other_matches","index$":27},"other_versions":{"a":true,"h":"Other Versions","n":"other_versions","r":false,"sh":"Ids of other concentrations or flankers of the same perfume in the index","t":"`$ARRAY`","key$":"other_versions","index$":28},"perfume":{"a":true,"h":"Perfume","n":"perfume","r":true,"t":"`$OBJECT`","key$":"perfume","index$":29},"perfumers":{"a":true,"h":"Perfumers","n":"perfumers","r":false,"t":"`$ARRAY`","key$":"perfumers","index$":30},"perfumes_in_index":{"a":true,"h":"Perfumes In Index","n":"perfumes_in_index","r":true,"t":"`$NUMBER`","key$":"perfumes_in_index","index$":31},"profile":{"a":true,"h":"Profile","n":"profile","r":true,"t":"`$STRING`","key$":"profile","index$":32},"projection":{"a":true,"h":"Projection","n":"projection","r":false,"sh":"1 (skin scent) to 5 (fills a room)","t":"`$NUMBER`","key$":"projection","index$":33},"pyramid":{"a":true,"h":"Pyramid","n":"pyramid","r":true,"t":"`$OBJECT`","key$":"pyramid","index$":34},"seasons":{"a":true,"h":"Seasons","n":"seasons","r":false,"t":"`$ARRAY`","key$":"seasons","index$":35},"shared_accords":{"a":true,"h":"Shared Accords","n":"shared_accords","r":true,"t":"`$ARRAY`","key$":"shared_accords","index$":36},"shared_notes":{"a":true,"h":"Shared Notes","n":"shared_notes","r":true,"t":"`$ARRAY`","key$":"shared_notes","index$":37},"signature_perfumes":{"a":true,"h":"Signature Perfumes","n":"signature_perfumes","r":false,"t":"`$ARRAY`","key$":"signature_perfumes","index$":38},"similar":{"a":true,"h":"Similar","n":"similar","r":false,"t":"`$ARRAY`","key$":"similar","index$":39},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":40},"styles":{"a":true,"h":"Styles","n":"styles","r":false,"t":"`$ARRAY`","key$":"styles","index$":41},"suggestions":{"a":true,"h":"Suggestions","n":"suggestions","r":false,"t":"`$ARRAY`","key$":"suggestions","index$":42},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":43},"topics":{"a":true,"h":"Topics","n":"topics","r":true,"t":"`$ARRAY`","key$":"topics","index$":44},"total":{"a":true,"h":"Total","n":"total","r":true,"sh":"How many results matched in all","t":"`$NUMBER`","key$":"total","index$":45},"translated":{"a":true,"h":"Translated","n":"translated","r":true,"sh":"False when the guide is only available in English (the url is then the English page)","t":"`$BOOLEAN`","key$":"translated","index$":46},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":47},"url":{"a":true,"h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":48},"why":{"a":true,"h":"Why","n":"why","r":true,"t":"`$STRING`","key$":"why","index$":49},"year":{"a":true,"h":"Year","n":"year","r":false,"sh":"Launch year when known","t":"`$NUMBER`","key$":"year","index$":50}},"id":{"field":"id","name":"id"},"name":"n10_ml_fragrance_index","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/alternatives","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"closeness","or":"closeness","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"house","or":"house","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":6,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"perfume","or":"perfume","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/alternatives","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"alternatives"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/guides","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":8,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/guides","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"guides"}],"t":{"req":"`reqdata`","res":"`body.guides`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/houses","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/houses","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"houses"}],"t":{"req":"`reqdata`","res":"`body.houses`"},"index$":2},{"a":true,"co":{"id":"GET /api/v1/perfumes","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"accord","or":"accords","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"family","or":"family","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"concise","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"gender","or":"gender","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"house","or":"house","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"iconic","or":"iconic","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"ex":8,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"notes_exclude","or":"notes_exclude","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"notes_include","or":"notes_include","r":false,"t":"`$STRING`","index$":10},{"a":true,"k":"query","n":"occasion","or":"occasion","r":false,"t":"`$STRING`","index$":11},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":12},{"a":true,"k":"query","n":"season","or":"season","r":false,"t":"`$STRING`","index$":13},{"a":true,"k":"query","n":"style","or":"style","r":false,"t":"`$STRING`","index$":14}]},"k":"http","m":"GET","o":"/api/v1/perfumes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"perfumes"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":3},{"a":true,"co":{"id":"GET /api/v1/similar","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"accord","or":"accords","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"concise","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"gender","or":"gender","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"house","or":"house","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":8,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"note","or":"notes","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":false,"k":"query","n":"other_houses_only","or":"other_houses_only","r":false,"t":"`$BOOLEAN`","index$":8},{"a":true,"k":"query","n":"perfume","or":"perfume","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"steer","or":"steer","r":false,"t":"`$STRING`","index$":10}]},"k":"http","m":"GET","o":"/api/v1/similar","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"similar"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":4}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/houses/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"concise","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/houses/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"houses"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/notes/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"concise","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/notes/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"notes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/perfumes/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"concise","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"house","or":"house","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/perfumes/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"perfumes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"n10_ml_fragrance_index","name__orig":"n10_ml_fragrance_index","Name":"N10MlFragranceIndex","name_":"n10_ml_fragrance_index","name-":"n10-ml-fragrance-index","NAME":"N10_ML_FRAGRANCE_INDEX","index$":0}, {"active":true,"entity":"n10_ml_fragrance_index","key$":"BasicN10MlFragranceIndexFlow","kind":"basic","name":"BasicN10MlFragranceIndexFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"n10_ml_fragrance_index_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"n10_ml_fragrance_index_ref01","srcdatavar":"n10_ml_fragrance_index_ref01_data","suffix":"_dt0"},"m":{"id":"n10_ml_fragrance_index01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-n10_ml_fragrance_index_ref01"}}],"index$":1,"route":"GET /api/v1/houses/{id}","record":{}}]}, 'N10MlFragranceIndex', {"GET /api/v1/alternatives":{"protocol":"http","parameters":[{"name":"perfume","in":"query","required":false,"description":"The famous perfume to find alternatives for. Examples: \"Creed Aventus\", \"Baccarat Rouge 540\", \"Delina\"","schema":{"type":"string","maxLength":120},"index$":0},{"name":"house","in":"query","required":false,"description":"House of the original when the name is ambiguous, e.g. \"Parfums de Marly\"","schema":{"type":"string","maxLength":80},"index$":1},{"name":"closeness","in":"query","required":false,"description":"Only alternatives at this closeness","schema":{"type":"string","enum":["very close","similar vibe","same spirit"]},"index$":2},{"name":"limit","in":"query","required":false,"description":"Results per page.","schema":{"default":6,"type":"integer","minimum":1,"maximum":10},"index$":3},{"name":"cursor","in":"query","required":false,"description":"next_cursor from the previous page.","schema":{"type":"string","maxLength":64},"index$":4},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":5}]},"GET /api/v1/guides":{"protocol":"http","parameters":[{"name":"q","in":"query","required":false,"description":"What the guide is about. Examples: \"how to make perfume last\", \"oud\", \"Creed Aventus dupes\", \"gift\". Omit to browse.","schema":{"type":"string","maxLength":120},"index$":0},{"name":"type","in":"query","required":false,"description":"how-to, list (rankings/comparisons), alternatives (dupes guides), note (a note explained), house (a house mapped)","schema":{"type":"string","enum":["how-to","list","alternatives","note","house"]},"index$":1},{"name":"limit","in":"query","required":false,"description":"Results per page.","schema":{"default":8,"type":"integer","minimum":1,"maximum":20},"index$":2},{"name":"cursor","in":"query","required":false,"description":"next_cursor from the previous page.","schema":{"type":"string","maxLength":64},"index$":3},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":4}]},"GET /api/v1/houses":{"protocol":"http","parameters":[{"name":"type","in":"query","required":false,"description":"Only houses of this type","schema":{"type":"string","enum":["designer","niche","middle-eastern","indie","celebrity"]},"index$":0},{"name":"country","in":"query","required":false,"description":"Only houses from this country, e.g. \"France\", \"Italy\", \"United Arab Emirates\"","schema":{"type":"string","maxLength":40},"index$":1},{"name":"query","in":"query","required":false,"description":"Part of a house name, e.g. \"tom\" or \"maison\"","schema":{"type":"string","maxLength":60},"index$":2},{"name":"limit","in":"query","required":false,"description":"Results per page.","schema":{"default":20,"type":"integer","minimum":1,"maximum":50},"index$":3},{"name":"cursor","in":"query","required":false,"description":"next_cursor from the previous page.","schema":{"type":"string","maxLength":64},"index$":4},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":5}]},"GET /api/v1/perfumes":{"protocol":"http","parameters":[{"name":"q","in":"query","required":false,"description":"Free text: a perfume name, house, notes or mood. Examples: \"fresh citrus summer for men\", \"Tom Ford oud\", \"vanilla gourmand for winter\"","schema":{"type":"string","maxLength":200},"index$":0},{"name":"house","in":"query","required":false,"description":"Only perfumes from this house. Examples: \"Dior\", \"Maison Francis Kurkdjian\", \"MFK\", \"YSL\"","schema":{"type":"string","maxLength":80},"index$":1},{"name":"notes_include","in":"query","required":false,"description":"Every listed note must be present. Examples: [\"oud\",\"sandalwood\"], [\"vanilla\"] Comma-separated list.","schema":{"type":"string"},"index$":2},{"name":"notes_exclude","in":"query","required":false,"description":"None of these notes may be present. Example: [\"patchouli\"] Comma-separated list.","schema":{"type":"string"},"index$":3},{"name":"accords","in":"query","required":false,"description":"Accords that must be present. Examples: [\"woody\",\"sweet\"], [\"fresh\",\"aquatic\"] Comma-separated list.","schema":{"type":"string"},"index$":4},{"name":"family","in":"query","required":false,"description":"Fragrance family. Examples: \"chypre\", \"fougere\", \"gourmand\", \"amber\", \"citrus\". Leave term empty in explain_perfume_term to list every family.","schema":{"type":"string","maxLength":40},"index$":5},{"name":"gender","in":"query","required":false,"description":"Audience the perfume is marketed to. men and women also include unisex perfumes.","schema":{"type":"string","enum":["men","women","unisex"]},"index$":6},{"name":"season","in":"query","required":false,"description":"Season the perfume suits (fall is accepted in text queries as autumn).","schema":{"type":"string","enum":["spring","summer","autumn","winter"]},"index$":7},{"name":"occasion","in":"query","required":false,"description":"Occasion the perfume suits.","schema":{"type":"string","enum":["daytime","office","casual","evening","date night","special occasion"]},"index$":8},{"name":"style","in":"query","required":false,"description":"A style word the scent should have.","schema":{"type":"string","enum":["aquatic","boozy","clean","creamy","dark","floral","fresh","citrusy","fruity","gourmand","green","leathery","musky","powdery","sensual","smoky","spicy","sweet","woody"]},"index$":9},{"name":"iconic","in":"query","required":false,"description":"true = only the editors' iconic, era-defining classics (works with every other filter, and without a query)","schema":{"type":"boolean"},"index$":10},{"name":"limit","in":"query","required":false,"description":"Results per page.","schema":{"default":8,"type":"integer","minimum":1,"maximum":20},"index$":11},{"name":"cursor","in":"query","required":false,"description":"next_cursor from the previous page.","schema":{"type":"string","maxLength":64},"index$":12},{"name":"format","in":"query","required":false,"description":"concise (default) or detailed (adds pyramid, seasons, occasions, longevity).","schema":{"default":"concise","type":"string","enum":["concise","detailed"]},"index$":13},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":14}]},"GET /api/v1/similar":{"protocol":"http","parameters":[{"name":"perfume","in":"query","required":false,"description":"A perfume by name, optionally with its house, e.g. \"Baccarat Rouge 540\", \"Dior Sauvage\", \"Delina\". Or pass an id from another tool.","schema":{"type":"string","maxLength":120},"index$":0},{"name":"house","in":"query","required":false,"description":"House of the perfume when the name alone is ambiguous, e.g. \"Maison Francis Kurkdjian\"","schema":{"type":"string","maxLength":80},"index$":1},{"name":"notes","in":"query","required":false,"description":"Known notes of the starting perfume, for perfumes outside the index. Example: [\"jasmine\",\"saffron\",\"ambergris\",\"cedar\"] Comma-separated list.","schema":{"type":"string"},"index$":2},{"name":"accords","in":"query","required":false,"description":"Known accords of the starting perfume. Example: [\"amber\",\"woody\",\"sweet\"] Comma-separated list.","schema":{"type":"string"},"index$":3},{"name":"steer","in":"query","required":false,"description":"Move away from the starting point in one direction: fresher, sweeter, darker, lighter, longer_lasting (needs a perfume in the index) or more_projection (same).","schema":{"type":"string","enum":["fresher","sweeter","darker","lighter","longer_lasting","more_projection"]},"index$":4},{"name":"gender","in":"query","required":false,"description":"Only return perfumes for this audience (men and women include unisex)","schema":{"type":"string","enum":["men","women","unisex"]},"index$":5},{"name":"other_houses_only","in":"query","required":false,"description":"True to leave out perfumes from the same house as the starting perfume","schema":{"default":false,"type":"boolean"},"index$":6},{"name":"limit","in":"query","required":false,"description":"Results per page.","schema":{"default":8,"type":"integer","minimum":1,"maximum":15},"index$":7},{"name":"cursor","in":"query","required":false,"description":"next_cursor from the previous page.","schema":{"type":"string","maxLength":64},"index$":8},{"name":"format","in":"query","required":false,"description":"concise (default) or detailed (adds pyramid, seasons, occasions, longevity).","schema":{"default":"concise","type":"string","enum":["concise","detailed"]},"index$":9},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":10}]},"GET /api/v1/houses/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The house. Examples: \"Creed\", \"YSL\", \"Maison Francis Kurkdjian\", \"Parfums de Marly\"","schema":{"type":"string"},"index$":0},{"name":"format","in":"query","required":false,"description":"concise (default) or detailed (adds pyramid, seasons, occasions, longevity).","schema":{"default":"concise","type":"string","enum":["concise","detailed"]},"index$":1},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":2}]},"GET /api/v1/notes/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The note. Examples: \"ambroxan\", \"oud\", \"sandalwood\", \"Bergamotte\"","schema":{"type":"string"},"index$":0},{"name":"format","in":"query","required":false,"description":"concise (default) or detailed (adds pyramid, seasons, occasions, longevity).","schema":{"default":"concise","type":"string","enum":["concise","detailed"]},"index$":1},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":2}]},"GET /api/v1/perfumes/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"A perfume by name, optionally with its house, e.g. \"Baccarat Rouge 540\", \"Dior Sauvage\", \"Delina\". An id from another tool also works, e.g. \"creed-aventus\".","schema":{"type":"string"},"index$":0},{"name":"house","in":"query","required":false,"description":"House, when the name alone is ambiguous. Example: \"Creed\"","schema":{"type":"string","maxLength":80},"index$":1},{"name":"format","in":"query","required":false,"description":"concise (default) or detailed (adds pyramid, seasons, occasions, longevity).","schema":{"default":"concise","type":"string","enum":["concise","detailed"]},"index$":2},{"name":"locale","in":"query","required":false,"description":"Language of the 10ml.com links and labels.","schema":{"default":"en","type":"string","enum":["en","de","fr","es","it","ro","el","hu","cs","pl","nl","pt","sv","da","fi","bg","hr"]},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let n10_ml_fragrance_index_ref01_data = Object.values(setup.data.existing.n10_ml_fragrance_index)[0] as any

    // LIST
    const n10_ml_fragrance_index_ref01_ent = client.N10MlFragranceIndex()
    const n10_ml_fragrance_index_ref01_match: any = {}

    const n10_ml_fragrance_index_ref01_list = (await n10_ml_fragrance_index_ref01_ent.list(n10_ml_fragrance_index_ref01_match)).map((e: any) => e.data())


    // LOAD
    const n10_ml_fragrance_index_ref01_match_dt0: any = {}
    n10_ml_fragrance_index_ref01_match_dt0.id = n10_ml_fragrance_index_ref01_data.id
    const n10_ml_fragrance_index_ref01_data_dt0 = (await n10_ml_fragrance_index_ref01_ent.load(n10_ml_fragrance_index_ref01_match_dt0)).data()
    assert(n10_ml_fragrance_index_ref01_data_dt0.id === n10_ml_fragrance_index_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/n10_ml_fragrance_index/N10MlFragranceIndexTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = N10mlFragranceIndexSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['n10_ml_fragrance_index01','n10_ml_fragrance_index02','n10_ml_fragrance_index03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'N10ML_FRAGRANCE_INDEX_TEST_N10_ML_FRAGRANCE_INDEX_ENTID': idmap,
    'N10ML_FRAGRANCE_INDEX_TEST_LIVE': 'FALSE',
    'N10ML_FRAGRANCE_INDEX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['N10ML_FRAGRANCE_INDEX_TEST_N10_ML_FRAGRANCE_INDEX_ENTID']

  const live = 'TRUE' === env.N10ML_FRAGRANCE_INDEX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['N10ML_FRAGRANCE_INDEX_TEST_N10_ML_FRAGRANCE_INDEX_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new N10mlFragranceIndexSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.N10ML_FRAGRANCE_INDEX_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
