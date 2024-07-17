<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Reply;
use App\Models\Thread;
use Illuminate\Http\Request;

class ReplyController extends Controller
{

    public function store(Request $request, Thread $thread)
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:2500']]);

        $thread->replies()->create([
            ...$data,
            'thread_id' => $thread->id,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->id]);
    }

    public function update(Request $request, Reply $reply)
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:2500']]);

        $this->authorize('update', $reply);

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
