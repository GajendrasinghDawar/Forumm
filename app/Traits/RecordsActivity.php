<?php

namespace App\Traits;

use App\Models\Activity;

trait RecordsActivity
{
    public static function bootRecordsActivity()
    {
        if (auth()->guest()) return;

        foreach (static::getRecordEvents() as $event) {
            static::$event(function ($model) use ($event) {
                $model->recordActivity($event);
            });
        }

        static::deleting(function ($model) {
            $model->activity()->delete();
        });
    }

    public static function getRecordEvents()
    {
        return ['created'];
    }

    protected function recordActivity($event)
    {
        $this->activity()->create([
            'user_id' => auth()->id(),
            "type" => $this->getActivityType($event),
        ]);
    }

    public function activity()
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    protected function getActivityType($event)
    {
        $type =  strtolower((new \ReflectionClass($this))->getShortName());

        return "{$event}_{$type}";
    }
}
