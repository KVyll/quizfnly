<?php
    session_start();

    if(isset($_POST['logout'])) {
        session_unset();
        session_destroy();
        header('location: index.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="global/css/dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Pilih Kelas</h1>
        <button>
            <a class="text-dct" href="layout/kelas/kelas7.html">Kelas 7</a>
        </button>
        <button>
            <a class="text-dct" href="layout/kelas/kelas8.html">Kelas 8</a>
        </button>
        <button>
            <a class="text-dct" href="layout/kelas/kelas9.html">Kelas 9</a>
        </button>
    </div>
    <form action="dashboard.php" method="POST">
        <button type="submit" name="logout">logout</button> 
    </form>
</body>
</html>