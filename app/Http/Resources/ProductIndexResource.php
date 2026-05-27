<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $category = $this->category()->select('id', 'name')->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'estimated_price' => $this->estimated_price,
            'price' => $this->company_id ? $this->price : null,
            'company_id' => $this->company_id ? $this->company_id : null,
            'company_name' => $this->company_name ? $this->company_name : null,
            'company_slug' => $this->company_slug ? $this->company_slug : null,
            'category' => $category ? $category : null,
        ];
    }
}
