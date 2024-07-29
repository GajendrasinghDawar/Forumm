<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use App\Models\Reply;
use App\Models\Thread;

use App\Rules\SpamFree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReplyController extends Controller
{
    public function store(Request $request, Thread $thread)
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:2500', new SpamFree]]);

        if (Gate::denies('create', Reply::class)) {
            throw ValidationException::withMessages([
                'body' => 'You are posting too frequently. Please take a chill.'
            ]);
        }
        
        $reply = $thread->addReply(
            [
                ...$data,
                'user_id' => auth()->id(),
            ]
        );

        return redirect()->route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->slug]);
    }

    public function update(Request $request, Reply $reply)
    {
        $this->authorize('update', $reply);

        $data = $request->validate(['body' => ['required', 'string', 'max:500', new SpamFree]]);

        $reply->update($data);

        return redirect()->route('threads.show', ['channel' => $reply->thread->channel->slug, 'thread' => $reply->thread->slug]);
    }

    public function destroy(Reply $reply)
    {
        $this->authorize('update', $reply);

        $reply->delete();

        return redirect()->route('threads.show', ['channel' => $reply->thread->channel->slug, 'thread' => $reply->thread->slug]);
    }
}
