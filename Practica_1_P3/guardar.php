<?php
require_once 'alumno.php';

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Capturar datos
    $nombre    = trim($_POST['nombre'] ?? '');
    $correo    = trim($_POST['correo'] ?? '');
    $carrera = trim($_POST['carrera'] ?? '');

    // Validaciones (4.2 Estructuras de Control)
    if ($nombre === '') {
        $errores[] = "El nombre es obligatorio.";
    }

    if ($correo === '') {
        $errores[] = "El correo es obligatorio.";
    }

    if ($carrera === '') {
        $errores[] = "La carrera es obligatoria.";
    }

    // Si hay errores, se muestran; si no, se guarda
    if (count($errores) > 0) {
        ?>
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Errores</title>
        </head>
        <body>
            <h1>Errores al registrar producto</h1>
            <ul>
                <?php foreach ($errores as $e): ?>
                    <li><?php echo htmlspecialchars($e); ?></li>
                <?php endforeach; ?>
            </ul>

            <p><a href="registrar.php">Volver al formulario</a></p>
        </body>
        </html>
        <?php
        exit;
    } else {
        // Crear objeto y guardar (4.5 y 4.6)
        $alumno = new Alumno($nombre, $correo, $carrera);
        $alumno->guardar();
        $mensaje = "Alumno guardado correctamente.";
    }

} else {
    // Si entran sin POST, los mandamos al formulario
    header("Location: registrar.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Alumno guardado</title>
</head>
<body>
    <h1><?php echo $mensaje; ?></h1>
    <p><a href="registrar.php">Registrar otro alumno</a></p>
    <p><a href="verAlumnos.php">Ver lista de alumnos</a></p>
</body>
</html>