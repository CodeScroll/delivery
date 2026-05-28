<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Models\Company;

class CacheManager
{
    public static function company(string $id)
    {
        return Cache::remember("company_{$id}", 3600, function () use ($id) {
            return Company::find($id);
        });
    }
}
