<?php

namespace App\Policies;

use App\Models\Thread;
use App\Models\User;

class ThreadPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Thread $post): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user,  $thread)
    {
        if ($thread->user_id == $user->id) {
            return True;
        }
        return false;
    }

    public function delete(User $user,  $thread)
    {
        if ($thread->user_id == $user->id) {
            return True;
        }
        return false;
    }
}
