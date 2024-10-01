<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/svg+xml" href="/pic02.jpg" />

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <meta property="og:title" content="Join the Bhoothnath.Live Community - Where Conversations Come Alive!">
    <meta property="og:description" content="Created by Gajendrasinghdawar. Discover a vibrant community where you can share your thoughts, ask questions, and connect with like-minded individuals. Whether you're looking for advice, support, or just a friendly chat, our forum is the perfect place to be. Join us today and be part of the conversation!">
    <meta property="og:image" content="https://bhoothnath.live/og-image.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1122" />
    <meta property="og:image:height" content="625" />
    <meta property="og:url" content="https://bhoothnath.live/" />
    <meta property="og:type" content="website" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body>
    @inertia
    <div id="mobile-nav-portal"></div>
</body>

</html>