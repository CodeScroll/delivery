<?php

namespace App\Builders;

use App\Http\Resources\ProductIndexResource;
use App\Models\Product;
use Illuminate\Support\Facades\Lang;

class ProductsBuilder
{

    function index(object $request)
    {
        $status = false;
        $msg = Lang::get('messages.not_found');
        $productQuery = Product::query();

        if($request->has('categoryid')) {
            $productQuery->where('category_id', $request->categoryid);
        }

        $products = $productQuery->paginate(env('PRODUCTSINDEXLIMIT'));
        if ($products->count() > 0) {
            $status = true;
        }

        return [
            'status' => $status,
            'msg' => $msg,
            'products' => ProductIndexResource::collection($products->items()),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'has_more' => $products->hasMorePages(),
            ],
        ];
    }
}
