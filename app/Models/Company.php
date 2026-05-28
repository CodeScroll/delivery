<?php

namespace App\Models;

use App\Helpers\General;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    function city()
    {
        return $this->belongsTo(City::class);
    }

    public function getLogo(): string
    {
        return $this->logo
            ? asset('images/companies/logo/' . $this->logo)
            : asset('images/default-company.png');
    }

    function fullAddress()
    {
        return General::addressStr($this->city, $this->address, $this->address_street, null);
    }

    public function workingHours()
    {
        return $this->hasMany(CompanyWorkingHour::class);
    }

    public function getGroupedWorkingHours()
    {
        return $this->workingHours
            ->groupBy('day_of_week')
            ->map(function ($items, $day) {
                return [
                    'day_of_week' => (int) $day,
                    'slots' => $items->map(function ($item) {
                        return [
                            'opens_at' => $item->opens_at,
                            'closes_at' => $item->closes_at,
                        ];
                    })->values(),
                ];
            })
            ->values();
    }

    public function setting()
    {
        return $this->hasOne(CompanySetting::class, 'company_id');
    }
}
