<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Καφές',
                'slug' => 'kafes',
                'image' => 'coffee.png',
            ],
            [
                'name' => 'Ροφήματα',
                'slug' => 'rofimata',
                'image' => 'rofimata.png',
            ],
            [
                'name' => 'Τσάι',
                'slug' => 'tsai',
                'parent_category' => 'rofimata',
            ],
            [
                'name' => 'Αρτοποιήματα',
                'slug' => 'artopoiimata',
            ],
            [
                'name' => 'Τρόφιμα',
                'slug' => 'trofima',
            ],
            [
                'name' => 'Σφολιάτες',
                'slug' => 'sfoliates',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Κρύα Sandwich',
                'slug' => 'kria-sandwich',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Τοστ',
                'slug' => 'tost',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Snacks',
                'slug' => 'snacks',
            ],
            [
                'name' => 'Φροντίδα',
                'slug' => 'frontida',
            ],
            [
                'name' => 'Ζαχαροπλαστείο',
                'slug' => 'zaxaroplastio',
            ],
            [
                'name' => 'Κοσμήματα',
                'slug' => 'kosmimata',
            ],
            [
                'name' => 'Έπιπλα',
                'slug' => 'epipla',
            ],
            [
                'name' => 'Καθαριστήριο',
                'slug' => 'katharistirio',
            ],
            [
                'name' => 'Ξενοδοχείο',
                'slug' => 'ksenodoxeio',
            ],
            [
                'name' => 'Ρούχα',
                'slug' => 'rouxa',
            ],
            [
                'name' => 'Διασκέδαση',
                'slug' => 'diaskedasi',
            ],
            [
                'name' => 'Κρεατικά',
                'slug' => 'kreatika',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Ανθοπωλείο',
                'slug' => 'anthopolio',
            ],
            [
                'name' => 'Υπηρεσίες',
                'slug' => 'ipiresies',
            ],
            [
                'name' => 'Ηλεκτρολογικά',
                'slug' => 'ilektrologika',
                'parent_category' => 'ipiresies',
            ],
            [
                'name' => 'Υδραυλικά',
                'slug' => 'idraulika',
                'parent_category' => 'ipiresies',
            ],
            [
                'name' => 'Καλλιντικά',
                'slug' => 'kallintika',
                'parent_category' => 'frontida',
            ],
            [
                'name' => 'Εστιατόριο',
                'slug' => 'estiatorio',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Ταβέρνα',
                'slug' => 'taverna',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Snack Bar',
                'slug' => 'snack-bar',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Σοκολάτες',
                'slug' => 'sokolates',
                'parent_category' => 'trofima',
            ],
            [
                'name' => 'Mini Market',
                'slug' => 'mini-market',
            ],
            [
                'name' => 'Cinema',
                'slug' => 'cinema',
                'parent_category' => 'diaskedasi',
            ],
            [
                'name' => 'Θέατρο',
                'slug' => 'theatro',
                'parent_category' => 'diaskedasi',
            ],
            [
                'name' => 'Κάβα',
                'slug' => 'kava',
            ],
            [
                'name' => 'Μη αλκοολούχα',
                'slug' => 'mi-alkoolouxa',
                'parent_category' => 'rofimata',
            ],
            [
                'name' => 'Αλκοολούχα',
                'slug' => 'alkoolouxa',
                'parent_category' => 'rofimata',
            ],
            [
                'name' => 'Άλλο',
                'slug' => 'allo',
            ],
        ];

        foreach ($categories as $category) {
            $newCategory = new Category();
            $newCategory->name = $category['name'];
            $newCategory->slug = $category['slug'];
            $newCategory->parent_id = isset($category['parent_category']) ? $this->parentSlug($category['parent_category']) : null;
            $newCategory->save();
        }
    }

    function parentSlug(string $parentSlug)
    {
        $parentCategory = Category::where('slug', $parentSlug)->first();
        if ($parentCategory) {
            return $parentCategory->id;
        }

        return null;
    }
}
