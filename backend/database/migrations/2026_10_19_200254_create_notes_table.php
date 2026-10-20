<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Créer la table notes
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {

            $table->id();

            // Relation avec la table eleves
            $table->foreignId('eleve_id')
                  ->constrained('eleves')
                  ->cascadeOnDelete();

            // Relation avec la table matieres
            $table->foreignId('matiere_id')
                  ->constrained('matieres')
                  ->cascadeOnDelete();

            // Valeur de la note
            $table->decimal('note', 5, 2);

            $table->timestamps();
        });
    }


    /**
     * Supprimer la table notes
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
