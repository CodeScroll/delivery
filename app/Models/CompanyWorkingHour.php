<?php

namespace App\Models;

use App\Helpers\DayOfWeek;
use Illuminate\Database\Eloquent\Model;

class CompanyWorkingHour extends Model
{
    protected $table = 'companies_workinghours';

    protected $fillable = [
        'company_id',
        'day_of_week',
        'opens_at',
        'closes_at',
    ];

    protected $casts = [
        'day_of_week' => DayOfWeek::class,
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
