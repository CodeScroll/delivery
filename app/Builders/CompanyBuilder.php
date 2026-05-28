<?php

namespace App\Builders;

use App\Services\CacheManager;
use Illuminate\Support\Facades\Lang;

class CompanyBuilder
{
    protected object $request;
    protected object $workingHours;

    function __construct(object $request)
    {
        $this->request = $request;
    }

    function getById(int $id)
    {
        $status = false;
        $msg = Lang::get('messages.not_found');

        $company = CacheManager::company($id);
        if ($this->request->has('workinghours') && $this->request->input('workinghours') == 1) {
            $this->workingHours = $company->getGroupedWorkingHours();
        }

        return [
            'status' => $status,
            'msg' => $msg,
            'company' => $company,
            'workinghours' => $this->workingHours,
        ];
    }
}
