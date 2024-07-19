<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ThreadWasUpdated extends Notification
{
    use Queueable;

    protected $thread;
    protected $reply;

    public function __construct($thread,  $reply)
    {

        $this->thread = $thread;
        $this->reply = $reply;
        
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'path' => $this->reply->path(),
            "message" => $this->reply->user->name . " replied to " . $this->thread->title,
        ];
    }
}
