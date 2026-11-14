<?php
require_once 'Producto.php';

$lista = Producto::listar();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de productos</title>
</head>
<body>
    <h1>Lista de productos</h1>

    <?php if (count($lista) === 0): ?>
        <p>No hay productos registrados.</p>
    <?php else: ?>
        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
            </tr>
            <?php foreach ($lista as $prod): ?>
                <tr>
                    <td><?php echo $prod['id']; ?></td>
                    <td><?php echo htmlspecialchars($prod['nombre']); ?></td>
                    <td><?php echo $prod['precio']; ?></td>
                    <td><?php echo htmlspecialchars($prod['categoria']); ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>

    <p><a href="index.php">Volver al menú</a></p>
</body>
</html>
