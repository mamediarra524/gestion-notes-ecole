<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {


            $table->id();



            // Élève concerné
            $table->foreignId('eleve_id')
                ->constrained('eleves')
                ->cascadeOnDelete();



            // Matière
            $table->foreignId('matiere_id')
                ->constrained('matieres')
                ->cascadeOnDelete();



            // Enseignant qui saisit la note
            $table->foreignId('enseignant_id')
                ->nullable()
                ->constrained('enseignants')
                ->nullOnDelete();



            // Note sur 20
            $table->decimal('note',5,2);



            $table->timestamps();


        });
    }



    public function down(): void
    {
        Schema::dropIfExists('notes');
    }

};
