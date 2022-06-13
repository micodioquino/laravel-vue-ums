git clone https://github.com/micodioquino/laravel-vue-ums.git

BACKEND: 

- cd laravel-vue-ums
- composer install
- npm install

// Create .env file and copy the content in .env.example

- php artisan key:generate

// create database name = laravel_ums

- php artisan migrate
- php artisan db:seed

// user default password is "password"

- php artisan serve

FRONTEND: 

- cd laravel-vue-ums/vue
- npm install
- npm run dev

