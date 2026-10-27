# N10mlFragranceIndex SDK feature factory

from n10mlfragranceindex_sdk.feature.base_feature import N10mlFragranceIndexBaseFeature
from n10mlfragranceindex_sdk.feature.ratelimit_feature import N10mlFragranceIndexRatelimitFeature
from n10mlfragranceindex_sdk.feature.retry_feature import N10mlFragranceIndexRetryFeature
from n10mlfragranceindex_sdk.feature.test_feature import N10mlFragranceIndexTestFeature
from n10mlfragranceindex_sdk.feature.timeout_feature import N10mlFragranceIndexTimeoutFeature


_FEATURES = {
    "base": lambda: N10mlFragranceIndexBaseFeature(),
    "ratelimit": lambda: N10mlFragranceIndexRatelimitFeature(),
    "retry": lambda: N10mlFragranceIndexRetryFeature(),
    "test": lambda: N10mlFragranceIndexTestFeature(),
    "timeout": lambda: N10mlFragranceIndexTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
