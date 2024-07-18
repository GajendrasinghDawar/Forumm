<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserNotificationController extends Controller
{
    public function index()
    {
        return auth()->user()->unreadNotifications;
    }

    public function destroy(User $user, $notification)
    {
        auth()->user()->notifications()->findOrFail($notification)->markAsRead();
    }
}
