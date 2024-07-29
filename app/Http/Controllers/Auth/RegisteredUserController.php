<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Redirect;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'username' => 'required|string|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'registration_disabled' => [function ($attribute, $value, $fail) {
                $fail('Registration has been disabled. Please log in.');
            }],
        ]);

        return Redirect::route('register')->withErrors([
            'registration_disabled' => 'Registration has been disabled. Please log in with prepopulated credentials.'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $request->username,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('profile.edit', absolute: false));
    }
}
