<?php

namespace App\Http\Resources;

use App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'favorited_type' => strtolower(class_basename($this->favorited_type)),
            'created_at' => $this->created_at->diffForHumans(),
            'favorited' => $this->when(
                $request->routeIs('profile.show'),
                $this->getFavoritedResource()
            ),
        ];
    }

    protected function getFavoritedResource()
    {
        $resourceClass = $this->getFavoritedResourceClass($this->favorited_type);

        return new $resourceClass($this->favorited);
    }

    protected function getFavoritedResourceClass($type): string
    {
        $mapping = [
            Reply::class => ReplyResource::class,
        ];

        return $mapping[$type] ?? null;
    }
}
