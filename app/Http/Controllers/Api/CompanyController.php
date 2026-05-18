<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyIndexResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function get(Request $request)
    {
        $companyQuery = Company::query();

        return CompanyIndexResource::collection(
            $companyQuery->paginate(env('COMPANYINDEXLIMIT'))
        );
    }
}
