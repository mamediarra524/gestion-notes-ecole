<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class Note extends Model
{


    protected $fillable = [

        'eleve_id',

        'evaluation_id',

        'note'

    ];




    public function eleve()
    {

        return $this->belongsTo(
            Eleve::class
        );

    }





    public function evaluation()
    {

        return $this->belongsTo(
            Evaluation::class
        );

    }


}