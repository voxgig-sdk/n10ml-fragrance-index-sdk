<?php
declare(strict_types=1);

// N10mlFragranceIndex SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class N10mlFragranceIndexMakeContext
{
    public static function call(array $ctxmap, ?N10mlFragranceIndexContext $basectx): N10mlFragranceIndexContext
    {
        return new N10mlFragranceIndexContext($ctxmap, $basectx);
    }
}
