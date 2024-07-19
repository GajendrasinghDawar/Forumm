<?php

namespace App\Http\Controllers;

use App\Filters\ThreadFilters;
use App\Http\Resources\ThreadResource;
use App\Models\Channel;
use App\Models\Thread;
use App\Rules\SpamFree;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreadController extends Controller
{
    public function index(Channel $channel, ThreadFilters $filters)

    {
        $threads = $this->getThreads($channel, $filters);

        return Inertia::render('Thread/Index', [
            'threads' => ThreadResource::collection($threads),
        ]);
    }

    public function show($channel, $thread)
    {
        $thread = Thread::findOrFail($thread);

        $thread->load('replies');

        return Inertia::render('Thread/Show', [
            'thread' => ThreadResource::make($thread),
        ]);
    }

    public function create()
    {
        return Inertia::render('Thread/Create');
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'title' => ['required', new SpamFree],
                'body' => ['required', new SpamFree],
                'channel_id' => 'required|exists:channels,id',
            ]
        );

        $thread = Thread::create([
            'title' => $request->title,
            'body' => $request->body,
            'channel_id' => $request->channel_id,
            'user_id' => auth()->id(),
        ]);
        
        return redirect()->route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->id]);
    }

    public function delete(Thread $thread)
    {
        $this->authorize('delete', $thread);

        $thread->replies->each->delete();
        $thread->delete();

        return to_route(
            'profile.show',
            ['user' => auth()->user()->name]
        );
    }

    protected function getThreads(Channel $channel, ThreadFilters $filters)
    {
        $threads = Thread::filter($filters);

        if ($channel->exists) {
            $threads = $threads->where('channel_id', $channel->id);
        }

        $threads = $threads->latest()->get();

        return $threads;
    }
}
