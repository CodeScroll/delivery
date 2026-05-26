<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $table = 'users_addresses';

    protected $fillable = [
        'user_id',
        'city_id',
        'address',
        'address_street',
        'floor',
        'comments',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'address_id');
    }
}
