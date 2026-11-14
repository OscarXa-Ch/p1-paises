<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registrar producto</title>
</head>
<body>
    <h1>Registrar producto</h1>

    <form action="guardar.php" method="post">
        <label>Nombre:</label><br>
        <input type="text" name="nombre"><br><br>

        <label>Precio:</label><br>
        <input type="text" name="precio"><br><br>

        <label>Categoría:</label><br>
        <input type="text" name="categoria"><br><br>

        <button type="submit">Guardar</button>
    </form>

    <p><a href="index.php">Volver al menú</a></p>
</body>
</html>
