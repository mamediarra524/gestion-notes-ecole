<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\ClasseMatiereController;
use App\Http\Controllers\BulletinController;



/*
|--------------------------------------------------------------------------
| Authentification
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);





Route::middleware('auth:sanctum')->group(function () {



    /*
    |--------------------------------------------------------------------------
    | Utilisateur connecté
    |--------------------------------------------------------------------------
    */


    Route::get('/user', function (Request $request) {

        return $request->user();

    });









    /*
    |--------------------------------------------------------------------------
    | CRUD Classes
    |--------------------------------------------------------------------------
    */


    Route::apiResource('classes', ClasseController::class)

        ->parameters([

            'classes' => 'classe'

        ]);



    Route::get(
        'classes/{id}/moyenne',
        [ClasseController::class, 'moyenne']
    );



    Route::get(
        'classes/{id}/classement',
        [ClasseController::class, 'classement']
    );











    /*
    |--------------------------------------------------------------------------
    | CRUD Élèves
    |--------------------------------------------------------------------------
    */


    Route::apiResource('eleves', EleveController::class)

        ->parameters([

            'eleves' => 'eleve'

        ]);





    Route::get(
        'eleves/{id}/moyenne',
        [EleveController::class, 'moyenne']
    );





    /*
    |--------------------------------------------------------------------------
    | Bulletins
    |--------------------------------------------------------------------------
    */


    // Affichage bulletin JSON

    Route::get(
        'eleves/{id}/bulletin',
        [BulletinController::class, 'show']
    );



    // Génération bulletin PDF

    Route::get(
        'eleves/{id}/bulletin/pdf',
        [BulletinController::class, 'pdf']
    );









    /*
    |--------------------------------------------------------------------------
    | CRUD Matières
    |--------------------------------------------------------------------------
    */


    Route::apiResource('matieres', MatiereController::class)

        ->parameters([

            'matieres' => 'matiere'

        ]);











    /*
    |--------------------------------------------------------------------------
    | CRUD Enseignants
    |--------------------------------------------------------------------------
    */


    Route::apiResource('enseignants', EnseignantController::class)

        ->parameters([

            'enseignants' => 'enseignant'

        ]);











    /*
    |--------------------------------------------------------------------------
    | Affectation
    | Classe - Matière - Enseignant
    |--------------------------------------------------------------------------
    */


    Route::apiResource(
        'classe-matieres',
        ClasseMatiereController::class
    )

    ->parameters([

        'classe-matieres' => 'classeMatiere'

    ]);











    /*
    |--------------------------------------------------------------------------
    | CRUD Notes
    |--------------------------------------------------------------------------
    */


    Route::apiResource('notes', NoteController::class)

        ->parameters([

            'notes' => 'note'

        ]);



});