<?php

namespace App\Models;

use App\Events\ThreadReceivedNewReply;
use App\Traits\ConvertsMarkdownToHtml;
use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Laravel\Scout\Searchable;

use Illuminate\Support\Str;

class Thread extends Model
{

    use HasFactory, RecordsActivity, Searchable, ConvertsMarkdownToHtml;

    public $asYouType = true;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($thread) {
            $baseSlug = Str::slug($thread->title);
            $slug = $baseSlug;
            $count = 2;

            while (Thread::whereSlug($slug)->exists()) {
                $slug = "{$baseSlug}-" . $count++;
            }

            $thread->slug = $slug;
        });
    }

    protected $fillable = ['title', 'body', 'user_id', "channel_id", "best_reply_id", "locked"];

    protected $casts = [
        'locked' => 'boolean',
    ];

    public function toSearchableArray()
    {
        $array = $this->toArray();
        return [
            'id' => $this->id,
            'body' => $array['body'],
            'title' => $array['title'],
        ];
    }

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
        return "/threads/{$this->channel->slug}/{$this->slug}";
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

        event(new ThreadReceivedNewReply($reply));
  
        return $reply;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function markBestReply(Reply $reply)
    {
        $this->best_reply_id = $reply->id;
        $this->save();
    }

    public function wasJustPublished()
    {
        return $this->created_at->gt(now()->subMinute());
    }

}
