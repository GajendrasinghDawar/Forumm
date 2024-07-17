<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReplyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'user' => $this->when(
                !$request->routeIs(['profile.show']),
                UserResource::make($this->user)
            ),
            'can' => [
                'update' => $request->user()?->can('update', $this->resource),
            ],

            "thread" => $this->when(
                $request->routeIs(['profile.show']),
                [
                    "title" => $this->thread->title,
                    "path" => $this->thread->path()
                ]
            ),
            "path" => $this->when(
                $request->routeIs(['profile.show']),
                $this->path()
            ),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            "favorites_count" => $this->favorites_count,
            'isFavorited' => $this->isFavorited()
        ];
    }
}
