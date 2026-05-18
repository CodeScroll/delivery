<?php

namespace App\Helpers;

use App\Models\City;
use Illuminate\Support\Facades\Lang;

class General
{
    static function generateUniqueId($class, $column = 'unique_id', $length = 7)
    {
        $digits = '';

        do {

            $digits = '';

            for ($i = 0; $i < $length; $i++) {
                $digits .= random_int(0, 9);
            }

            $uniqueIdExist = $class::where($column, $digits)->first();
        } while ($uniqueIdExist);

        return $digits;
    }

    static function addressStr(?City $city, string $address, ?string $street = null, ?string $floor = null)
    {
        $str = $city ? $city->name . ', ' : '';
        $str .= $address;

        if ($street) {
            $str .= ' ' . $street;
        }

        if ($floor) {
            $str .= ', ' . Lang::get('messages.floor') . ' ' . $floor;
        }

        return $str;
    }
}
