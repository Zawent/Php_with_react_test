<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $empresaId = $request->user()->empresa_id;

        $productos = Producto::where('empresa_id', $empresaId)
            ->orderBy('nombre')
            ->get();

        return Inertia::render('inventario/productos/index', [
            'productos' => $productos,
        ]);
    }

    public function show(Producto $producto)
    {
        $this->authorizeEmpresa($producto);

        $producto->load('proveedores', 'bodegas');

        return Inertia::render('inventario/productos/show', [
            'producto' => $producto,
        ]);
    }

    public function create(Request $request)
    {
        $proveedores = Proveedor::where(
            'empresa_id',
            $request->user()->empresa_id
        )
        ->where('activo', true)
        ->orderBy('nombre')
        ->get();

        return Inertia::render('inventario/productos/create', [
            'proveedores' => $proveedores,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'sku' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
            'proveedor_id' => 'nullable|exists:proveedores,id',
        ]);

        // Manejar la subida de imagen
        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store(
                'productos',
                'public'
            );
        }

        $producto = Producto::create([
            'empresa_id' => $request->user()->empresa_id,
            'nombre' => $request->nombre,
            'sku' => $request->sku,
            'descripcion' => $request->descripcion,
            'imagen' => $imagenPath,
            'activo' => true,
        ]);

        // Si seleccionaron proveedor
        if ($request->proveedor_id) {
            $producto->proveedores()->attach($request->proveedor_id);
        }

        return redirect()
            ->route('inventario.productos.index')
            ->with('success', 'Producto creado correctamente');
    }

    public function edit(Producto $producto)
    {
        $this->authorizeEmpresa($producto);

        return Inertia::render('inventario/productos/edit', [
            'producto' => $producto->load('proveedores'),
            'proveedores' => Proveedor::where(
                'empresa_id',
                auth()->user()->empresa_id
            )->orderBy('nombre')->get(),
        ]);
    }

    public function update(Request $request, Producto $producto)
    {
        $this->authorizeEmpresa($producto);

        $request->validate([
            'nombre'          => 'required|string|max:255',
            'sku'             => 'nullable|string|max:100',
            'descripcion'     => 'nullable|string',
            'imagen'          => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'eliminar_imagen' => 'boolean',
            'activo'          => 'boolean',
            'proveedor_id'    => 'nullable|exists:proveedores,id',
            'sin_proveedor'   => 'boolean',
        ]);

        // Manejar actualización/eliminación de imagen
        $imagenPath = $producto->imagen;
        
        // Si marcaron eliminar imagen
        if ($request->boolean('eliminar_imagen')) {
            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }
            $imagenPath = null;
        }
        
        // Si subieron una nueva imagen
        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior si existe
            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }
            $imagenPath = $request->file('imagen')->store('productos', 'public');
        }

        // Actualizar datos básicos del producto
        $producto->update([
            'nombre'      => $request->nombre,
            'sku'         => $request->sku,
            'descripcion' => $request->descripcion,
            'imagen'      => $imagenPath,
            'activo'      => $request->activo,
        ]);

        // Manejar relación con proveedores
        if ($request->boolean('sin_proveedor')) {
            $producto->proveedores()->sync([]);
        } elseif ($request->proveedor_id) {
            $producto->proveedores()->sync([
                $request->proveedor_id => [
                    'empresa_id' => auth()->user()->empresa_id,
                ]
            ]);
        }

        return redirect()
            ->route('inventario.productos.index')
            ->with('success', 'Producto actualizado correctamente');
    }

    public function destroy(Producto $producto)
    {
        $this->authorizeEmpresa($producto);

        $producto->update(['activo' => false]);

        return redirect()
            ->route('inventario.productos.index')
            ->with('success', 'Producto desactivado');
    }

    /**
     * Seguridad multiempresa
     */
    private function authorizeEmpresa(Producto $producto)
    {
        if ($producto->empresa_id !== auth()->user()->empresa_id) {
            abort(403);
        }
    }
}