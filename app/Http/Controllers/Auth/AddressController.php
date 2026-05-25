<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    function get(Request $request)
    {
        $user = Auth::user();
        return response()->json($user->addresses);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $address = $user->addresses()->create([
            'city_id' => $request->city,
            'address' => $request->address,
            'address_street' => $request->address_street,
            'floor' => $request->floor,
            'comments' => $request->comments,
        ]);

        return response()->json($address, 201);
    }
}
