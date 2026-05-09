<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('logo')->nullable();
            $table->char('unique_id', 7)->unique();
            $table->string('phone_landline')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('address_street')->nullable();
            $table->string('lat')->nullable();
            $table->string('lon')->nullable();
            $table->foreignId('city_id')->constrained('cities');
            $table->foreignId('type_id')->nullable()->constrained('company_types');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
