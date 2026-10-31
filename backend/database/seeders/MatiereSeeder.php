<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Matiere;



class MatiereSeeder extends Seeder
{

    public function run(): void
    {


        $matieres = [


            [
                'nom'=>'Mathématiques',
                'coefficient'=>3
            ],


            [
                'nom'=>'Français',
                'coefficient'=>3
            ],


            [
                'nom'=>'Anglais',
                'coefficient'=>2
            ],


            [
                'nom'=>'Informatique',
                'coefficient'=>2
            ],


            [
                'nom'=>'Sciences',
                'coefficient'=>2
            ]

        ];



        foreach($matieres as $matiere)
        {

            Matiere::create($matiere);

        }


    }

}
