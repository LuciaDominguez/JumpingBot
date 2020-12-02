<?php

    /* $EnlaceDB = mysqli_connect('localhost', 'root', 'password', 'jb_base');
    $user=$_POST['apodo'];
    $points=$_POST['puntuacion'];

    if(isset($_POST['apodo']) && !empty($_POST['apodo']))
    {
        try {
            $query = "INSERT INTO jugador (apodo, puntuacion) VALUES ('$user' , $points) 
            ON DUPLICATE KEY UPDATE puntuacion = $points";

            mysqli_query($EnlaceDB, $query);
            echo "Connected successfully";
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    mysqli_close($EnlaceDB);

    echo $user;
    header("Content-Type: text/plain");
    //header("Location: index.html");*/
?>