<?php

namespace App\Http\Controllers\Auth;

use App\Builders\OrderBuilder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    function store(Request $request)
    {
        $orderBuilder = new OrderBuilder();
        return $orderBuilder->store($request);
    }

    function show(int $id)
    {
        $order = Auth::user()->orders()->where('id', $id)->firstOrFail();
        return inertia('Order/Show', [
            'order' => $order
        ]);
    }
}
