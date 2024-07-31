<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Favorite;
use App\Models\Reply;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::factory(18)->create();

        User::factory()->create(
            [
                'name' => 'gaju daw',
                'username' => 'Gajudawar',
                'email' => 'Gaju@gmail.com',
                "avatar_path" => "/bul.png",
            ]
        );

        User::factory()->create(
            [
                'name' => 'ravi daw',
                'username' => 'ravidawar',
                'email' => 'ravi@gmail.com',
                "avatar_path" => "/kuttan.png",
            ]
        );

        User::factory()->create(
            [
                'name' => 'test user',
                'username' => 'testuser007',
                'email' => 'user@example.com',
                "avatar_path" => "/kuttan.png",
                'password' => Hash::make(env('TEST_USER_PASSWORD', 'password123'))
            ]
        );

        $channels = Channel::factory(5)->create();

        $threads = Thread::factory(18)
            ->recycle($users)
            ->recycle($channels)
            ->create();

        // $favorites = Favorite::factory(80)->recycle($users)->create();

        $replies = Reply::factory(28)->recycle($threads)->recycle($users)
            ->create();

        

        // $users->each(function ($user) {
        //     $user->threads()->saveMany(
        //         Thread::factory(5)->make()
        //     );
        // });

        // Thread::all()->each(function ($thread) use ($users) {
        //     $thread->replies()->saveMany(
        //         Reply::factory(10)->make([
        //             'user_id' => $users->random()->id,
        //         ])
        //     );
        // });
    }
}
