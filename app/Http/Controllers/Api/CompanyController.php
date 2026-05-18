<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyIndexResource;
use App\Models\City;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function get(Request $request)
    {
        $companyQuery = Company::query();

        if ($request->has('cityid')) {
            $city = City::where('id', $request->cityid)->first();
            if ($city) {
                $parentCity = $city->getTopParent();
                $companyQuery->where('city_id', $parentCity->id);
            }
        }

        return CompanyIndexResource::collection(
            $companyQuery->paginate(env('COMPANYINDEXLIMIT'))
        );
    }
}
