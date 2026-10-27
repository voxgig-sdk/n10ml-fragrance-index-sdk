# N10MlFragranceIndex entity test

require "minitest/autorun"
require "json"
require_relative "../N10mlFragranceIndex_sdk"
require_relative "runner"

class N10MlFragranceIndexEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = N10mlFragranceIndexSDK.test(nil, nil)
    ent = testsdk.N10MlFragranceIndex(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "n10_ml_fragrance_index" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = N10mlFragranceIndexSDK.test(seed, nil).N10MlFragranceIndex(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "n10_ml_fragrance_index" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = N10mlFragranceIndexSDK.test(seed, nil)
    seen = base.N10MlFragranceIndex(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = N10mlFragranceIndexConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = N10mlFragranceIndexSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.N10MlFragranceIndex(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < N10mlFragranceIndexBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "n10_ml_fragrance_index hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      N10mlFragranceIndexSDK.test(offline, nil).N10MlFragranceIndex(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    N10mlFragranceIndexSDK.test(offline, nil).N10MlFragranceIndex(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = N10mlFragranceIndexConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = N10mlFragranceIndexSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.N10MlFragranceIndex(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    N10mlFragranceIndexSDK.test(nil, nil).N10MlFragranceIndex(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = N10mlFragranceIndexSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.N10MlFragranceIndex(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.N10MlFragranceIndex(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = N10mlFragranceIndexConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = N10mlFragranceIndexSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.N10MlFragranceIndex(nil).list({ "closeness" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = n10_ml_fragrance_index_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "n10_ml_fragrance_index." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "n10_ml_fragrance_index") do
        client.N10MlFragranceIndex(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    n10_ml_fragrance_index_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.n10_ml_fragrance_index")))
    n10_ml_fragrance_index_ref01_data = nil
    if n10_ml_fragrance_index_ref01_data_raw.length > 0
      n10_ml_fragrance_index_ref01_data = Helpers.to_map(n10_ml_fragrance_index_ref01_data_raw[0][1])
    end

    # LIST
    n10_ml_fragrance_index_ref01_ent = client.N10MlFragranceIndex(nil)
    n10_ml_fragrance_index_ref01_match = {}

    n10_ml_fragrance_index_ref01_list_result = n10_ml_fragrance_index_ref01_ent.list(n10_ml_fragrance_index_ref01_match, nil)
    assert n10_ml_fragrance_index_ref01_list_result.is_a?(Array)

    # LOAD
    n10_ml_fragrance_index_ref01_match_dt0 = {
      "id" => n10_ml_fragrance_index_ref01_data["id"],
    }
    n10_ml_fragrance_index_ref01_data_dt0_loaded = n10_ml_fragrance_index_ref01_ent.load(n10_ml_fragrance_index_ref01_match_dt0, nil)
    n10_ml_fragrance_index_ref01_data_dt0_load_result = Helpers.to_map(n10_ml_fragrance_index_ref01_data_dt0_loaded.respond_to?(:data_get) ? n10_ml_fragrance_index_ref01_data_dt0_loaded.data_get : n10_ml_fragrance_index_ref01_data_dt0_loaded)
    assert !n10_ml_fragrance_index_ref01_data_dt0_load_result.nil?
    assert_equal n10_ml_fragrance_index_ref01_data_dt0_load_result["id"], n10_ml_fragrance_index_ref01_data["id"]

  end
end

def n10_ml_fragrance_index_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "n10_ml_fragrance_index", "N10MlFragranceIndexTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = N10mlFragranceIndexSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["n10_ml_fragrance_index01", "n10_ml_fragrance_index02", "n10_ml_fragrance_index03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["N10ML_FRAGRANCE_INDEX_TEST_N10_ML_FRAGRANCE_INDEX_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "N10ML_FRAGRANCE_INDEX_TEST_N10_ML_FRAGRANCE_INDEX_ENTID" => idmap,
    "N10ML_FRAGRANCE_INDEX_TEST_LIVE" => "FALSE",
    "N10ML_FRAGRANCE_INDEX_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["N10ML_FRAGRANCE_INDEX_TEST_N10_ML_FRAGRANCE_INDEX_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["N10ML_FRAGRANCE_INDEX_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = N10mlFragranceIndexSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["N10ML_FRAGRANCE_INDEX_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["N10ML_FRAGRANCE_INDEX_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
