<?php

use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\ThreadSubscriptionsController;
use App\Http\Controllers\UserNotificationController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    return Inertia::render('Welcome');
});

Route::get('/threads/{channel?}', [ThreadController::class, 'index'])->name('threads.index');

Route::get('/threads/{channel}/{thread}', [ThreadController::class, 'show'])->name('threads.show');

Route::get('/create/form', [ThreadController::class, 'create'])->name('threads.create');

Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/threads', [ThreadController::class, 'store'])->name('threads.store');
    
    Route::delete('/threads/{thread}', [ThreadController::class, 'delete'])->name('threads.delete');

    Route::post('/threads/{thread}/replies', [ReplyController::class, 'store'])->name('replies.store');

    Route::post('/threads/{thread}/subscriptions', [ThreadSubscriptionsController::class, 'store'])->name('threads.subscribe');

    Route::delete('/threads/{thread}/subscriptions', [ThreadSubscriptionsController::class, 'destroy'])->name('threads.subscribe');

    Route::post('/replies/{reply}/favorites', [FavoritesController::class, 'store'])->name('replies.favorite');

    Route::delete('/replies/{reply}/favorites', [FavoritesController::class, 'destroy'])->name('replies.favorite');

    Route::delete('/replies/{reply}', [ReplyController::class, 'destroy'])->name('replies.destroy');

    Route::patch('/replies/{reply}/', [ReplyController::class, 'update'])->name('replies.update');

    Route::get('/notifications', [UserNotificationController::class, 'index'])->name('user.notifications');

    Route::delete('/notifications/{notification}', [UserNotificationController::class, 'destroy'])->name('user.notifications.destroy'); 
});

require __DIR__.'/auth.php';
