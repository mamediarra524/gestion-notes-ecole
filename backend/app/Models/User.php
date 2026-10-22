<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Laravel\Sanctum\HasApiTokens;



class User extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;





    protected $fillable = [

        'name',

        'email',

        'password',

        'role',

    ];





    protected $hidden = [

        'password',

        'remember_token',

    ];





    protected function casts(): array
    {

        return [

            'email_verified_at' => 'datetime',

            'password' => 'hashed',

        ];

    }








    /**
     * Un utilisateur possède un profil enseignant.
     */
    public function enseignant()
    {

        return $this->hasOne(
            Enseignant::class
        );

    }








    /**
     * Vérifie si l'utilisateur est administrateur.
     */
    public function isAdmin()
    {

        return $this->role === 'ADMIN';

    }








    /**
     * Vérifie si l'utilisateur est enseignant.
     */
    public function isEnseignant()
    {

        return $this->role === 'ENSEIGNANT';

    }








    /**
     * Vérifie un rôle précis.
     */
    public function hasRole($role)
    {

        return $this->role === $role;

    }



}