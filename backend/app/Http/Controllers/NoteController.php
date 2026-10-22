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
     * Liste des notes
     */
    public function index()
    {

        $user = Auth::user();


        // ADMIN : toutes les notes

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



        // ENSEIGNANT : uniquement ses notes

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
     * Ajouter une note
     */
    public function store(Request $request)
    {


        $request->validate([


            'eleve_id'=>
            'required|exists:eleves,id',


            'matiere_id'=>
            'required|exists:matieres,id',


            'enseignant_id'=>
            'nullable|exists:enseignants,id',


            'note'=>
            'required|numeric|min:0|max:20'


        ],
        [


            'note.min'=>
            'La note minimum est 0',


            'note.max'=>
            'La note maximum est 20'


        ]);






        $user = Auth::user();


        $enseignant_id = null;






        // Vérification enseignant

        if($user->role !== 'ADMIN')
        {


            $enseignant = $user->enseignant;



            if(!$enseignant)
            {

                return response()->json([

                    'message'=>'Aucun enseignant associé.'

                ],403);

            }




            $enseignant_id = $enseignant->id;




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
                    'Vous n êtes pas autorisé à saisir cette note.'

                ],403);

            }


        }
        else
        {

            $enseignant_id =
            $request->enseignant_id;

        }








        $note = Note::create([


            'eleve_id'=>
            $request->eleve_id,


            'matiere_id'=>
            $request->matiere_id,


            'enseignant_id'=>
            $enseignant_id,


            'note'=>
            $request->note


        ]);







        return response()->json([


            'message'=>
            'Note ajoutée avec succès',


            'note'=>

            $note->load([

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
    public function update(
        Request $request,
        Note $note
    )
    {


        $request->validate([


            'eleve_id'=>
            'required|exists:eleves,id',


            'matiere_id'=>
            'required|exists:matieres,id',


            'note'=>
            'required|numeric|min:0|max:20'


        ]);






        $user = Auth::user();





        if($user->role !== 'ADMIN')
        {


            $enseignant =
            $user->enseignant;



            if(!$enseignant)
            {

                return response()->json([

                    'message'=>'Aucun enseignant associé.'

                ],403);

            }






            $eleve =
            Eleve::findOrFail(
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
                    'Modification non autorisée.'

                ],403);

            }




            $note->enseignant_id =
            $enseignant->id;


        }







        $note->update([


            'eleve_id'=>
            $request->eleve_id,


            'matiere_id'=>
            $request->matiere_id,


            'note'=>
            $request->note,


            'enseignant_id'=>
            $note->enseignant_id


        ]);







        return response()->json([


            'message'=>
            'Note modifiée avec succès',


            'note'=>

            $note->load([

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


            $enseignant =
            $user->enseignant;



            if(!$enseignant)
            {

                return response()->json([

                    'message'=>'Aucun enseignant associé.'

                ],403);

            }






            if($note->enseignant_id != $enseignant->id)
            {

                return response()->json([

                    'message'=>
                    'Suppression non autorisée.'

                ],403);

            }


        }






        $note->delete();






        return response()->json([


            'message'=>
            'Note supprimée avec succès'


        ]);

    }


}