<?php

namespace App\Http\Controllers;

use App\Models\Eleve;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


class BulletinController extends Controller
{


    /**
     * Afficher le bulletin d'un élève en JSON
     */
    public function show($id)
    {

        $bulletin = $this->calculerBulletin($id);


        return response()->json($bulletin);

    }






    /**
     * Générer le bulletin en PDF
     */
    public function pdf($id)
    {

        $bulletin = $this->calculerBulletin($id);



        $pdf = Pdf::loadView(

            'bulletins.bulletin',

            $bulletin

        );



        return $pdf->download(

            'bulletin_'.$bulletin['eleve']['nom'].'.pdf'

        );

    }








    /**
     * Calcul commun du bulletin
     */
    private function calculerBulletin($id)
    {


        $eleve = Eleve::with([

            'classe',

            'notes.matiere'

        ])

        ->findOrFail($id);






        $totalPoints = 0;

        $totalCoefficients = 0;


        $bulletinMatieres = [];






        /*
        ==================================
        Regroupement des notes par matière
        ==================================
        */


        $groupes = $eleve->notes->groupBy('matiere_id');






        foreach($groupes as $notes)
        {


            $matiere = $notes->first()->matiere;



            $coefficient = $matiere->coefficient;




            $moyenneMatiere = $notes->avg('note');





            $points = $moyenneMatiere * $coefficient;





            $totalPoints += $points;



            $totalCoefficients += $coefficient;






            $bulletinMatieres[] = [


                'matiere' => $matiere->nom,


                'coefficient' => $coefficient,


                'moyenne' => round($moyenneMatiere,2),


                'points' => round($points,2)


            ];



        }








        /*
        ==============================
        Moyenne générale
        ==============================
        */


        $moyenneGenerale = 0;



        if($totalCoefficients > 0)
        {

            $moyenneGenerale =

                $totalPoints / $totalCoefficients;

        }









        return [


            'eleve' => [


                'id'=>$eleve->id,


                'nom'=>$eleve->nom,


                'prenom'=>$eleve->prenom,


                'classe'=>$eleve->classe->nom ?? null


            ],




            'matieres'=>$bulletinMatieres,




            'moyenneGenerale'=>round(

                $moyenneGenerale,

                2

            ),




            'mention'=>$this->mention(

                $moyenneGenerale

            )



        ];

    }









    /**
     * Déterminer la mention
     */
    private function mention($moyenne)
    {


        if($moyenne >= 16)
        {

            return "Très bien";

        }



        elseif($moyenne >= 14)
        {

            return "Bien";

        }



        elseif($moyenne >= 12)
        {

            return "Assez bien";

        }



        elseif($moyenne >= 10)
        {

            return "Passable";

        }



        else
        {

            return "Insuffisant";

        }


    }



}