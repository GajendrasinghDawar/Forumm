<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\ThreadSubscriptions;
use Illuminate\Http\Request;

class ThreadSubscriptionsController extends Controller
{
    public function store(Thread $thread)
    {
        $thread->subscribe();
    }

    public function destroy(Thread $thread)
    {
        $thread->unsubscribe();
    }
}
