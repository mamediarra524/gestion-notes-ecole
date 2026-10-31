<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


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
     * Ajouter un enseignant + créer son compte
     */
    public function store(Request $request)
    {


        $request->validate([


            'nom' => 
            'required|string|max:100',


            'prenom' => 
            'required|string|max:100',


            'email' =>
            'required|email|unique:users,email|unique:enseignants,email',


            'telephone' =>
            'nullable|string|max:20',


            'password' =>
            'required|string|min:6|confirmed'


        ]);









        // Création du compte utilisateur

        $user = User::create([


            'name' =>

            $request->nom . ' ' . $request->prenom,


            'email' =>

            $request->email,


            'password' =>

            Hash::make($request->password),


            'role' =>

            'ENSEIGNANT'


        ]);









        // Création de la fiche enseignant

        $enseignant = Enseignant::create([


            'nom' =>

            $request->nom,


            'prenom' =>

            $request->prenom,


            'email' =>

            $request->email,


            'telephone' =>

            $request->telephone,


            'user_id' =>

            $user->id


        ]);









        return response()->json([


            'message' =>

            'Enseignant et compte créés avec succès',


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

                'user',
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


            'nom' =>

            'required|string|max:100',


            'prenom' =>

            'required|string|max:100',


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









        // Mise à jour du compte utilisateur

        if($enseignant->user)
        {


            $enseignant->user->update([


                'name' =>

                $request->nom . ' ' . $request->prenom,


                'email' =>

                $request->email


            ]);


        }









        return response()->json([


            'message' =>

            'Enseignant modifié avec succès',


            'enseignant' =>

            $enseignant


        ]);



    }









    /**
     * Réinitialiser le mot de passe
     */
    public function resetPassword(

        Enseignant $enseignant

    )
    {


        if(!$enseignant->user)
        {


            return response()->json([


                'message' =>

                'Cet enseignant ne possède pas de compte utilisateur'


            ],422);


        }









        // Mot de passe temporaire

        $nouveauMotDePasse = "Ecole@2026";









        // Modification du mot de passe

        $enseignant->user->update([


            'password' =>

            Hash::make($nouveauMotDePasse)


        ]);









        return response()->json([


            'message' =>

            'Mot de passe réinitialisé avec succès',


            'password' =>

            $nouveauMotDePasse


        ]);



    }









    /**
     * Supprimer un enseignant
     */
    public function destroy(

        Enseignant $enseignant

    )
    {


        if($enseignant->affectations()->count() > 0)
        {


            return response()->json([


                'message' =>

                'Impossible de supprimer cet enseignant car il possède des affectations'


            ],422);


        }









        // Supprimer le compte utilisateur associé

        if($enseignant->user)
        {


            $enseignant->user->delete();


        }









        // Supprimer l'enseignant

        $enseignant->delete();









        return response()->json([


            'message' =>

            'Enseignant supprimé avec succès'


        ]);



    }


}