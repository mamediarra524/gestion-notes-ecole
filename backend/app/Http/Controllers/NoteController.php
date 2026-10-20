<?php

namespace App\Http\Controllers;


use App\Models\Note;
use App\Models\Eleve;
use App\Models\ClasseMatiere;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class NoteController extends Controller
{


    /**
     * Afficher les notes selon le rôle
     */
    public function index()
    {

        $user = Auth::user();



        // ==========================
        // ADMIN
        // Toutes les notes
        // ==========================
        if($user->role === 'ADMIN')
        {

            return response()->json(

                Note::with([
                    'eleve',
                    'matiere',
                    'enseignant'
                ])->get()

            );

        }





        // ==========================
        // ENSEIGNANT
        // Ses propres notes uniquement
        // ==========================


        $enseignant = $user->enseignant;



        if(!$enseignant)
        {

            return response()->json([

                'message'=>'Aucun enseignant associé à ce compte.'

            ],403);

        }





        $notes = Note::with([

            'eleve',
            'matiere',
            'enseignant'

        ])

        ->where(
            'enseignant_id',
            $enseignant->id
        )

        ->get();





        return response()->json($notes);

    }







    /**
     * Créer une note
     */
    public function store(Request $request)
    {


        $request->validate([

            'eleve_id'=>'required|exists:eleves,id',

            'matiere_id'=>'required|exists:matieres,id',

            'note'=>'required|numeric|min:0|max:20'

        ]);





        $user = Auth::user();


        $enseignant_id = null;





        // ==========================
        // Vérification enseignant
        // ==========================

        if($user->role !== 'ADMIN')
        {


            $enseignant = $user->enseignant;



            if(!$enseignant)
            {

                return response()->json([

                    'message'=>'Aucun enseignant associé à ce compte.'

                ],403);

            }





            $enseignant_id = $enseignant->id;




            $eleve = Eleve::findOrFail(
                $request->eleve_id
            );





            // Vérifier affectation classe/matière/enseignant

            $autorise = ClasseMatiere::where(

                'classe_id',

                $eleve->classe_id

            )

            ->where(

                'matiere_id',

                $request->matiere_id

            )

            ->where(

                'enseignant_id',

                $enseignant->id

            )

            ->exists();





            if(!$autorise)
            {

                return response()->json([

                    'message'=>
                    'Vous n’êtes pas autorisé à saisir cette note.'

                ],403);

            }


        }







        $note = Note::create([


            'eleve_id'=>$request->eleve_id,


            'matiere_id'=>$request->matiere_id,


            'enseignant_id'=>$enseignant_id,


            'note'=>$request->note


        ]);







        return response()->json([


            'message'=>'Note créée avec succès',


            'note'=>$note->load([

                'eleve',

                'matiere',

                'enseignant'

            ])


        ],201);


    }









    /**
     * Afficher une note
     */
    public function show(Note $note)
    {


        return response()->json(

            $note->load([

                'eleve',

                'matiere',

                'enseignant'

            ])

        );


    }









    /**
     * Modifier une note
     */
    public function update(Request $request, Note $note)
    {


        $request->validate([


            'eleve_id'=>'required|exists:eleves,id',


            'matiere_id'=>'required|exists:matieres,id',


            'note'=>'required|numeric|min:0|max:20'


        ]);






        $user = Auth::user();







        if($user->role !== 'ADMIN')
        {


            $enseignant = $user->enseignant;





            if(!$enseignant)
            {

                return response()->json([

                    'message'=>'Aucun enseignant associé à ce compte.'

                ],403);

            }






            $eleve = Eleve::findOrFail(
                $request->eleve_id
            );







            $autorise = ClasseMatiere::where(

                'classe_id',

                $eleve->classe_id

            )

            ->where(

                'matiere_id',

                $request->matiere_id

            )

            ->where(

                'enseignant_id',

                $enseignant->id

            )

            ->exists();







            if(!$autorise)
            {

                return response()->json([

                    'message'=>
                    'Vous n’êtes pas autorisé à modifier cette note.'

                ],403);

            }






            $note->enseignant_id = $enseignant->id;


        }








        $note->update([


            'eleve_id'=>$request->eleve_id,


            'matiere_id'=>$request->matiere_id,


            'note'=>$request->note,


            'enseignant_id'=>$note->enseignant_id


        ]);







        return response()->json([


            'message'=>'Note modifiée avec succès',


            'note'=>$note->load([

                'eleve',

                'matiere',

                'enseignant'

            ])


        ]);

    }









    /**
     * Supprimer une note
     */
    public function destroy(Note $note)
    {


        $user = Auth::user();






        if($user->role !== 'ADMIN')
        {


            $enseignant = $user->enseignant;





            if(!$enseignant)
            {

                return response()->json([

                    'message'=>'Aucun enseignant associé à ce compte.'

                ],403);

            }







            $eleve = $note->eleve;







            $autorise = ClasseMatiere::where(

                'classe_id',

                $eleve->classe_id

            )

            ->where(

                'matiere_id',

                $note->matiere_id

            )

            ->where(

                'enseignant_id',

                $enseignant->id

            )

            ->exists();







            if(!$autorise)
            {

                return response()->json([

                    'message'=>
                    'Vous n’êtes pas autorisé à supprimer cette note.'

                ],403);

            }


        }







        $note->delete();







        return response()->json([


            'message'=>'Note supprimée avec succès'


        ]);

    }



}