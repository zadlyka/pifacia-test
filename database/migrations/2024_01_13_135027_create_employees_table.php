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
        Schema::create('employees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('division_id');
            $table->string('name');
            $table->dateTime('start_at')->default(now());
            $table->dateTime('end_at')->default(now());
            $table->boolean('actived')->default(true);
            $table->json('permissions')->nullable();
            $table->string('file')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('division_id')->references('id')->on('divisions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
