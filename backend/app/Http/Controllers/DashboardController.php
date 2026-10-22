<?php

namespace App\Http\Controllers;


use App\Models\Eleve;
use App\Models\Classe;
use App\Models\Matiere;
use App\Models\Enseignant;
use App\Models\Note;



class DashboardController extends Controller
{


    /**
     * Tableau de bord statistiques
     */
    public function index()
    {



        /*
        |--------------------------------------------------------------------------
        | STATISTIQUES GENERALES
        |--------------------------------------------------------------------------
        */


        $statistiques = [


            'total_eleves' => Eleve::count(),


            'total_classes' => Classe::count(),


            'total_matieres' => Matiere::count(),


            'total_enseignants' => Enseignant::count(),


            'total_notes' => Note::count(),



            'moyenne_generale' => round(

                Note::avg('note') ?? 0,

                2

            )


        ];









        /*
        |--------------------------------------------------------------------------
        | MEILLEUR ELEVE DE L'ECOLE
        |--------------------------------------------------------------------------
        */


        $meilleurEleve = Eleve::with('notes')

            ->get()

            ->map(function($eleve){



                return [


                    'nom' => $eleve->nom,


                    'prenom' => $eleve->prenom,



                    'moyenne' => round(

                        $eleve->notes->avg('note') ?? 0,

                        2

                    )


                ];



            })

            ->sortByDesc('moyenne')

            ->first();













        /*
        |--------------------------------------------------------------------------
        | STATISTIQUES PAR CLASSE
        |--------------------------------------------------------------------------
        */


        $moyenneParClasse = Classe::with('eleves.notes')

            ->get()

            ->map(function($classe){






                // Toutes les notes de la classe

                $notesClasse = $classe
                    ->eleves
                    ->flatMap(function($eleve){


                        return $eleve->notes;


                    });








                // Meilleur élève de la classe

                $meilleurEleveClasse = $classe
                    ->eleves

                    ->map(function($eleve){



                        return [


                            'nom' => $eleve->nom,


                            'prenom' => $eleve->prenom,



                            'moyenne' => round(

                                $eleve->notes->avg('note') ?? 0,

                                2

                            )


                        ];



                    })


                    ->sortByDesc('moyenne')


                    ->first();









                return [


                    'classe' => $classe->nom,



                    'moyenne' => round(

                        $notesClasse->avg('note') ?? 0,

                        2

                    ),




                    'meilleur_eleve' => $meilleurEleveClasse



                ];



            });












        /*
        |--------------------------------------------------------------------------
        | REPARTITION DES NOTES
        |--------------------------------------------------------------------------
        */


        $repartitionNotes = [




            'excellent' => Note::where(

                'note',

                '>=',

                16

            )->count(),







            'bien' => Note::whereBetween(

                'note',

                [

                    12,

                    15.99

                ]

            )->count(),







            'moyen' => Note::whereBetween(

                'note',

                [

                    10,

                    11.99

                ]

            )->count(),







            'insuffisant' => Note::where(

                'note',

                '<',

                10

            )->count(),




        ];









        /*
        |--------------------------------------------------------------------------
        | REPONSE JSON
        |--------------------------------------------------------------------------
        */


        return response()->json([



            'statistiques' => $statistiques,



            'meilleur_eleve' => $meilleurEleve,



            'moyenne_par_classe' => $moyenneParClasse,



            'repartition_notes' => $repartitionNotes



        ]);



    }


}