<?php

namespace App\Models;

use App\Traits\Favoritable;
use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Log;

class Reply extends Model
{
    use HasFactory, Favoritable, RecordsActivity;

    protected $with = ['user'];

    protected $fillable = [
        'body',
        'thread_id',
        'user_id'
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($reply) {
            $reply->thread->increment('replies_count');
        });

        static::deleted(function ($reply) {

            if ($reply->isBest()) {
                $reply->thread->update(['best_reply_id' => null]);
            }

            $reply->thread->decrement('replies_count');
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favorited');
    }

    public function path()
    {
        return $this->thread->path() . "#reply-{$this->id}";
    }

    public function wasJustPublished()
    {
        return $this->created_at->gt(now()->subMinute());
    }

    public function mentionedUsers()
    {
        preg_match_all('/@([A-Za-z0-9_]+)/', $this->body, $matches);

        return $matches[1];
    }

    protected function body(): Attribute
    {
        return Attribute::make(
            set: function (string $value) {
                $mentionRegex = '/@([A-Za-z0-9_]+)/';

                preg_match_all($mentionRegex, $value, $matches);

                foreach ($matches[1] as $username) {
                    $userExists = User::where('username', $username)->exists();

                    if (!$userExists) {
                        $value = str_replace("@$username", $username, $value);
                    }
                }

                return $value;
            },
        );
    }

    public function isBest()
    {
        return $this->thread->best_reply_id == $this->id;
    }
}
