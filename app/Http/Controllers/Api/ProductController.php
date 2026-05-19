<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get(Request $request)
    {
        $companyQuery = Product::query();
        return response()->json($companyQuery->paginate(env('PRODUCTSINDEXLIMIT')));
    }
}
