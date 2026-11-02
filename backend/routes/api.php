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
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EvaluationController;




/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/


Route::post(
    '/register',
    [
        AuthController::class,
        'register'
    ]
);



Route::post(
    '/login',
    [
        AuthController::class,
        'login'
    ]
);







/*
|--------------------------------------------------------------------------
| ROUTES PROTEGEES
|--------------------------------------------------------------------------
*/


Route::middleware('auth:sanctum')->group(function(){






    /*
    |--------------------------------------------------------------------------
    | UTILISATEUR CONNECTE
    |--------------------------------------------------------------------------
    */


    Route::get(
        '/user',
        function(Request $request){

            return $request->user();

        }
    );








    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */


    Route::get(
        '/dashboard',
        [
            DashboardController::class,
            'index'
        ]
    );









    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */


    Route::middleware('role:ADMIN')->group(function(){







        /*
        |--------------------------------------------------------------------------
        | CLASSES
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'classes',
            ClasseController::class
        )
        ->parameters([
            'classes'=>'classe'
        ]);



        Route::get(
            'classes/{classe}/moyenne',
            [
                ClasseController::class,
                'moyenne'
            ]
        );



        Route::get(
            'classes/{classe}/classement',
            [
                ClasseController::class,
                'classement'
            ]
        );








        /*
        |--------------------------------------------------------------------------
        | ELEVES
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'eleves',
            EleveController::class
        );



        Route::get(
            'eleves/{id}/moyenne',
            [
                EleveController::class,
                'moyenne'
            ]
        );









        /*
        |--------------------------------------------------------------------------
        | MATIERES
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'matieres',
            MatiereController::class
        );









        /*
        |--------------------------------------------------------------------------
        | ENSEIGNANTS
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'enseignants',
            EnseignantController::class
        );









        /*
        |--------------------------------------------------------------------------
        | AFFECTATIONS
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'classe-matieres',
            ClasseMatiereController::class
        );









        /*
        |--------------------------------------------------------------------------
        | EVALUATIONS
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'evaluations',
            EvaluationController::class
        );









        /*
        |--------------------------------------------------------------------------
        | BULLETINS
        |--------------------------------------------------------------------------
        */


        Route::get(
            'eleves/{id}/bulletin',
            [
                BulletinController::class,
                'show'
            ]
        );



        Route::get(
            'eleves/{id}/bulletin/pdf',
            [
                BulletinController::class,
                'pdf'
            ]
        );




    });









    /*
    |--------------------------------------------------------------------------
    | ADMIN + ENSEIGNANT
    |--------------------------------------------------------------------------
    */


    Route::middleware('role:ADMIN,ENSEIGNANT')->group(function(){






        /*
        |--------------------------------------------------------------------------
        | LISTE CLASSES
        |--------------------------------------------------------------------------
        */


        Route::get(
            'liste-classes',
            [
                ClasseController::class,
                'liste'
            ]
        );








        /*
        |--------------------------------------------------------------------------
        | ELEVES PAR CLASSE
        |--------------------------------------------------------------------------
        */


        Route::get(
            'classes/{classe}/eleves',
            [
                EleveController::class,
                'parClasse'
            ]
        );








        /*
        |--------------------------------------------------------------------------
        | EVALUATIONS PAR MATIERE
        |--------------------------------------------------------------------------
        */


        Route::get(
            'evaluations/matiere/{id}',
            [
                EvaluationController::class,
                'parMatiere'
            ]
        );








        /*
        |--------------------------------------------------------------------------
        | NOTES
        |--------------------------------------------------------------------------
        */


        Route::apiResource(
            'notes',
            NoteController::class
        );





    });









    /*
    |--------------------------------------------------------------------------
    | ENSEIGNANT
    |--------------------------------------------------------------------------
    */


    Route::middleware('role:ENSEIGNANT')->group(function(){





        Route::get(
            'mes-affectations',
            [
                ClasseMatiereController::class,
                'mesAffectations'
            ]
        );



    });








    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */


    Route::post(
        '/logout',
        [
            AuthController::class,
            'logout'
        ]
    );



});