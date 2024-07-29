<?php

namespace Database\Factories;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ThreadFactory extends Factory
{
    protected static $predefinedThreads = [
        [
            'title' => 'How to learn Laravel?',
            'body' => 'I am new to Laravel and looking for resources to get started. Any recommendations?',
        ],
        [
            'title' => 'Best practices for REST API design',
            'body' => 'What are some best practices for designing RESTful APIs?',
        ],
        [
            'title' => 'Understanding PHP 8 new features',
            'body' => 'Can someone explain the new features introduced in PHP 8?',
        ],
        [
            'title' => 'Tips for optimizing SQL queries',
            'body' => 'What are some tips for optimizing SQL queries for better performance?',
        ],
        [
            'title' => 'Getting started with Docker',
            'body' => 'I want to start using Docker for my projects. Where should I begin?',
        ],
        [
            'title' => 'How to manage state in React?',
            'body' => 'What are the best practices for managing state in a React application?',
        ],
        [
            'title' => 'Introduction to Kubernetes',
            'body' => 'Can someone provide an introduction to Kubernetes and its core concepts?',
        ],
        [
            'title' => 'Effective debugging techniques',
            'body' => 'What are some effective techniques for debugging complex applications?',
        ],
        [
            'title' => 'Understanding microservices architecture',
            'body' => 'What are the key principles of microservices architecture?',
        ],
        [
            'title' => 'Best practices for unit testing',
            'body' => 'What are some best practices for writing unit tests?',
        ],
        [
            'title' => 'How to secure a web application?',
            'body' => 'What are the best practices for securing a web application?',
        ],
        [
            'title' => 'Introduction to GraphQL',
            'body' => 'Can someone explain the basics of GraphQL and how it differs from REST?',
        ],
        [
            'title' => 'How to use Git effectively?',
            'body' => 'What are some tips and tricks for using Git effectively?',
        ],
        [
            'title' => 'Understanding asynchronous programming in JavaScript',
            'body' => 'Can someone explain how asynchronous programming works in JavaScript?',
        ],
        [
            'title' => 'Best practices for database design',
            'body' => 'What are some best practices for designing a database schema?',
        ],
        [
            'title' => 'How to optimize web performance?',
            'body' => 'What are some techniques for optimizing the performance of a web application?',
        ],
        [
            'title' => 'Introduction to machine learning',
            'body' => 'Can someone provide an introduction to machine learning and its applications?',
        ],
        [
            'title' => 'How to use Docker Compose?',
            'body' => 'What is Docker Compose and how can it be used to manage multi-container applications?',
        ],
        [
            'title' => 'Understanding event-driven architecture',
            'body' => 'What is event-driven architecture and what are its benefits?',
        ],
        [
            'title' => 'How to implement authentication in a web app?',
            'body' => 'What are the best practices for implementing authentication in a web application?',
        ],
    ];

    public function definition(): array
    {
        if ($this->faker->boolean(20) && !empty(static::$predefinedThreads)) {
            $thread = $this->faker->randomElement(static::$predefinedThreads);
            $title = $thread['title'];
            $body = $thread['body'];
        } else {
            $title = $this->faker->sentence();
            $body = $this->faker->paragraph();
        }

        return [
            'user_id' => User::factory(),
            'channel_id' => Channel::factory(),
            'title' => $title,
            'body' => $body,
        ];
    }
}
