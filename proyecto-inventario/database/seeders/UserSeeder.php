<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rol;
use App\Models\Empresa;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Buscamos los IDs de lo que creamos en los otros seeders
        $rolAdmin = Rol::where('nombre', 'Administrador')->first();
        $empresa = Empresa::first();

        User::create([
            'name' => 'Usuario Admin',
            'email' => 'admin@ejemplo.com',
            'password' => Hash::make('12345678'), // Encriptado
            'empresa_id' => $empresa->id,
            'rol_id' => $rolAdmin->id,
        ]);
    }
}