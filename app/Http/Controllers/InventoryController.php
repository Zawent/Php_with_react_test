<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $empresa = Auth::user()->empresa;

        $inventarios = Inventario::where('empresa_id', $empresa->id)->get();

        return Inertia::render('inventory/index', [
            'items' => $inventarios,
        ]);
    }
}
