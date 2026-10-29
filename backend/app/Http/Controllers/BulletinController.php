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

        return response()->json(

            $this->calculerBulletin($id)

        );

    }






    /**
     * Télécharger bulletin PDF
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

            'classe.matieres',

            'notes.matiere'

        ])

        ->findOrFail($id);






        $totalPoints = 0;

        $totalCoefficients = 0;


        $matieres = [];







        foreach(

            $eleve->notes->groupBy('matiere_id')

            as $notes

        )
        {


            $matiere = $notes->first()->matiere;



            $classeMatiere = $eleve

                ->classe

                ->matieres

                ->where(

                    'id',

                    $matiere->id

                )

                ->first();





            $coefficient = $classeMatiere

                ?

                $classeMatiere->pivot->coefficient

                :

                1;






            $moyenne = $notes->avg('note');



            $points = $moyenne * $coefficient;





            $totalPoints += $points;


            $totalCoefficients += $coefficient;







            $matieres[] = [

                "nom"=>$matiere->nom,

                "coefficient"=>$coefficient,

                "moyenne"=>round($moyenne,2),

                "points"=>round($points,2)

            ];



        }









        $moyenneGenerale = 0;



        if($totalCoefficients > 0)
        {

            $moyenneGenerale =

                $totalPoints /

                $totalCoefficients;

        }







        $moyenneClasse =

            $this->calculerMoyenneClasse(

                $eleve->classe_id

            );







        $rang =

            $this->calculerRang(

                $eleve,

                $moyenneGenerale

            );







        return [


            "eleve"=>[


                "id"=>$eleve->id,

                "nom"=>$eleve->nom,

                "prenom"=>$eleve->prenom,

                "classe"=>$eleve->classe->nom ?? ''

            ],





            "matieres"=>$matieres,





            "moyenneGenerale"=>round(

                $moyenneGenerale,

                2

            ),





            "moyenneClasse"=>$moyenneClasse,





            "rang"=>$rang,





            "appreciation"=>$this->appreciation(

                $moyenneGenerale

            )


        ];



    }









    /**
     * Moyenne de la classe
     */
    private function calculerMoyenneClasse($classeId)
    {


        $eleves = Eleve::where(

            'classe_id',

            $classeId

        )

        ->with([

            'classe.matieres',

            'notes.matiere'

        ])

        ->get();







        $total = 0;

        $nombre = 0;







        foreach($eleves as $eleve)
        {


            $points = 0;

            $coefficients = 0;






            foreach(

                $eleve->notes->groupBy('matiere_id')

                as $notes

            )
            {


                $matiere = $notes

                    ->first()

                    ->matiere;






                $classeMatiere = $eleve

                    ->classe

                    ->matieres

                    ->where(

                        'id',

                        $matiere->id

                    )

                    ->first();







                $coefficient = $classeMatiere

                    ?

                    $classeMatiere->pivot->coefficient

                    :

                    1;






                $points +=

                    $notes->avg('note')

                    *

                    $coefficient;






                $coefficients +=

                    $coefficient;


            }






            if($coefficients > 0)
            {


                $total +=

                    $points /

                    $coefficients;



                $nombre++;


            }


        }







        return $nombre > 0

            ?

            round(

                $total/$nombre,

                2

            )

            :

            0;


    }









    /**
     * Calcul du rang
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






        $moyennes=[];







        foreach($eleves as $e)
        {


            $points=0;

            $coefficients=0;






            foreach(

                $e->notes->groupBy('matiere_id')

                as $notes

            )
            {


                $matiere=$notes

                    ->first()

                    ->matiere;






                $classeMatiere=$e

                    ->classe

                    ->matieres

                    ->where(

                        'id',

                        $matiere->id

                    )

                    ->first();







                $coef=$classeMatiere

                    ?

                    $classeMatiere->pivot->coefficient

                    :

                    1;






                $points +=

                    $notes->avg('note')

                    *

                    $coef;



                $coefficients += $coef;


            }






            $moyennes[] =

                $coefficients>0

                ?

                $points/$coefficients

                :

                0;


        }







        rsort($moyennes);






        foreach($moyennes as $index=>$m)
        {


            if(

                round($m,2)

                ==

                round($moyenne,2)

            )
            {

                return $index+1;

            }


        }





        return null;


    }









    /**
     * Appréciation
     */
    private function appreciation($moyenne)
    {


        if($moyenne >=16)

            return "Excellent travail";



        if($moyenne >=14)

            return "Très bon travail";



        if($moyenne >=12)

            return "Bon travail";



        if($moyenne >=10)

            return "Travail satisfaisant";



        return "Des efforts sont nécessaires";


    }



}