<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class RoleMiddleware
{


    /**
     * Vérifier le rôle utilisateur
     */
    public function handle(
        Request $request,
        Closure $next,
        ...$roles
    ): Response
    {


        // Vérifier connexion
        if(!$request->user())
        {

            return response()->json([

                'message'=>'Utilisateur non connecté'

            ],401);

        }



        // Vérifier rôle
        if(!in_array(
            $request->user()->role,
            $roles
        ))
        {

            return response()->json([

                'message'=>'Accès interdit pour ce rôle'

            ],403);

        }



        return $next($request);

    }


}
