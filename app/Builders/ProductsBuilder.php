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

        if ($request->has('categoryid')) {
            $productQuery->where('category_id', $request->categoryid);
        }

        if ($request->has('cityid')) {
            $productQuery->whereHas('cities', function ($q) use ($request) {
                $q->where('city_id', $request->cityid);
            });
        }

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;

            $productQuery->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('slug', 'LIKE', "%{$search}%");
            });
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
