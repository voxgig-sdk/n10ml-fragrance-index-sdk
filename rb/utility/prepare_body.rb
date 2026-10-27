# N10mlFragranceIndex SDK utility: prepare_body
require_relative 'media'
module N10mlFragranceIndexUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return N10mlFragranceIndexUtilities.raw_body(ctx.reqdata) if N10mlFragranceIndexUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
