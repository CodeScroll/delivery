<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Product;
use App\Models\ProductCompany;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::inRandomOrder()->take(20)->get();
        foreach ($companies as $company) {

            for ($i = 0; $i < 10; $i++) {
                $product = Product::inRandomOrder()->first();
                $companyProductExists = ProductCompany::where('company_id', $company->id)
                    ->where('product_id', $product->id)
                    ->exists();

                if (!$companyProductExists) {
                    $companyProduct = new ProductCompany();
                    $companyProduct->company_id = $company->id;
                    $companyProduct->product_id = $product->id;
                    $companyProduct->price = rand(1, 1000) / 10;
                    $companyProduct->save();
                }
            }
        }
    }
}
