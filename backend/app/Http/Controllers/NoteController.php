<?php

namespace App\Http\Controllers;


use App\Models\Note;
use App\Models\Evaluation;
use Illuminate\Http\Request;



class NoteController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | Vérifier autorisation enseignant
    |--------------------------------------------------------------------------
    */


    private function verifierAutorisation($evaluation)
    {


        $user = auth()->user();



        // ADMIN a tous les droits

        if($user->role === 'ADMIN')
        {

            return true;

        }





        // ENSEIGNANT seulement ses matières


        return $evaluation

            ->matiere

            ->enseignants()

            ->where(

                'enseignants.user_id',

                $user->id

            )

            ->exists();



    }









    /*
    |--------------------------------------------------------------------------
    | LISTE DES NOTES
    |--------------------------------------------------------------------------
    */


    public function index()
    {


        $user = auth()->user();





        // ADMIN voit toutes les notes


        if($user->role === 'ADMIN')
        {


            return Note::with([

                'eleve.classe',

                'evaluation.matiere'

            ])

            ->get();



        }







        // ENSEIGNANT voit uniquement ses matières


        return Note::whereHas(

            'evaluation.matiere.enseignants',

            function($query) use ($user){


                $query->where(

                    'enseignants.user_id',

                    $user->id

                );


            }

        )

        ->with([

            'eleve.classe',

            'evaluation.matiere'

        ])

        ->get();



    }









    /*
    |--------------------------------------------------------------------------
    | AJOUT NOTE
    |--------------------------------------------------------------------------
    */


    public function store(Request $request)
    {


        $request->validate([


            'eleve_id'=>'required|exists:eleves,id',


            'evaluation_id'=>'required|exists:evaluations,id',


            'note'=>'required|numeric|min:0|max:20'


        ]);







        $evaluation = Evaluation::with('matiere')

            ->findOrFail(

                $request->evaluation_id

            );








        if(!$this->verifierAutorisation($evaluation))
        {


            return response()->json([

                'message'=>'Vous ne pouvez pas saisir cette matière'

            ],403);


        }








        $note = Note::updateOrCreate(


            [


                'eleve_id'=>$request->eleve_id,


                'evaluation_id'=>$request->evaluation_id


            ],



            [


                'note'=>$request->note


            ]



        );








        return response()->json([


            'message'=>'Note enregistrée avec succès',


            'note'=>$note->load([


                'eleve.classe',


                'evaluation.matiere'


            ])


        ]);



    }









    /*
    |--------------------------------------------------------------------------
    | AFFICHER UNE NOTE
    |--------------------------------------------------------------------------
    */


    public function show($id)
    {


        return Note::with([

            'eleve.classe',

            'evaluation.matiere'

        ])

        ->findOrFail($id);


    }









    /*
    |--------------------------------------------------------------------------
    | MODIFIER NOTE
    |--------------------------------------------------------------------------
    */


    public function update(Request $request,$id)
    {


        $request->validate([


            'note'=>'required|numeric|min:0|max:20'


        ]);







        $note = Note::with(

            'evaluation.matiere'

        )

        ->findOrFail($id);








        if(!$this->verifierAutorisation($note->evaluation))
        {


            return response()->json([

                'message'=>'Modification interdite'

            ],403);


        }








        $note->update([


            'note'=>$request->note


        ]);







        return response()->json([


            'message'=>'Note modifiée avec succès',


            'note'=>$note->load([


                'eleve.classe',


                'evaluation.matiere'


            ])


        ]);



    }









    /*
    |--------------------------------------------------------------------------
    | SUPPRIMER NOTE
    |--------------------------------------------------------------------------
    */


    public function destroy($id)
    {


        $note = Note::with(

            'evaluation.matiere'

        )

        ->findOrFail($id);








        if(!$this->verifierAutorisation($note->evaluation))
        {


            return response()->json([

                'message'=>'Suppression interdite'

            ],403);


        }








        $note->delete();








        return response()->json([


            'message'=>'Note supprimée avec succès'


        ]);



    }



}