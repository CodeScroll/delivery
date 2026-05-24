<?php

namespace App\Models;

use App\Models\Category;
use App\Models\City;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function cities()
    {
        return $this->belongsToMany(City::class, 'products_cities');
    }
}
