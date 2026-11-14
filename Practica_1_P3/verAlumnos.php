<?php
require_once 'Alumno.php';

$lista = Alumno::listar();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de alumnos</title>
</head>
<body>
    <h1>Lista de alumnos</h1>

    <?php if (count($lista) === 0): ?>
        <p>No hay alumnos registrados.</p>
    <?php else: ?>
        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Carrera</th>
            </tr>
            <?php foreach ($lista as $prod): ?>
                <tr>
                    <td><?php echo $prod['id']; ?></td>
                    <td><?php echo htmlspecialchars($prod['nombre']); ?></td>
                    <td><?php echo htmlspecialchars($prod['correo']); ?></td>
                    <td><?php echo htmlspecialchars($prod['carrera']); ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>

    <p><a href="index.php">Volver al menú</a></p>
</body>
</html>
