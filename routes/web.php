<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BestReplyController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\LockedThreadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\ThreadSubscriptionsController;
use App\Http\Controllers\UserNotificationController;


Route::get('/', [ThreadController::class, 'index']);

Route::get('/threads/{channel?}', [ThreadController::class, 'index'])->name('threads.index');

Route::get('/threads/{channel}/{thread}', [ThreadController::class, 'show'])->name('threads.show');


Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::post('locked_threads/{thread}/', [LockedThreadController::class, 'store'])->name('admin');
    Route::delete('locked_threads/{thread}/', [LockedThreadController::class, 'destroy'])->name('admin');
});

Route::middleware(['auth', 'verified',])->group(function () {

    Route::get('/create/form/{thread?}', [ThreadController::class, 'createOrEdit'])->name('threads.create');

    Route::post('/threads', [ThreadController::class, 'store'])->name('threads.store');

    Route::patch('/threads/{thread}', [ThreadController::class, 'update'])->name('threads.update');

    Route::delete('/threads/{thread}', [ThreadController::class, 'delete'])->name('threads.delete');

    Route::post('/threads/{thread}/replies', [ReplyController::class, 'store'])->name('replies.store');

    Route::post('/threads/{thread}/subscriptions', [ThreadSubscriptionsController::class, 'store'])->name('threads.subscribe');

    Route::delete('/threads/{thread}/subscriptions', [ThreadSubscriptionsController::class, 'destroy'])->name('threads.subscribe');

    Route::post('/replies/{reply}/favorites', [FavoritesController::class, 'store'])->name('replies.favorite');

    Route::delete('/replies/{reply}/favorites', [FavoritesController::class, 'destroy'])->name('replies.favorite');

    Route::delete('/replies/{reply}', [ReplyController::class, 'destroy'])->name('replies.destroy');

    Route::patch('/replies/{reply}/', [ReplyController::class, 'update'])->name('replies.update');

    Route::post('/replies/{reply}/best', [BestReplyController::class, 'store'])->name('best_reply.store');

    Route::get('/notifications', [UserNotificationController::class, 'index'])->name('user.notifications');

    Route::delete('/notifications/{notification}', [UserNotificationController::class, 'destroy'])->name('user.notifications.destroy');

    Route::post('/profile/avatar', [ProfileController::class, 'avatar_store'])->name('user.avatar');

});

require __DIR__.'/auth.php';
