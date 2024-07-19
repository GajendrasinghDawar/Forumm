<?php

namespace App\Http\Controllers;

use App\Inspections\Spam;
use App\Models\Reply;
use App\Models\Thread;
use Exception;
use Illuminate\Http\Request;


class ReplyController extends Controller
{
    public function __construct(protected Spam $spam)
    {
    }

    public function store(Request $request, Thread $thread)
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:2500']]);

        try {
            $this->spam->detect(request('body'));

            $thread->addReply(
                [
                    ...$data,
                    'user_id' => auth()->id(),
                ]
            );
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['body' => 'Your reply contains spam.']);
        }

        return redirect()->route('threads.show', ['channel' => $thread->channel->slug, 'thread' => $thread->id]);
    }

    public function update(Request $request, Reply $reply)
    {
        $this->authorize('update', $reply);
        
        $data = $request->validate(['body' => ['required', 'string', 'max:2500']]);

        try {
            $this->spam->detect(request('body'));
            $reply->update($data);
        } catch (Exception $e) {

            return redirect()->back()->withErrors(['body' => 'Your reply contains spam.']);
        }

        return redirect()->route('threads.show', ['channel' => $reply->thread->channel->slug, 'thread' => $reply->thread->id]);
    }

    public function destroy(Reply $reply)
    {
        $this->authorize('update', $reply);

        $reply->delete();

        return redirect()->route('threads.show', ['channel' => $reply->thread->channel->slug, 'thread' => $reply->thread->id]);
    }
}
