<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    public function parentCity()
    {
        return $this->belongsTo(City::class, 'parent');
    }

    public function getTopParent()
    {
        if (!$this->parent) {
            return $this;
        }

        $parent = $this->parentCity;

        if (!$parent) {
            return $this;
        }

        return $parent->getTopParent();
    }
}
