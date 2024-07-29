<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Rules\AlwaysFail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Redirect;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate(['current_password' => ['required', 'current_password', new AlwaysFail],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        return Redirect::route('profile.edit')->withErrors(['password' => 'Password update is disabled.']);
        
        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
