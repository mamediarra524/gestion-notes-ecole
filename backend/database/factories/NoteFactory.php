<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;



class NoteFactory extends Factory
{


    public function definition(): array
    {


        return [

            'eleve_id'=>null,

            'matiere_id'=>null,

            'enseignant_id'=>null,

            'note'=>fake()
                ->numberBetween(5,20)

        ];


    }


}
