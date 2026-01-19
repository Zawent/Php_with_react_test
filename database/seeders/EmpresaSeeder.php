<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Empresa;

class EmpresaSeeder extends Seeder
{
    public function run(): void
    {
        Empresa::create([
            'nombre' => 'TechFlow S.A.',
            'rut' => '76.123.456-K'
        ]);
    }
}