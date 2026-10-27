<?php
declare(strict_types=1);

// N10mlFragranceIndex SDK utility: prepare_path

class N10mlFragranceIndexPreparePath
{
    public static function call(N10mlFragranceIndexContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
