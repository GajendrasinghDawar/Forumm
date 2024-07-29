<?php

use App\Utils\Trending;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Artisan::command('reset_cache_Key', function (Trending $trending) {
    $this->info($trending->reset() . "!");
})->purpose('Display an test command...')->hourly();