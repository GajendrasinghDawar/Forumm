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
                $this->user?->username 
            ),
            'author_avatar_path' => $this->when(
                !$request->routeIs(['profile.show']),
                $this->user?->avatar_path
            ),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            "replies_count" => $this->replies_count,
            'isSubscribed' => $this->getIsSubscribed(),
            'route' => $this->path(),
            'can' => [
                'delete' => $request->user()?->can('delete', $this->resource),
                'update' => $request->user()?->can('update', $this->resource),
            ],
            'replies' => $this->whenLoaded('replies', ReplyResource::collection($this->replies()->latest()->get())),
            "visits" => $this->visits,
            "slug" => $this->slug,
            "locked" => $this->locked,
            "channel_id" => $this->channel->id,
        ];
    }
}
