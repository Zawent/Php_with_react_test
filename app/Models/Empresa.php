<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Opcional, para crear datos de prueba
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'nit',
    ];

    // Tu relación está perfecta
    public function usuarios() {
        return $this->hasMany(User::class);
    }
    
    public function inventarios()
    {
        return $this->hasMany(Inventario::class);
    }

}