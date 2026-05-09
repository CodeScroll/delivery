<?php

namespace Database\Factories;

use App\Helpers\General;
use App\Helpers\SlugGenerator;
use App\Models\City;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
{
    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomCity = City::where('slug', 'drama')->first();
        return [
            'name' => $this->faker->name(),
            'slug' => SlugGenerator::generalSlug($this->faker->name()),
            'unique_id' => General::generateUniqueId(Company::class),
            'address' => 'Test',
            'address_street' => '21',
            'type_id' => rand(1, 10),
            'city_id' => $randomCity->id,
        ];
    }
}
