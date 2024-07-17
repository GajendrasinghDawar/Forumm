<?php

namespace App\Models;

use App\Http\Resources\ActivityResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function subject()
    {
        return $this->morphTo();
    }

    public static function feed(User $user, $take = 50)
    {
        $activities = $user->activity()->latest()->with(["subject",])->take($take)->get();

        return ActivityResource::collection($activities);
    }
}
