<?php

namespace App\Traits;

trait Favoritable
{

    public static function bootFavoritable()
    {

        static::deleting(function ($model) {
            $model->favorites->each->delete();
        });
    }

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

    public function unfavorite($userID)
    {
        $attributes = ['user_id' => $userID];

        $this->favorites()->where($attributes)->get()->each->delete();
    }

}
