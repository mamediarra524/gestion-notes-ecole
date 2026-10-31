<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{

    public function up(): void
    {

        Schema::create('evaluations', function (Blueprint $table) {


            $table->id();


            $table->string('libelle');


            $table->date('date');


            $table->decimal('coefficient',5,2)
                  ->default(1);



            $table->foreignId('matiere_id')
                  ->constrained()
                  ->cascadeOnDelete();



            $table->timestamps();


        });

    }





    public function down(): void
    {

        Schema::dropIfExists('evaluations');

    }

};
