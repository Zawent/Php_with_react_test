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
        // El orden aquí es VITAL por las llaves foráneas
        $this->call([
            RolSeeder::class,
            EmpresaSeeder::class,
            UserSeeder::class,
        ]);
    }
}
