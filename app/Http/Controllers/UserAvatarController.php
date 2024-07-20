<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserAvatarController extends Controller
{
    /**
     * Update the avatar for the user.
     */
    public function store(Request $request): string
    {
        $request->validate([
            'avatar' => ['required', 'image'],
        ]);

        // auth()->user()->update([
        // 'avatar_path' => $path =  $request->file('avatar')->store('avatars');,
        // ]);

        $path = $request->file('avatar')->store('avatars');

        return back();
    }
}
