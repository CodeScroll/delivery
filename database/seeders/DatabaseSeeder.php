<?php

namespace Database\Seeders;

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
        if (env('APP_ENV') == 'local') {

            User::factory(100)->create();

            $this->call([
                CitiesSeeder::class,
                CompanyTypeSeeder::class,
                CompanySeeder::class,
            ]);
        } else {

            $this->call([]);
        }
    }
}
