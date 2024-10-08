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

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Gate;


class ThreadController extends Controller
{
    public function index(Request $request, Channel $channel, ThreadFilters $filters, Trending $trending)
    {
        $searchQuery = $request->query('search', '');

        if ($searchQuery) {
            $threads = Thread::search($searchQuery)->get();
        } else {
            $threads = $this->getThreads($channel, $filters);
        }

        return Inertia::render('Thread/Index', [
            'threads' => ThreadResource::collection($threads),
            'trending_threads' => $trending->get(),
            'search' => $searchQuery,     
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
                'title' => ['required', 'string', 'min:3', 'max:258', new SpamFree],
                'body' => ['required', 'string', 'min:10', 'max:10000', new SpamFree],
                'channel_id' => 'required|exists:channels,id',
            ]
        );

        if (Gate::denies('create', Thread::class)) {
            throw ValidationException::withMessages([
                'body' => 'You are posting too frequently. Please take a chill.'
            ]);
        }

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

        $thread->update($request->validate(
            [
                'title' => ['required', new SpamFree],
                'body' => ['required', new SpamFree],
                'channel_id' => 'required|exists:channels,id',
            ]
        ));

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
