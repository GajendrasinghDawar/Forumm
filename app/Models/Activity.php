<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    /**
     *   protected $guarded = [];
     * public function Favorited(): MorphTo
     * {return $this->morphTo();
     *    }
     *  // Relationship to User
     *public function user()
     *{
     *   return $this->belongsTo(User::class);
     *}
     *
     *   // Polymorphic relationship to the subject of the activity
     *  public function subject()
     * {
     *     return $this->morphTo();
     *  }
     */
}
