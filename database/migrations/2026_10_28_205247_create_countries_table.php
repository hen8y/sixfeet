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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->char('code', 2)->unique();
            $table->string('name');
            $table->string('locale', 10);
            $table->char('currency_code', 3);
            $table->string('currency_name');
            $table->string('currency_symbol', 8);
            $table->json('flag_colours');
            $table->string('support_phone')->nullable();
            $table->string('support_whatsapp')->nullable();
            $table->string('support_hours')->nullable();
            $table->boolean('is_active')->default(false)->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
