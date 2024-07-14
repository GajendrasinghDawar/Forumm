<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReplyResource;
use App\Http\Resources\ThreadResource;
use App\Models\Channel;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreadController extends Controller
{
    public function index(Channel $channel)
    {
        if ($channel->exists) {
            $threads = $channel->threads()->latest()->get();
        } else {
            $threads = Thread::latest()->get();
        }
        
        return Inertia::render('Thread/Index', [
            'threads' => ThreadResource::collection($threads),
        ]);
    }

    public function show($channel, $thread)
    {
        $thread = Thread::find($thread);

        return Inertia::render('Thread/Show', [
            'thread' => ThreadResource::make($thread),
            "replies" => ReplyResource::collection($thread->replies()->latest()->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Thread/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            // 'channel_id' => 'required|exists:channels,id',
        ]);

        $thread = Thread::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('threads.show', $thread->id);
    }
}
