package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewN10MlFragranceIndexEntityFunc func(client *N10mlFragranceIndexSDK, entopts map[string]any) N10mlFragranceIndexEntity

