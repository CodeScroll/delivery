<?php

namespace App\Builders;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class OrderBuilder
{
    protected object $user;
    protected object $address;
    protected object $order;
    protected ?string $orderDate = null;
    protected ?string $orderTime = null;
    protected string $type;

    function __construct()
    {
        $this->user = Auth::user();
    }

    function store(object $request)
    {
        $status = false;
        $msg = Lang::get('messages.not_found');
        $redirectUrl = null;

        $this->type = $request->type;
        $this->orderDate = $request->order_date ?? null;
        $this->orderTime = $request->order_time ?? null;
        $this->address = $this->user->addresses()->where('id', $request->address)->first();
        $this->order = $this->insertOrder();

        if ($this->order) {
            $status = true;
            $redirectUrl = route('order.show', $this->order->id);
        }

        return [
            'status' => $status,
            'msg' => $msg,
            'redirecturl' => $redirectUrl,
            'order' => $this->order
        ];
    }

    function insertOrder()
    {
        $order = new Order();
        $order->user_id = $this->user->id;
        $order->address_id = $this->address->id;
        $order->type = $this->type;
        $order->order_date = $this->orderDate;
        $order->order_time = $this->orderTime;
        $order->save();
        return $order;
    }
}
