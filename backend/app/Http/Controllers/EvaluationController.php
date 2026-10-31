<?php

namespace App\Http\Controllers;


use App\Models\Evaluation;
use Illuminate\Http\Request;



class EvaluationController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | Toutes les évaluations
    |--------------------------------------------------------------------------
    */

    public function index()
    {

        return response()->json(

            Evaluation::with('matiere')->get()

        );

    }







    /*
    |--------------------------------------------------------------------------
    | Evaluations d'une matière
    |--------------------------------------------------------------------------
    */

    public function parMatiere($id)
    {


        $evaluations = Evaluation::where(

            'matiere_id',

            $id

        )->get();



        return response()->json(

            $evaluations

        );


    }








    /*
    |--------------------------------------------------------------------------
    | Ajouter une évaluation
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {


        $request->validate([


            'matiere_id'=>

            'required|exists:matieres,id',


            'libelle'=>

            'required|string',


            'coefficient'=>

            'required|numeric|min:1|max:10',


            'date'=>

            'required|date'


        ]);






        $evaluation = Evaluation::create([


            'matiere_id'=>$request->matiere_id,


            'libelle'=>$request->libelle,


            'coefficient'=>$request->coefficient,


            'date'=>$request->date


        ]);







        return response()->json(

            $evaluation->load('matiere'),

            201

        );


    }









    /*
    |--------------------------------------------------------------------------
    | Modifier
    |--------------------------------------------------------------------------
    */

    public function update(Request $request,$id)
    {


        $evaluation = Evaluation::findOrFail($id);





        $request->validate([


            'libelle'=>'required|string',


            'coefficient'=>'required|numeric|min:1|max:10',


            'date'=>'required|date'


        ]);







        $evaluation->update([


            'libelle'=>$request->libelle,


            'coefficient'=>$request->coefficient,


            'date'=>$request->date


        ]);







        return response()->json($evaluation);



    }









    /*
    |--------------------------------------------------------------------------
    | Supprimer
    |--------------------------------------------------------------------------
    */

    public function destroy($id)
    {


        Evaluation::findOrFail($id)

        ->delete();




        return response()->json([


            'message'=>'Evaluation supprimée'


        ]);



    }



}