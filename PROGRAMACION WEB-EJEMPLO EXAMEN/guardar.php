<?php
require_once 'Producto.php';

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Capturar datos
    $nombre    = trim($_POST['nombre'] ?? '');
    $precio    = trim($_POST['precio'] ?? '');
    $categoria = trim($_POST['categoria'] ?? '');

    // Validaciones (4.2 Estructuras de Control)
    if ($nombre === '') {
        $errores[] = "El nombre es obligatorio.";
    }

    if ($precio === '') {
        $errores[] = "El precio es obligatorio.";
    } elseif (!is_numeric($precio)) {
        $errores[] = "El precio debe ser numérico.";
    }

    if ($categoria === '') {
        $errores[] = "La categoría es obligatoria.";
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
        $producto = new Producto($nombre, $precio, $categoria);
        $producto->guardar();
        $mensaje = "Producto guardado correctamente.";
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
    <title>Producto guardado</title>
</head>
<body>
    <h1><?php echo $mensaje; ?></h1>
    <p><a href="registrar.php">Registrar otro producto</a></p>
    <p><a href="verProductos.php">Ver lista de productos</a></p>
</body>
</html>
