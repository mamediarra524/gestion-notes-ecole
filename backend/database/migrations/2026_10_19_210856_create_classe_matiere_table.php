<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{

    /**
     * Création de la table pivot classe_matiere
     */
    public function up(): void
    {

        Schema::create('classe_matiere', function (Blueprint $table) {


            $table->id();



            /*
            |--------------------------------------------------------------------------
            | Relation avec les classes
            |--------------------------------------------------------------------------
            */

            $table->foreignId('classe_id')

                ->constrained()

                ->cascadeOnDelete();





            /*
            |--------------------------------------------------------------------------
            | Relation avec les matières
            |--------------------------------------------------------------------------
            */

            $table->foreignId('matiere_id')

                ->constrained()

                ->cascadeOnDelete();







            /*
            |--------------------------------------------------------------------------
            | Enseignant responsable
            |--------------------------------------------------------------------------
            */

            $table->foreignId('enseignant_id')

                ->constrained()

                ->cascadeOnDelete();







            /*
            |--------------------------------------------------------------------------
            | Coefficient de la matière dans cette classe
            |--------------------------------------------------------------------------
            |
            | Exemple :
            | 6ème A - Mathématiques = 3
            | 3ème A - Mathématiques = 5
            |
            */

            $table->integer('coefficient')

                ->default(1);







            $table->timestamps();







            /*
            |--------------------------------------------------------------------------
            | Empêcher un doublon
            |--------------------------------------------------------------------------
            |
            | Une même matière ne peut pas être affectée
            | deux fois au même enseignant dans la même classe
            |
            */

            $table->unique([

                'classe_id',

                'matiere_id',

                'enseignant_id'

            ]);



        });

    }








    /**
     * Suppression de la table
     */
    public function down(): void
    {

        Schema::dropIfExists('classe_matiere');

    }


};
