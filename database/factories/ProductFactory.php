<?php

namespace Database\Factories;

use App\Helpers\SlugGenerator;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{

    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);

        return [
            'name' => $name,
            'slug' => SlugGenerator::generalSlug($name),
            'estimated_price' => $this->faker->randomFloat(2, 0, 50),
            'category_id' => rand(1,34),
        ];
    }
}
