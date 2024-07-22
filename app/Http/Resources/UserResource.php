<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email_verified_at' => $this->email_verified_at,
            'avatar_path' => $this->avatar_path,
            'created_at' => $this->created_at->diffForHumans(),
            "is_admin" => $this->isAdmin(),
            'email' => $this->email,
        ];
    }
}
