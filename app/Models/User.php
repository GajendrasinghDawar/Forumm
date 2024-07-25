<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'avatar_path',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getRouteKeyName()
    {
        return 'username';
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function activity()
    {
        return $this->hasMany(Activity::class);
    }

    public function lastReply()
    {
        return $this->hasOne(Reply::class)->latest();
    }

    protected function avatarPath(): Attribute
    {
        return new Attribute(function ($value) {
            return asset($value ?: '/user.png');
        });
    }

    public function isAdmin()
    {
        return in_array($this->username, [
            'Gajudawar'
        ]);
    }
}
