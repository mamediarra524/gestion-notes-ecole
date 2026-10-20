<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ajoute le rôle de l'utilisateur.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->string('role')
                  ->default('ENSEIGNANT')
                  ->after('password');

        });
    }

    /**
     * Supprime le rôle si on annule la migration.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn('role');

        });
    }
};