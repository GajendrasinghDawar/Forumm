<?php

namespace App\Traits;

use Illuminate\Support\Facades\Redis;

trait RecordsVisits
{
    public function recordVisit()
    {
        Redis::incr($this->visitedCacheKey());

        return $this;
    }

    public function visits()
    {
        return Redis::get($this->visitedCacheKey()) ?? 0;
    }

    public function resetVisit()
    {
        Redis::del($this->visitedCacheKey());

        return $this;
    }

    public function visitedCacheKey()
    {
        return "threads.{$this->id}.visits";
    }
}
