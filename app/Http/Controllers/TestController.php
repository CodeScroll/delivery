<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class TestController extends Controller
{
    function index()
    {
        // $product = Product::find(1);

        // $company = $product->productCompanies()
        //     ->join('companies', 'companies.id', '=', 'products_companies.company_id')
        //     ->where('products_companies.company_id', 38)
        //     ->first([
        //         'companies.id',
        //         'companies.name',
        //         'companies.slug',
        //     ]);

        // dd($company);
    }
}
