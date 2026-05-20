<?php

namespace App\Builders;

use App\Models\Product;
use Illuminate\Support\Facades\Lang;

class ProductsBuilder
{

    function index($request)
    {
        $status = true;
        $msg = Lang::get('messages.not_found');
        $companyQuery = Product::query();
        $products = $companyQuery->paginate(env('PRODUCTSINDEXLIMIT'));
        return [
            'status' => $status,
            'msg' => $msg,
            'products' => $products,
        ];
    }
}
