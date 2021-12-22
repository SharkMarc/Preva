<?php
namespace Preva\Metric;

class Diagnostics
{
    public int $diameterLoopCount = 0;

    // seconds
    public float $diameterRuntime = 0;

    public int $pathBuildingLoopCount = 0;

    // seconds
    public float $pathBuildingRuntime = 0;
}
