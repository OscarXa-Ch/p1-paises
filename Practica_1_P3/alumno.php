<?php
require_once 'conexion.php';

class Alumno
{
    private $nombre;
    private $correo;
    private $carrera;

    public function __construct($nombre, $correo, $carrera)
    {
        $this->nombre   = $nombre;
        $this->correo   = $correo;
        $this->carrera = $carrera;
    }

    public function guardar()
    {
        $pdo = Conexion::conectar();

        $sql = "INSERT INTO alumnos (nombre, correo, carrera)
                VALUES (:nombre, :correo, :carrera)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nombre'   => $this->nombre,
            ':correo'   => $this->correo,
            ':carrera'  => $this->carrera
        ]);
    }

    public static function listar()
    {
        $pdo = Conexion::conectar();
        $sql = "SELECT id, nombre, correo, carrera FROM alumnos ORDER BY id DESC";
        $stmt = $pdo->query($sql);
        return $stmt->fetchAll();
    }
}
?>
