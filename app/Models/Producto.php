<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'sku',
        'descripcion',
        'imagen',
        'activo',
    ];

    protected $appends = ['imagen_url'];
        
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function proveedores()
    {
        return $this->belongsToMany(
            Proveedor::class,
            'producto_proveedor'
        )->withTimestamps();
    }

    public function bodegas()
    {
        return $this->belongsToMany(
            Bodega::class,
            'producto_bodega'
        )
        ->withPivot('stock')
        ->withTimestamps();
    }

    public function getImagenUrlAttribute()
    {
        return $this->imagen 
            ? asset('storage/' . $this->imagen) 
            : null;
    }
}
