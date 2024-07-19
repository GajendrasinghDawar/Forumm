<?php

namespace App\Models;

use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Thread extends Model
{
    use HasFactory, RecordsActivity;

    public static function boot()
    {
        parent::boot();

        // static::deleting(function ($thread) {
        //     $thread->replies->each->delete();
        // });
    }

    protected $fillable = ['title', 'body', 'user_id', "channel_id"];

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function path()
    {
        return "/threads/{$this->channel->slug}/{$this->id}/";
    }

    public function scopeFilter(Builder $query, $filters)
    {
        return $filters->apply($query);
    }

    public function subscribe($userId = null)
    {
        $user_id = $userId ?: auth()->id();

        $this->subscriptions()->create([
            'user_id' => $user_id
        ]);

        return $this;
    }

    public function unsubscribe($userId = null)
    {
        $this->subscriptions()
            ->where('user_id', $userId ?: auth()->id())
            ->delete();
    }

    public function subscriptions()
    {
        return $this->hasMany(ThreadSubscriptions::class);
    }

    public function getIsSubscribed()
    {
        return $this->subscriptions()
            ->where('user_id', auth()->id())
            ->exists();
    }

    public function addReply($reply)
    {
        $reply = $this->replies()->create($reply);

        $this->notifySubscribers($reply);

        return $reply;
    }

    public function notifySubscribers($reply)
    {
        $this->subscriptions
        ->filter(function ($sub) use ($reply) {
            return $sub->user_id != $reply->user_id;
        })
        ->each->notify($reply);
    }
}
