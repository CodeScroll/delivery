<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanyWorkingHour;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class CompanyWorkingHoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::get();

        $companies->each(function ($company) {

            foreach (range(0, 6) as $day) {

                $isClosed = rand(0, 100) < 20;

                if ($isClosed) {
                    continue;
                }

                $intervals = rand(1, 2);

                $used = [];

                for ($i = 0; $i < $intervals; $i++) {

                    $availableSlots = [
                        ['09:00', '14:00'],
                        ['10:00', '15:00'],
                        ['18:00', '21:00'],
                        ['17:00', '22:00'],
                    ];

                    $slot = Arr::random($availableSlots);

                    if (in_array($slot, $used)) {
                        continue;
                    }

                    $used[] = $slot;

                    CompanyWorkingHour::create([
                        'company_id' => $company->id,
                        'day_of_week' => $day,
                        'opens_at' => $slot[0],
                        'closes_at' => $slot[1],
                    ]);
                }
            }
        });
    }
}
