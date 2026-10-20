<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <title>Bulletin scolaire</title>


    <style>

        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
        }


        h1 {
            text-align: center;
            margin-bottom: 30px;
        }


        .info {
            margin-bottom: 20px;
            line-height: 25px;
        }


        table {

            width: 100%;

            border-collapse: collapse;

            margin-top: 20px;

        }



        th, td {

            border: 1px solid black;

            padding: 8px;

            text-align: center;

        }



        th {

            background-color: #eeeeee;

        }



        .resultat {

            margin-top: 30px;

            font-size: 16px;

        }



        .footer {

            margin-top: 60px;

            text-align: right;

        }


    </style>


</head>



<body>



<h1>
    BULLETIN SCOLAIRE
</h1>





<div class="info">


    <strong>Nom :</strong>

    {{ $eleve['nom'] }}


    <br>


    <strong>Prénom :</strong>

    {{ $eleve['prenom'] }}



    <br>


    <strong>Classe :</strong>

    {{ $eleve['classe'] }}



</div>









<table>


    <thead>

        <tr>

            <th>Matière</th>

            <th>Coefficient</th>

            <th>Moyenne</th>

            <th>Points</th>

        </tr>


    </thead>





    <tbody>


    @foreach($matieres as $matiere)


        <tr>


            <td>

                {{ $matiere['matiere'] }}

            </td>



            <td>

                {{ $matiere['coefficient'] }}

            </td>



            <td>

                {{ $matiere['moyenne'] }}

            </td>



            <td>

                {{ $matiere['points'] }}

            </td>



        </tr>


    @endforeach



    </tbody>



</table>









<div class="resultat">


    <p>

        <strong>Moyenne générale :</strong>

        {{ $moyenneGenerale }}

        /20

    </p>





    <p>

        <strong>Mention :</strong>

        {{ $mention }}

    </p>



</div>








<div class="footer">


    <p>

        Signature du responsable

    </p>


    <br><br>


    ______________________


</div>






</body>


</html>