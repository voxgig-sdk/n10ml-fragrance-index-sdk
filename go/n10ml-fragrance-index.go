package voxgign10mlfragranceindexsdk

import (
	"github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go/core"
	"github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go/entity"
	"github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go/feature"
	_ "github.com/voxgig-sdk/n10ml-fragrance-index-sdk/go/utility"
)

// Type aliases preserve external API.
type N10mlFragranceIndexSDK = core.N10mlFragranceIndexSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type N10mlFragranceIndexEntity = core.N10mlFragranceIndexEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type N10mlFragranceIndexError = core.N10mlFragranceIndexError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewN10MlFragranceIndexEntityFunc = func(client *core.N10mlFragranceIndexSDK, entopts map[string]any) core.N10mlFragranceIndexEntity {
		return entity.NewN10MlFragranceIndexEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewN10mlFragranceIndexSDK = core.NewN10mlFragranceIndexSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewN10mlFragranceIndexSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *N10mlFragranceIndexSDK  { return NewN10mlFragranceIndexSDK(nil) }
func Test() *N10mlFragranceIndexSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
