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
            'category' => $category ? $category : null,
        ];
    }
}
