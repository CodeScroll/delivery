<?php

namespace App\Helpers;

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
}
