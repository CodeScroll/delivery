<?php

namespace App\Models;

use App\Helpers\General;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    function city()
    {
        return $this->belongsTo(City::class);
    }

    public function getLogo(): string
    {
        return $this->logo
            ? asset('images/companies/logo/' . $this->logo)
            : asset('images/default-company.png');
    }

    function fullAddress()
    {
        return General::addressStr($this->city, $this->address, $this->address_street, null);
    }
}
