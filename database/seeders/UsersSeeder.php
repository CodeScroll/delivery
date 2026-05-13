<?php

namespace Database\Seeders;

use App\Helpers\General;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now()->toDateTimeString();

        DB::table('users')->insert([
            'unique_id' => General::generateUniqueId(User::class, 'unique_id', 4),
            'name' => 'admin',
            'surname' => 'suradmin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => $now,
            'created_at' => $now,
            'updated_at' => $now
        ]);

        DB::table('users_roles')->insert([
            'user_id' => 1,
            'role' => 'admin',
            'created_at' => $now,
            'updated_at' => $now
        ]);
    }
}
