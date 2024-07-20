<?php

namespace App\Listeners;

use App\Events\ThreadReceivedNewReply;
use App\Models\User;
use App\Notifications\YourWereMentioned;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyMentionedUsers
{
    public function handle(ThreadReceivedNewReply $event): void
    {
        $mentionedUsers = $event->reply->mentionedUsers();

        User::whereIn('username', $mentionedUsers)
            ->get()
            ->each(function ($user) use ($event) {
                $user->notify(new YourWereMentioned($event->reply));
            });
    }
}
