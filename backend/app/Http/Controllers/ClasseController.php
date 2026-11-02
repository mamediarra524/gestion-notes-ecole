<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;


class ClasseController extends Controller
{


    /**
     * ADMIN :
     * Afficher toutes les classes
     */
    public function index()
    {

        return response()->json(
            Classe::all()
        );

    }







    /**
     * ADMIN + ENSEIGNANT :
     * Liste des classes
     */
    public function liste()
    {

        return response()->json(
            Classe::all()
        );

    }








    /**
     * ADMIN :
     * Créer une classe
     */
    public function store(Request $request)
    {


        $request->validate([

            'nom'=>'required|string',

            'niveau'=>'required|string'

        ]);



        $classe = Classe::create([

            'nom'=>$request->nom,

            'niveau'=>$request->niveau

        ]);



        return response()->json([

            'message'=>'Classe créée avec succès',

            'classe'=>$classe

        ],201);


    }









    /**
     * ADMIN :
     * Afficher une classe
     */
    public function show(Classe $classe)
    {

        return response()->json(

            $classe->load('eleves')

        );

    }









    /**
     * ADMIN :
     * Modifier une classe
     */
    public function update(Request $request, Classe $classe)
    {


        $request->validate([

            'nom'=>'required|string',

            'niveau'=>'required|string'

        ]);



        $classe->update([

            'nom'=>$request->nom,

            'niveau'=>$request->niveau

        ]);



        return response()->json([

            'message'=>'Classe modifiée avec succès',

            'classe'=>$classe

        ]);


    }









    /**
     * ADMIN :
     * Supprimer une classe
     */
    public function destroy(Classe $classe)
    {


        \Log::info("Suppression classe", [

            'id'=>$classe->id,

            'nom'=>$classe->nom

        ]);




        // Suppression des élèves liés
        // (évite les blocages de clé étrangère)

        $classe->eleves()->delete();




        $supprime = $classe->delete();




        \Log::info("Résultat suppression", [

            'resultat'=>$supprime

        ]);





        return response()->json([


            'message'=>'Classe supprimée avec succès',


            'supprime'=>$supprime,


            'id'=>$classe->id


        ]);



    }









    /**
     * Moyenne générale classe
     */
    public function moyenne($id)
    {


        $classe = Classe::with(

            'eleves.notes.matiere'

        )->findOrFail($id);



        $totalPoints=0;

        $totalCoefficients=0;



        foreach($classe->eleves as $eleve)

        {


            foreach($eleve->notes as $note)

            {


                $coefficient =

                $note->matiere->coefficient;



                $totalPoints +=

                $note->note * $coefficient;



                $totalCoefficients +=

                $coefficient;


            }


        }





        $moyenne=0;



        if($totalCoefficients>0)

        {

            $moyenne =

            $totalPoints /

            $totalCoefficients;

        }






        return response()->json([


            'classe'=>$classe->nom,


            'moyenne_classe'=>

            round($moyenne,2)



        ]);


    }









    /**
     * Classement des élèves
     */
    public function classement($id)
    {


        $classe = Classe::with(

            'eleves.notes.matiere'

        )->findOrFail($id);




        $classement=[];



        foreach($classe->eleves as $eleve)

        {


            $totalPoints=0;

            $totalCoefficients=0;




            foreach($eleve->notes as $note)

            {


                $coefficient =

                $note->matiere->coefficient;



                $totalPoints +=

                $note->note * $coefficient;



                $totalCoefficients +=

                $coefficient;



            }





            $moyenne=0;



            if($totalCoefficients>0)

            {

                $moyenne =

                $totalPoints /

                $totalCoefficients;

            }





            $classement[]=[

                'nom'=>$eleve->nom,

                'prenom'=>$eleve->prenom,

                'moyenne'=>round($moyenne,2)

            ];


        }







        usort(

            $classement,

            function($a,$b){

                return $b['moyenne']

                <=>

                $a['moyenne'];

            }

        );







        foreach($classement as $index=>&$eleve)

        {

            $eleve['rang']=$index+1;

        }







        return response()->json(

            $classement

        );


    }



}