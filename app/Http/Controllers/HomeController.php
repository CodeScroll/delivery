<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function indexPage()
    {
        $cities = City::whereNull('parent')->get();

        return Inertia::render('Welcome',[
            'cities' => $cities,
        ]);
    }
}
