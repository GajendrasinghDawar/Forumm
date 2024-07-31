# Forumm - Laravel + React.js

### Installation

First, Clone this repository and install its dependencies
by following these commands:

```bash
cd Forumm

composer install 

npm install

copy .env.example .env

php artisan key:gen

php artisan migrate
```


Also install and configure Redis for caching and define credentials in .env. for  installation follow steps from **Redis** [site](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/).


After appropriate installation, you may serve the Laravel application using the `serve` Artisan command:

```bash
php artisan serve
```

And, run the application frontend  via `npm run dev`:

```bash
npm run dev
```

