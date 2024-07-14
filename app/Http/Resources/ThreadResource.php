<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'author' => $this->user->name,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at,
            "replies_count" => $this->reply_count,
            'route' => $this->path(),
        ];
    }
}
