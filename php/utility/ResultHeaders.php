<?php
declare(strict_types=1);

// N10mlFragranceIndex SDK utility: result_headers

class N10mlFragranceIndexResultHeaders
{
    public static function call(N10mlFragranceIndexContext $ctx): ?N10mlFragranceIndexResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
