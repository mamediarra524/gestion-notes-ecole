<?php

namespace App\Http\Controllers;


use App\Models\Eleve;
use Barryvdh\DomPDF\Facade\Pdf;



class BulletinController extends Controller
{


    /**
     * Afficher bulletin JSON
     */
    public function show($id)
    {

        $bulletin = $this->calculerBulletin($id);


        return response()->json($bulletin);

    }







    /**
     * Générer bulletin PDF
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
     * Calcul complet bulletin
     */
    private function calculerBulletin($id)
    {


        $eleve = Eleve::with([

            'classe.matieres.enseignant',

            'notes.matiere'

        ])

        ->findOrFail($id);






        $totalPoints = 0;

        $totalCoefficients = 0;


        $matieres = [];







        /*
        ===================================
        Calcul moyenne par matière
        ===================================
        */


        $groupes = $eleve->notes

            ->groupBy('matiere_id');






        foreach($groupes as $notes)
        {



            $matiere = $notes->first()->matiere;






            // récupération coefficient
            // depuis classe_matiere


            $classeMatiere = $eleve
                ->classe
                ->matieres
                ->where('id',$matiere->id)
                ->first();





            $coefficient = $classeMatiere

                ? $classeMatiere->pivot->coefficient

                : 1;







            $moyenne = $notes->avg('note');



            $points = $moyenne * $coefficient;






            $totalPoints += $points;


            $totalCoefficients += $coefficient;







            $matieres[] = [


                "nom" => $matiere->nom,


                "coefficient" => $coefficient,


                "moyenne" => round($moyenne,2),


                "points" => round($points,2)


            ];



        }








        /*
        ===================================
        Moyenne générale
        ===================================
        */


        $moyenneGenerale = 0;



        if($totalCoefficients > 0)
        {


            $moyenneGenerale =

                $totalPoints /

                $totalCoefficients;


        }








        /*
        ===================================
        Rang
        ===================================
        */


        $rang = $this->calculerRang(

            $eleve,

            $moyenneGenerale

        );









        return [



            "eleve" => [


                "id" => $eleve->id,


                "nom" => $eleve->nom,


                "prenom" => $eleve->prenom,


                "classe" => $eleve->classe->nom ?? null


            ],






            "matieres" => $matieres,






            "moyenneGenerale" => round(

                $moyenneGenerale,

                2

            ),






            "rang" => $rang,






            "appreciation" => $this->appreciation(

                $moyenneGenerale

            )



        ];



    }












    /**
     * Calcul classement classe
     */
    private function calculerRang($eleve,$moyenne)
    {



        $eleves = Eleve::where(

            'classe_id',

            $eleve->classe_id

        )

        ->with([

            'classe.matieres',

            'notes.matiere'

        ])

        ->get();







        $resultats=[];








        foreach($eleves as $e)
        {


            $points = 0;


            $coefficients = 0;






            foreach($e->notes->groupBy('matiere_id') as $notes)
            {



                $matiere = $notes->first()->matiere;






                $classeMatiere = $e
                    ->classe
                    ->matieres
                    ->where('id',$matiere->id)
                    ->first();






                $coefficient = $classeMatiere

                    ? $classeMatiere->pivot->coefficient

                    : 1;







                $moyenneMatiere = $notes->avg('note');






                $points +=

                    $moyenneMatiere *

                    $coefficient;







                $coefficients += $coefficient;



            }






            $resultats[] = $coefficients > 0

                ? $points / $coefficients

                : 0;



        }









        rsort($resultats);






        $rang = 1;





        foreach($resultats as $moyenneEleve)
        {


            if(

                round($moyenneEleve,2)

                ==

                round($moyenne,2)

            )
            {

                return $rang;

            }



            $rang++;


        }





        return $rang;


    }












    /**
     * Appréciation automatique
     */
    private function appreciation($moyenne)
    {


        if($moyenne >= 16)

        {

            return "Excellent travail";

        }




        if($moyenne >= 14)

        {

            return "Très bon travail";

        }





        if($moyenne >= 12)

        {

            return "Bon travail";

        }





        if($moyenne >= 10)

        {

            return "Travail satisfaisant";

        }





        return "Des efforts sont nécessaires";


    }



}