<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use App\Models\Thread;
use App\Rules\SpamFree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;


class ReplyController extends Controller
{
    public function store(Request $request, Thread $thread)
    {
        if (Gate::denies('create', Reply::class)) {
            return redirect()->back()->withErrors(['body' => 'You are posting too frequently. Please take a chill.']);
        }

        $data = $request->validate(['body' => ['required', 'string', 'max:2500', new SpamFree]]);

        $thread->addReply(
            [
                ...$data,
                'user_id' => auth()->id(),
            ]
        );

        return redirect()->route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->id]);
    }

    public function update(Request $request, Reply $reply)
    {
        $this->authorize('update', $reply);

        $data = $request->validate(['body' => ['required', 'string', 'max:500', new SpamFree]]);

        $reply->update($data);

        return redirect()->route('threads.show', ['channel' => $reply->thread->channel->slug, 'thread' => $reply->thread->id]);
    }

    public function destroy(Reply $reply)
    {
        $this->authorize('update', $reply);

        $reply->delete();

        return redirect()->route('threads.show', ['channel' => $reply->thread->channel->slug, 'thread' => $reply->thread->id]);
    }
}
