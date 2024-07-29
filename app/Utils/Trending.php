<?php

namespace App\Utils;

use Illuminate\Support\Facades\Redis;

class Trending
{
    public $description = "A class for interacting with redis";

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

    public function reset()
    {
        Redis::del($this->cacheKey());

        return "redis cache key reset done";
    }

    protected function cacheKey()
    {
        return  'trending_threads';
    }

    public function remove($thread)
    {
        Redis::zrem($this->cacheKey(), json_encode([
            'title' => $thread->title,
            'path' => $thread->path(),
        ]));
    }
}
