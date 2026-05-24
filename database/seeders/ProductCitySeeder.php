<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Product;
use App\Models\ProductCity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $city = City::where('slug', 'drama')->first();
        for ($i = 0; $i < 50; $i++) {
            $product = Product::inRandomOrder()->first();
            $citysProductExists = ProductCity::where('city_id', $city->id)
                ->where('product_id', $product->id)
                ->exists();

            if (!$citysProductExists) {
                $cityProduct = new ProductCity();
                $cityProduct->city_id = $city->id;
                $cityProduct->product_id = $product->id;
                $cityProduct->save();
            }
        }
    }
}
