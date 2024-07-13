<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ChannelFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->word;

        return [
            'name' =>  $name,
            'slug' => Str::slug($name),
        ];
    }
}
