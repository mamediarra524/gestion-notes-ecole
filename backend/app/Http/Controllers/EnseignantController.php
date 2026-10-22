<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use Illuminate\Http\Request;


class EnseignantController extends Controller
{


    /**
     * Liste des enseignants
     */
    public function index()
    {

        return response()->json(

            Enseignant::with([
                'user',
                'classes',
                'affectations'
            ])->get()

        );

    }







    /**
     * Ajouter un enseignant
     */
    public function store(Request $request)
    {


        $request->validate([


            'nom' => 'required|string|max:100',

            'prenom' => 'required|string|max:100',

            'email' => 'required|email|unique:enseignants,email',

            'telephone' => 'nullable|string|max:20'


        ],
        [


            'nom.required' =>
            'Le nom est obligatoire',


            'prenom.required' =>
            'Le prénom est obligatoire',


            'email.required' =>
            'L\'email est obligatoire',


            'email.email' =>
            'L\'email doit être valide',


            'email.unique' =>
            'Cet email existe déjà'


        ]);







        $enseignant = Enseignant::create([


            'nom' => $request->nom,

            'prenom' => $request->prenom,

            'email' => $request->email,

            'telephone' => $request->telephone


        ]);







        return response()->json([


            'message' =>
            'Enseignant ajouté avec succès',


            'enseignant' =>
            $enseignant


        ],201);



    }









    /**
     * Afficher un enseignant
     */
    public function show(Enseignant $enseignant)
    {


        return response()->json(

            $enseignant->load([
                'classes',
                'affectations',
                'notes'
            ])

        );


    }









    /**
     * Modifier un enseignant
     */
    public function update(
        Request $request,
        Enseignant $enseignant
    )
    {


        $request->validate([


            'nom' => 'required|string|max:100',

            'prenom' => 'required|string|max:100',

            'email' =>
            'required|email|unique:enseignants,email,' . $enseignant->id,

            'telephone' =>
            'nullable|string|max:20'


        ]);







        $enseignant->update([


            'nom' =>
            $request->nom,


            'prenom' =>
            $request->prenom,


            'email' =>
            $request->email,


            'telephone' =>
            $request->telephone


        ]);







        return response()->json([


            'message' =>
            'Enseignant modifié avec succès',


            'enseignant' =>
            $enseignant


        ]);



    }









    /**
     * Supprimer un enseignant
     */
    public function destroy(Enseignant $enseignant)
    {


        if($enseignant->affectations()->count() > 0)
        {


            return response()->json([


                'message' =>
                'Impossible de supprimer cet enseignant car il possède des affectations'


            ],422);


        }






        $enseignant->delete();






        return response()->json([


            'message' =>
            'Enseignant supprimé avec succès'


        ]);



    }


}