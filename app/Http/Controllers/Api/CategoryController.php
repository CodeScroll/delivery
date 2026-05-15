<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function get()
    {
        return response()->json(
            Category::whereNull('parent_id')
                ->orderBy('name')
                ->get()
        );
    }
}
