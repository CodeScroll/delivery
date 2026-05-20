<?php

namespace App\Http\Controllers\Api;

use App\Builders\ProductsBuilder;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get(Request $request)
    {
        $productsBuilder = new ProductsBuilder();
        $products = $productsBuilder->index($request);
        return response()->json($products);
    }
}
