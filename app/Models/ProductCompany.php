<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;

class ProductCompany extends Model
{
    protected $table = 'products_companies';

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
