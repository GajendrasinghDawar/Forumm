<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreadController extends Controller
{
    public function index()
    {
        $threads = Thread::all();

        return Inertia::render('Thread/Index', [
            'threads' => $threads,
        ]);
    }

    public function show($threadId)
    {
        $thread = Thread::find($threadId);

        return Inertia::render('Thread/Show', [
            'thread' => $thread,
            "replies" => $thread->replies
        ]);
    }
}
