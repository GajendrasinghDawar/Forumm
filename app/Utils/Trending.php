<?php

namespace App\Utils;

use Illuminate\Support\Facades\Redis;

class Trending
{
    public function get()
    {
        return array_map('json_decode', Redis::zrevrange($this->cacheKey(), 0, 4));
    }

    public function push($thread)
    {
        Redis::zincrby($this->cacheKey(), 1, json_encode(
            [
                'title' => $thread->title,
                'path' => $thread->path(),
            ]
        ));
    }

    protected function reset()
    {
        Redis::del($this->cacheKey());
    }

    protected function cacheKey()
    {
        return  'trending_threads';
    }
}
