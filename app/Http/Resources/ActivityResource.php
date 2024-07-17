<?php

namespace App\Http\Resources;

use App\Models\Reply;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'subject' => $this->whenLoaded('subject', function () {

                if ($this->subject instanceof Reply) {
                    return  ReplyResource::make($this->subject);
                } elseif ($this->subject instanceof Thread) {
                    return new ThreadResource($this->subject);
                } else {
                    return FavoriteResource::make($this->subject);
                }
                
            }),
        ];
    }
}
