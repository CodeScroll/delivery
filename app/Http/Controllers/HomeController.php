<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function indexPage()
    {
        $defaultCity = City::where('slug', 'drama')->first();
        return Inertia::render('Welcome',[
            'defaultCity' => $defaultCity,
        ]);
    }
}
