<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function get(Request $request)
    {
        if ($request->has('cityid')) {
            return response()->json(City::where('parent', $request->input('cityid'))->get());
        } else {
            return response()->json(City::whereNull('parent')->orderBy('name')->get());
        }
    }
}
