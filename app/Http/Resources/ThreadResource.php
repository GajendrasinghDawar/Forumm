<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'author' => $this->when(
                !$request->routeIs(['profile.show']),
                $this->user->name
            ),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            "replies_count" => $this->reply_count,
            'route' => $this->path(),
            'can' => [
                'delete' => $request->user()?->can('delete', $this->resource),
            ],
            'replies' => $this->whenLoaded('replies', ReplyResource::collection($this->replies()->latest()->get())),
        ];
    }
}
