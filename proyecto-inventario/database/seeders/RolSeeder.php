<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol; // IMPORTANTE: Importa tu modelo

class RolSeeder extends Seeder
{
    public function run(): void
    {
        // Creamos los roles básicos
        Rol::create(['nombre' => 'Administrador']);
        Rol::create(['nombre' => 'Operador']);
        Rol::create(['nombre' => 'Gerente']);
    }
}