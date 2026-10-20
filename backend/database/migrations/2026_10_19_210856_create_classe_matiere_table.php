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
        Schema::create('classe_matiere', function (Blueprint $table) {

            $table->id();

            // Relation avec la table classes
            $table->foreignId('classe_id')
                ->constrained()
                ->cascadeOnDelete();


            // Relation avec la table matieres
            $table->foreignId('matiere_id')
                ->constrained()
                ->cascadeOnDelete();


            // Relation avec la table enseignants
            $table->foreignId('enseignant_id')
                ->constrained()
                ->cascadeOnDelete();


            $table->timestamps();


            // Empêche les doublons
            $table->unique([
                'classe_id',
                'matiere_id',
                'enseignant_id'
            ]);

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classe_matiere');
    }
};
