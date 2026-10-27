# N10mlFragranceIndex SDK utility: make_context
require_relative '../core/context'
module N10mlFragranceIndexUtilities
  MakeContext = ->(ctxmap, basectx) {
    N10mlFragranceIndexContext.new(ctxmap, basectx)
  }
end
