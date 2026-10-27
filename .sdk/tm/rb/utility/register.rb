# N10mlFragranceIndex SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

N10mlFragranceIndexUtility.registrar = ->(u) {
  u.clean = N10mlFragranceIndexUtilities::Clean
  u.clean_add = N10mlFragranceIndexUtilities::CleanAdd
  u.clean_explain = N10mlFragranceIndexUtilities::CleanExplain
  u.done = N10mlFragranceIndexUtilities::Done
  u.make_error = N10mlFragranceIndexUtilities::MakeError
  u.feature_add = N10mlFragranceIndexUtilities::FeatureAdd
  u.feature_hook = N10mlFragranceIndexUtilities::FeatureHook
  u.feature_init = N10mlFragranceIndexUtilities::FeatureInit
  u.fetcher = N10mlFragranceIndexUtilities::Fetcher
  u.make_fetch_def = N10mlFragranceIndexUtilities::MakeFetchDef
  u.make_context = N10mlFragranceIndexUtilities::MakeContext
  u.make_options = N10mlFragranceIndexUtilities::MakeOptions
  u.make_request = N10mlFragranceIndexUtilities::MakeRequest
  u.make_response = N10mlFragranceIndexUtilities::MakeResponse
  u.make_result = N10mlFragranceIndexUtilities::MakeResult
  u.make_point = N10mlFragranceIndexUtilities::MakePoint
  u.make_spec = N10mlFragranceIndexUtilities::MakeSpec
  u.make_url = N10mlFragranceIndexUtilities::MakeUrl
  u.param = N10mlFragranceIndexUtilities::Param
  u.prepare_auth = N10mlFragranceIndexUtilities::PrepareAuth
  u.prepare_body = N10mlFragranceIndexUtilities::PrepareBody
  u.prepare_headers = N10mlFragranceIndexUtilities::PrepareHeaders
  u.prepare_method = N10mlFragranceIndexUtilities::PrepareMethod
  u.prepare_params = N10mlFragranceIndexUtilities::PrepareParams
  u.prepare_path = N10mlFragranceIndexUtilities::PreparePath
  u.prepare_query = N10mlFragranceIndexUtilities::PrepareQuery
  u.graphql_body = N10mlFragranceIndexUtilities::GraphqlBody
  u.graphql_errors = N10mlFragranceIndexUtilities::GraphqlErrors
  u.result_basic = N10mlFragranceIndexUtilities::ResultBasic
  u.result_body = N10mlFragranceIndexUtilities::ResultBody
  u.result_headers = N10mlFragranceIndexUtilities::ResultHeaders
  u.transform_request = N10mlFragranceIndexUtilities::TransformRequest
  u.transform_response = N10mlFragranceIndexUtilities::TransformResponse
}
