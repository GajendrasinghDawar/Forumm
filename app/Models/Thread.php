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

    public function getReplyCountAttribute()
    {
        return $this->replies()->count();
    }
}
