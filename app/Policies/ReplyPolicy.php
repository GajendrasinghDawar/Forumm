<?php

namespace App\Policies;

use App\Models\User;

class ReplyPolicy
{
    public function update(User $user,  $reply)
    {
        if ($reply->user_id == $user->id) {
            return True;
        }
        return false;
    }

    public function create(User $user)
    {
        $lastReply = $user->fresh()->lastReply;

        if (!$lastReply) {
            return True;
        }
        return !$lastReply->wasJustPublished();
    }
}
