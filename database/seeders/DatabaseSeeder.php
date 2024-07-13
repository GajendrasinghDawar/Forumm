<?php

namespace Database\Seeders;

use App\Models\Reply;
use App\Models\Thread;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(9)->create();

        User::factory()->create(
            [
                'name' => 'Gaju daw',
                'email' => 'Gaju@gmail.com',
        ]);

        $threads = Thread::factory(19)->recycle($users)->create();

        Reply::factory(9)->recycle($threads)->recycle($users)->create();

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
