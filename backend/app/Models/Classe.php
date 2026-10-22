<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Classe extends Model
{

    use HasFactory;



    protected $fillable = [

        'nom',
        'niveau'

    ];





    public function eleves()
    {

        return $this->hasMany(Eleve::class);

    }





    public function matieres()
    {

        return $this->belongsToMany(
            Matiere::class,
            'classe_matiere'
        )

        ->withPivot([
            'enseignant_id',
            'coefficient'
        ])

        ->withTimestamps();

    }





    public function affectations()
    {

        return $this->hasMany(ClasseMatiere::class);

    }


}