<?php

use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ThreadController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('threads', ThreadController::class)->except(['show', 'index']);

Route::get('threads/{channel?}', [ThreadController::class, 'index'])->name('threads.index');

Route::get('/threads/{channel}/{thread}', [ThreadController::class, 'show'])->name('threads.show');

Route::resource('threads.channel.replies', ReplyController::class)->shallow()->names([
    'store' => 'reply.store',
])->only(['store',]);


require __DIR__.'/auth.php';
