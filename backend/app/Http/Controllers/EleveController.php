<?php

namespace App\Http\Controllers;


use App\Models\Eleve;
use Illuminate\Http\Request;



class EleveController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | ADMIN : Tous les élèves
    |--------------------------------------------------------------------------
    */


    public function index()
    {

        return response()->json(

            Eleve::with('classe')->get()

        );

    }







    /*
    |--------------------------------------------------------------------------
    | ADMIN : Ajouter
    |--------------------------------------------------------------------------
    */


    public function store(Request $request)
    {

        $data=$request->validate([


            'nom'=>'required|string',

            'prenom'=>'required|string',

            'date_naissance'=>'required|date',

            'classe_id'=>'required|exists:classes,id'


        ]);



        $eleve=Eleve::create($data);



        return response()->json([


            'message'=>'Élève ajouté',

            'eleve'=>$eleve


        ],201);


    }









    /*
    |--------------------------------------------------------------------------
    | ADMIN : Modifier
    |--------------------------------------------------------------------------
    */


    public function update(Request $request,Eleve $eleve)
    {


        $data=$request->validate([


            'nom'=>'required|string',

            'prenom'=>'required|string',

            'date_naissance'=>'required|date',

            'classe_id'=>'required|exists:classes,id'


        ]);



        $eleve->update($data);



        return response()->json([


            'message'=>'Élève modifié',

            'eleve'=>$eleve


        ]);



    }









    /*
    |--------------------------------------------------------------------------
    | ADMIN : Supprimer
    |--------------------------------------------------------------------------
    */


    public function destroy(Eleve $eleve)
    {


        $eleve->delete();



        return response()->json([


            'message'=>'Élève supprimé'


        ]);


    }









    /*
    |--------------------------------------------------------------------------
    | ENSEIGNANT :
    | Élèves d'une classe
    |--------------------------------------------------------------------------
    */


    public function parClasse($id)
    {


        $eleves = Eleve::where(

            'classe_id',

            $id

        )
        ->with('classe')
        ->get();



        return response()->json($eleves);


    }









    /*
    |--------------------------------------------------------------------------
    | Moyenne élève
    |--------------------------------------------------------------------------
    */


    public function moyenne($id)
    {


        $eleve=Eleve::with(

            'notes.matiere'

        )->findOrFail($id);



        $total=0;

        $coef=0;



        foreach($eleve->notes as $note){


            $c=$note->matiere->coefficient;



            $total += $note->note*$c;


            $coef += $c;


        }



        return response()->json([


            'eleve'=>$eleve->nom.' '.$eleve->prenom,


            'moyenne'=>

            $coef>0 ?

            round($total/$coef,2)

            :

            0


        ]);



    }



}