-- N10mlFragranceIndex SDK error

local json = require("dkjson")

local N10mlFragranceIndexError = {}
N10mlFragranceIndexError.__index = N10mlFragranceIndexError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function N10mlFragranceIndexError.new(code, msg, ctx)
  local self = setmetatable({}, N10mlFragranceIndexError)
  self.is_sdk_error = true
  self.sdk = "N10mlFragranceIndex"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function N10mlFragranceIndexError:context()
  return CONTEXT[self]
end


function N10mlFragranceIndexError:error()
  return self.msg
end


function N10mlFragranceIndexError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function N10mlFragranceIndexError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function N10mlFragranceIndexError:to_json()
  return json.encode(self:to_table())
end


function N10mlFragranceIndexError:__tostring()
  return self.msg
end


function N10mlFragranceIndexError.__tojson(self)
  return self:to_json()
end


return N10mlFragranceIndexError
