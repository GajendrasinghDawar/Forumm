<?php

namespace App\Models;

use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Favorite extends Model
{
    use RecordsActivity;

    protected $guarded = [];

    public function Favorited(): MorphTo
    {
        return $this->morphTo();
    }
}
