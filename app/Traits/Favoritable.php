<?php

namespace App\Traits;

trait Favoritable
{
    public function getFavoritesCountAttribute()
    {
        return $this->favorites->count();
    }

    public function isFavorited()
    {
        return $this->favorites()->where('user_id', auth()->id())->exists();
    }

    public function favorite($userID)
    {
        $attributes = ['user_id' => $userID];

        if (!$this->favorites()->where($attributes)->exists()) {
            return $this->favorites()->create($attributes);
        }
    }
}