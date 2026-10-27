-- N10mlFragranceIndex SDK exists test

local sdk = require("n10ml-fragrance-index_sdk")

describe("N10mlFragranceIndexSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
