<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;


class EleveFactory extends Factory
{

    public function definition(): array
    {

        return [

            'nom'=>fake()->lastName(),

            'prenom'=>fake()->firstName(),

            'date_naissance'=>fake()
                ->dateTimeBetween(
                    '-15 years',
                    '-10 years'
                )
                ->format('Y-m-d'),

            'classe_id'=>null

        ];

    }

}