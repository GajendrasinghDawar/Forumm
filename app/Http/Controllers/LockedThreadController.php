<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;

class LockedThreadController extends Controller
{
    public function store(Thread $thread)
    {
        $thread->update(['locked' => true]);
    }

    public function destroy(Thread $thread)
    {
        $thread->update(['locked' => false]);
    }
}
