<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ChannelFactory extends Factory
{
    protected static $predefinedChannels = [
        'General Discussion',
        'Tech News',
        'Programming',
        'Music',
        'Books',
    ];

    public function definition(): array
    {
        $name = $this->faker->unique()->randomElement(static::$predefinedChannels);

        static::$predefinedChannels = array_diff(static::$predefinedChannels, [$name]);

        return [
            'name' =>  $name,
            'slug' => Str::slug($name),
        ];
    }
}
