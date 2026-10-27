# N10mlFragranceIndex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module N10mlFragranceIndexFeatures
  def self.make_feature(name)
    case name
    when "base"
      N10mlFragranceIndexBaseFeature.new
    when "ratelimit"
      N10mlFragranceIndexRatelimitFeature.new
    when "retry"
      N10mlFragranceIndexRetryFeature.new
    when "test"
      N10mlFragranceIndexTestFeature.new
    when "timeout"
      N10mlFragranceIndexTimeoutFeature.new
    else
      N10mlFragranceIndexBaseFeature.new
    end
  end
end
