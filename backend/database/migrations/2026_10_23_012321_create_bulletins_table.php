<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{

    public function up(): void
    {

        Schema::create('bulletins', function (Blueprint $table) {


            $table->id();


            $table->foreignId('eleve_id')
                  ->constrained('eleves')
                  ->cascadeOnDelete();



            $table->string('semestre');



            $table->decimal(
                'moyenne_generale',
                5,
                2
            )->default(0);



            $table->integer('rang')
                  ->nullable();



            $table->text('appreciation')
                  ->nullable();



            $table->timestamps();


        });

    }



    public function down(): void
    {

        Schema::dropIfExists('bulletins');

    }

};
