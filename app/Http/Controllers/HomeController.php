<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function indexPage()
    {
        $targetCity = City::where('slug', 'drama')->first();
        return Inertia::render('Welcome',[
            'targetCity' => $targetCity,
        ]);
    }
}
