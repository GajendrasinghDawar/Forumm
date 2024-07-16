<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Thread extends Model
{
    use HasFactory;



    public static function boot()
    {

        parent::boot();

        static::created(function ($thread) {
            $thread->recordActivity('created');
        });
    }

    protected function recordActivity($event)
    {
        Activity::create([
            'user_id' => auth()->id(),
            "type" => $event . '_' . strtolower((new \ReflectionClass($this))->getShortName()),
            'subject_id' => $this->id,
            'subject_type' => get_class($this)
        ]);
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

    public function getReplyCountAttribute()
    {
        return $this->replies()->count();
    }
}
