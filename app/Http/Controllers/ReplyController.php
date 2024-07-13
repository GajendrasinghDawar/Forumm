<?php

namespace App\Http\Controllers;

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

        return redirect()->route('threads.show', $thread->id);
    }

}
