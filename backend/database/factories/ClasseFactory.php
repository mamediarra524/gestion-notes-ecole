<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class ClasseFactory extends Factory
{

    public function definition(): array
    {

        return [

            'nom' => fake()->randomElement([
                '6ème A',
                '6ème B',
                '5ème A',
                '5ème B',
                '4ème A'
            ]),

            'niveau' => fake()->randomElement([
                '6ème',
                '5ème',
                '4ème'
            ])

        ];

    }

}