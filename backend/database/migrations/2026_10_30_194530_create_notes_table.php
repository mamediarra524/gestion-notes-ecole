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



            /*
            |--------------------------------------------------------------------------
            | Élève
            |--------------------------------------------------------------------------
            */

            $table->foreignId('eleve_id')

                  ->constrained()

                  ->cascadeOnDelete();





            /*
            |--------------------------------------------------------------------------
            | Évaluation
            |--------------------------------------------------------------------------
            */

            $table->foreignId('evaluation_id')

                  ->constrained()

                  ->cascadeOnDelete();






            /*
            |--------------------------------------------------------------------------
            | Note sur 20
            |--------------------------------------------------------------------------
            */

            $table->decimal('note',5,2);





            $table->timestamps();


        });


    }





    public function down(): void
    {


        Schema::dropIfExists('notes');


    }


};
