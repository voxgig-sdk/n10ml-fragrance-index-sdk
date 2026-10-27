# N10mlFragranceIndex SDK exists test

require "minitest/autorun"
require_relative "../N10mlFragranceIndex_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = N10mlFragranceIndexSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
