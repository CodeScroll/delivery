<?php

namespace Database\Seeders;

use App\Models\CompanyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Καφετέρια',
                'slug' => 'caffee',
            ],
            [
                'name' => 'Καφέ Take Away',
                'slug' => 'caffee-take-away',
            ],
            [
                'name' => 'Φούρνος',
                'slug' => 'fournos',
            ],
            [
                'name' => 'Fast Food/Snack Bar',
                'slug' => 'fast-food',
            ],
            [
                'name' => 'Κρεοπωλείο',
                'slug' => 'kreopolio',
            ],
            [
                'name' => 'Super Market',
                'slug' => 'super-market',
            ],
            [
                'name' => 'Mini Market',
                'slug' => 'mini-market',
            ],
            [
                'name' => 'Φροντιστήριο',
                'slug' => 'frontistirio',
            ],
            [
                'name' => 'Θέατρο',
                'slug' => 'theatro',
            ],
            [
                'name' => 'Cinema',
                'slug' => 'cinema',
            ],
            [
                'name' => 'Ανθοπωλεία',
                'slug' => 'anthopolia',
            ],
            [
                'name' => 'Οπωροπωλεία',
                'slug' => 'oporopolia',
            ],
            [
                'name' => 'Εστιατόρια/Ταβέρνα',
                'slug' => 'estiatoria',
            ],
            [
                'name' => 'Υδραυλικος',
                'slug' => 'idraulikos',
            ],
            [
                'name' => 'Ηλεκτρολόγος',
                'slug' => 'ilektrologos',
            ],
            [
                'name' => 'Γυμναστήριο',
                'slug' => 'gimnastirio',
            ],
            [
                'name' => 'Ζαχαροπλαστείο',
                'slug' => 'zaxaroplasteio',
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
                'name' => 'Καθαρηστήριο',
                'slug' => 'katharistirio',
            ],
            [
                'name' => 'Έπιπλα',
                'slug' => 'epipla',
            ],
            [
                'name' => 'Κοσμήματα',
                'slug' => 'kosmimata',
            ],
            [
                'name' => 'Καλλιντικά',
                'slug' => 'kallintika',
            ],
        ];

        CompanyType::insert($data);
    }
}
