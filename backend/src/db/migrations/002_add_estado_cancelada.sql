BEGIN;

ALTER TABLE emergencia DROP CONSTRAINT emergencia_estado_check;

ALTER TABLE emergencia ADD CONSTRAINT emergencia_estado_check
    CHECK (estado IN ('reportada','en_camino','en_sitio','atendiendo','finalizada','cancelada'));

COMMIT;
