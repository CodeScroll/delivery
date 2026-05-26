<?php

namespace App\Models;

use App\Models\Category;
use App\Models\City;
use App\Models\Company;
use App\Models\ProductCompany;
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

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'products_companies');
    }

    public function productCompanies()
    {
        return $this->hasMany(ProductCompany::class, 'product_id');
    }
}
