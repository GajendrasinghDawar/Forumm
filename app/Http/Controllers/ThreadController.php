<?php

namespace App\Http\Controllers;

use App\Filters\ThreadFilters;
use App\Http\Resources\ThreadResource;
use App\Models\Channel;
use App\Models\Thread;
use App\Rules\SpamFree;
use App\Utils\Trending;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ThreadController extends Controller
{
    public function index(Channel $channel, ThreadFilters $filters, Trending $trending)
    {
        $threads = $this->getThreads($channel, $filters);

        return Inertia::render('Thread/Index', [
            'threads' => ThreadResource::collection($threads),
            'trending_threads' => $trending->get(),
        ]);
    }

    public function show($channel, Thread $thread, Trending $trending)
    {

        $thread->increment('visits');

        $trending->push($thread);

        $thread->load('replies');

        return Inertia::render('Thread/Show', [
            'thread' => ThreadResource::make($thread),
        ]);
    }

    public function createOrEdit(Thread $thread = null)
    {
        if ($thread) {
            $this->authorize('update', $thread);

            $thread = new ThreadResource($thread);
        } else {
            $thread = null;
        }

        return Inertia::render('Thread/Create', ['thread' => $thread]);
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

        return redirect()->route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->slug]);
    }

    public function update(Request $request, Thread $thread)
    {
        $this->authorize('update', $thread);

        $thread->update($request->validate([
            'title' => ['required', new SpamFree],
            'body' => ['required', new SpamFree],
        ]));

        return to_route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->slug]);
    }

    public function delete(Thread $thread, Trending $trending)
    {
        $this->authorize('delete', $thread);

        $trending->remove($thread);

        $thread->replies->each->delete();
        $thread->delete();

        return to_route(
            'threads.index',
            ['by' => auth()->user()->name]
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
