<?php
declare(strict_types=1);

// N10mlFragranceIndex SDK base feature

class N10mlFragranceIndexBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(N10mlFragranceIndexContext $ctx, array $options): void {}
    public function PostConstruct(N10mlFragranceIndexContext $ctx): void {}
    public function PostConstructEntity(N10mlFragranceIndexContext $ctx): void {}
    public function SetData(N10mlFragranceIndexContext $ctx): void {}
    public function GetData(N10mlFragranceIndexContext $ctx): void {}
    public function GetMatch(N10mlFragranceIndexContext $ctx): void {}
    public function SetMatch(N10mlFragranceIndexContext $ctx): void {}
    public function PrePoint(N10mlFragranceIndexContext $ctx): void {}
    public function PreSpec(N10mlFragranceIndexContext $ctx): void {}
    public function PreRequest(N10mlFragranceIndexContext $ctx): void {}
    public function PreResponse(N10mlFragranceIndexContext $ctx): void {}
    public function PreResult(N10mlFragranceIndexContext $ctx): void {}
    public function PreDone(N10mlFragranceIndexContext $ctx): void {}
    public function PreUnexpected(N10mlFragranceIndexContext $ctx): void {}
}
