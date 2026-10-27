# N10mlFragranceIndex SDK exists test

import pytest
from n10mlfragranceindex_sdk import N10mlFragranceIndexSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = N10mlFragranceIndexSDK.test(None, None)
        assert testsdk is not None
