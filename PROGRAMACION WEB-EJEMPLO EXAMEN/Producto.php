<?php
require_once 'conexion.php';

class Producto
{
    private $nombre;
    private $precio;
    private $categoria;

    public function __construct($nombre, $precio, $categoria)
    {
        $this->nombre   = $nombre;
        $this->precio   = $precio;
        $this->categoria = $categoria;
    }

    public function guardar()
    {
        $pdo = Conexion::conectar();

        $sql = "INSERT INTO productos (nombre, precio, categoria)
                VALUES (:nombre, :precio, :categoria)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nombre'   => $this->nombre,
            ':precio'   => $this->precio,
            ':categoria'=> $this->categoria
        ]);
    }

    public static function listar()
    {
        $pdo = Conexion::conectar();
        $sql = "SELECT id, nombre, precio, categoria FROM productos ORDER BY id DESC";
        $stmt = $pdo->query($sql);
        return $stmt->fetchAll();
    }
}
?>
