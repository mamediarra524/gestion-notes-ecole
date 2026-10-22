<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{

    /**
     * Création des tables utilisateurs
     */
    public function up(): void
    {


        Schema::create('users', function (Blueprint $table) {


            $table->id();



            // Nom utilisateur
            $table->string('name');



            // Email connexion
            $table->string('email')
                  ->unique();



            $table->timestamp('email_verified_at')
                  ->nullable();



            // Mot de passe
            $table->string('password');



            /*
            |--------------------------------------------------------------------------
            | Rôle utilisateur
            |--------------------------------------------------------------------------
            |
            | ADMIN       : gestion complète
            | ENSEIGNANT  : saisie notes
            | ELEVE       : consultation
            | PARENT      : consultation enfant
            |
            */

            $table->string('role')
                  ->default('ENSEIGNANT');



            $table->rememberToken();



            $table->timestamps();


        });







        /*
        |--------------------------------------------------------------------------
        | Table tokens réinitialisation mot de passe
        |--------------------------------------------------------------------------
        */

        Schema::create('password_reset_tokens', function (Blueprint $table) {


            $table->string('email')
                  ->primary();


            $table->string('token');


            $table->timestamp('created_at')
                  ->nullable();


        });







        /*
        |--------------------------------------------------------------------------
        | Sessions utilisateurs
        |--------------------------------------------------------------------------
        */

        Schema::create('sessions', function (Blueprint $table) {


            $table->string('id')
                  ->primary();



            $table->foreignId('user_id')
                  ->nullable()
                  ->index();



            $table->string('ip_address', 45)
                  ->nullable();



            $table->text('user_agent')
                  ->nullable();



            $table->text('payload');



            $table->integer('last_activity')
                  ->index();



        });


    }







    /**
     * Suppression des tables
     */
    public function down(): void
    {


        Schema::dropIfExists('sessions');


        Schema::dropIfExists('password_reset_tokens');


        Schema::dropIfExists('users');


    }


};