<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    /**
     * Champs autorisés lors de la création/modification.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];


    /**
     * Champs cachés dans les réponses API.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /**
     * Conversion des types.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    /**
     * Un utilisateur peut être lié à un enseignant.
     */
    public function enseignant()
    {
        return $this->hasOne(Enseignant::class);
    }
}