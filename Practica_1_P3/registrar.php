<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Registrar alumno</title>
</head>
<body class="bg-light">
    <h1 class="mb-4">Registrar alumno</h1>

    <form action="guardar.php" method="post" class="card card-body">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre:</label>
            <input type="text" id="nombre" name="nombre" class="form-control">
        </div>

        <div class="mb-3">
            <label for="correo" class="form-label">Correo:</label>
            <input type="email" id="correo" name="correo" class="form-control">
        </div>


        <div class="mb-3">
            <label for="carrera" class="form-label">Carrera:</label>
            <select id="carrera" name="carrera" class="form-select">
                <option value="">-- Selecciona una carrera --</option>
                <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                <option value="Ingeniería Mecatrónica">Ingeniería Mecatrónica</option>
                <option value="Administración">Administración</option>
                <option value="Contaduría">Contaduría</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>

    <p><a href="index.php">Volver al menú</a></p>
</body>
</html>
