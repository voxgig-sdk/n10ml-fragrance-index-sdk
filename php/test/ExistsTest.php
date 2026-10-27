<?php
declare(strict_types=1);

// N10mlFragranceIndex SDK exists test

require_once __DIR__ . '/../n10mlfragranceindex_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = N10mlFragranceIndexSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
