<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Activity;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        $user->load('threads');

        $threads = $user->threads()->latest()->get();

        return Inertia::render('Profile/Show', [
            'user' => UserResource::make($user),
            'threads' => ThreadResource::collection($threads),
            "activities" => Activity::feed($user),
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function avatar_store(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image'],
        ]);

        $path =  $request->file('avatar')->store('avatars', 'public');

        //TODO: get old image delete that before update new.

        $request->user()->update([
            'avatar_path' => $path
        ]);

        return Redirect::route('profile.edit');
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
