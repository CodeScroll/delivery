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
            if ($request->has('parent') && $request->has('parent') == 1) {
                $city = City::where('id', $request->cityid)->first();
                if ($city->parent) {
                    return response()->json(City::where('parent', $city->parent)->get());
                }
            } else {
                return response()->json(City::where('parent', $request->input('cityid'))->get());
            }
        }

        return response()->json(City::whereNull('parent')->orderBy('name')->get());
    }
}
