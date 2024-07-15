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
            'user' => UserResource::make($this->user),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at,
            "favorites_count" => $this->whenLoaded('favorites', $this->favorites_count),
            'isFavorited' => $this->isFavorited()
        ];
    }
}
