<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Classe;
use App\Models\Eleve;
use App\Models\Matiere;
use App\Models\Enseignant;
use App\Models\Note;
use App\Models\ClasseMatiere;
use App\Models\Evaluation;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{

    public function run(): void
    {


        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */

        User::create([

            'name' => 'Administrateur',

            'email' => 'admin@ecole.com',

            'password' => Hash::make('password'),

            'role' => 'ADMIN'

        ]);





        /*
        |--------------------------------------------------------------------------
        | ENSEIGNANTS
        |--------------------------------------------------------------------------
        */

        $enseignants = [];


        $professeurs = [

            [
                'name'=>'Professeur Math',
                'email'=>'prof.math@ecole.com',
                'nom'=>'Diop',
                'prenom'=>'Moussa'
            ],

            [
                'name'=>'Professeur Français',
                'email'=>'prof.francais@ecole.com',
                'nom'=>'Fall',
                'prenom'=>'Awa'
            ],

            [
                'name'=>'Professeur Anglais',
                'email'=>'prof.anglais@ecole.com',
                'nom'=>'Ndiaye',
                'prenom'=>'Mariama'
            ],

            [
                'name'=>'Professeur Informatique',
                'email'=>'prof.info@ecole.com',
                'nom'=>'Sarr',
                'prenom'=>'Ali'
            ],

            [
                'name'=>'Professeur Histoire',
                'email'=>'prof.histoire@ecole.com',
                'nom'=>'Ba',
                'prenom'=>'Ousmane'
            ]

        ];




        foreach($professeurs as $prof)
        {


            $user = User::create([

                'name'=>$prof['name'],

                'email'=>$prof['email'],

                'password'=>Hash::make('password'),

                'role'=>'ENSEIGNANT'

            ]);



            $enseignants[] = Enseignant::create([

                'nom'=>$prof['nom'],

                'prenom'=>$prof['prenom'],

                'email'=>$prof['email'],

                'telephone'=>'770000000',

                'user_id'=>$user->id

            ]);

        }








        /*
        |--------------------------------------------------------------------------
        | CLASSES
        |--------------------------------------------------------------------------
        */

        $classes = [];


        $niveaux = [

            ['6ème A','6ème'],

            ['6ème B','6ème'],

            ['5ème A','5ème'],

            ['4ème A','4ème'],

            ['3ème A','3ème']

        ];




        foreach($niveaux as $niveau)
        {


            $classes[] = Classe::create([

                'nom'=>$niveau[0],

                'niveau'=>$niveau[1]

            ]);

        }







        /*
        |--------------------------------------------------------------------------
        | MATIERES
        |--------------------------------------------------------------------------
        */

        $matieres = [];


        $listeMatieres = [

            'Mathématiques',

            'Français',

            'Anglais',

            'Informatique',

            'Histoire-Géographie'

        ];



        foreach($listeMatieres as $nom)
        {


            $matieres[] = Matiere::create([

                'nom'=>$nom

            ]);

        }







        /*
        |--------------------------------------------------------------------------
        | AFFECTATIONS CLASSE MATIERE ENSEIGNANT
        |--------------------------------------------------------------------------
        */


        foreach($classes as $classe)
        {


            foreach($matieres as $index=>$matiere)
            {


                ClasseMatiere::create([

                    'classe_id'=>$classe->id,

                    'matiere_id'=>$matiere->id,

                    'enseignant_id'=>$enseignants[$index % count($enseignants)]->id,

                    'coefficient'=>rand(1,5)

                ]);


            }

        }








        /*
        |--------------------------------------------------------------------------
        | ELEVES
        |--------------------------------------------------------------------------
        */

        $prenoms = [

            'Aminata',
            'Moussa',
            'Fatou',
            'Ali',
            'Mariama',
            'Ibrahima',
            'Awa',
            'Ousmane',
            'Khady',
            'Seynabou'

        ];



        $noms = [

            'Fall',
            'Diop',
            'Ndiaye',
            'Sarr',
            'Ba',
            'Sy'

        ];





        for($i = 1; $i <= 60; $i++)
        {


            Eleve::create([

                'nom'=>$noms[array_rand($noms)],

                'prenom'=>$prenoms[array_rand($prenoms)],

                'date_naissance'=>'2012-05-10',

                'classe_id'=>$classes[array_rand($classes)]->id

            ]);


        }








        /*
        |--------------------------------------------------------------------------
        | EVALUATIONS
        |--------------------------------------------------------------------------
        */

        $evaluations = [];



        foreach($matieres as $matiere)
        {


            $evaluations[] = Evaluation::create([

                'libelle'=>'Devoir 1',

                'date'=>'2026-10-01',

                'coefficient'=>1,

                'matiere_id'=>$matiere->id

            ]);



            $evaluations[] = Evaluation::create([

                'libelle'=>'Devoir 2',

                'date'=>'2026-10-15',

                'coefficient'=>1,

                'matiere_id'=>$matiere->id

            ]);



            $evaluations[] = Evaluation::create([

                'libelle'=>'Examen',

                'date'=>'2026-10-30',

                'coefficient'=>2,

                'matiere_id'=>$matiere->id

            ]);


        }








        /*
        |--------------------------------------------------------------------------
        | NOTES
        |--------------------------------------------------------------------------
        */

        foreach(Eleve::all() as $eleve)
        {


            foreach($evaluations as $evaluation)
            {


                Note::create([

                    'eleve_id'=>$eleve->id,

                    'evaluation_id'=>$evaluation->id,

                    'note'=>rand(8,20)

                ]);


            }


        }



    }

}