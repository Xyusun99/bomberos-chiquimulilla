CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) UNIQUE,
    telefono VARCHAR(20),
    password_hash VARCHAR(255),
    id_rol INTEGER NOT NULL REFERENCES rol(id_rol),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tipo_emergencia (
    id_tipo_emergencia SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE unidad (
    id_unidad SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    placa VARCHAR(20),
    tipo VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'disponible'
        CHECK (estado IN ('disponible', 'en_servicio', 'fuera_de_servicio'))
);

CREATE TABLE emergencia (
    id_emergencia SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    id_usuario_solicitante INTEGER REFERENCES usuario(id_usuario),
    id_tipo_emergencia INTEGER NOT NULL REFERENCES tipo_emergencia(id_tipo_emergencia),
    descripcion TEXT,
    telefono_contacto VARCHAR(20),
    latitud NUMERIC(10,7) NOT NULL,
    longitud NUMERIC(10,7) NOT NULL,
    direccion_referencia TEXT,
    foto_url TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'reportada'
        CHECK (estado IN ('reportada','en_camino','en_sitio','atendiendo','finalizada')),
    fecha_reportada TIMESTAMP NOT NULL DEFAULT NOW(),
    fecha_en_camino TIMESTAMP,
    fecha_en_sitio TIMESTAMP,
    fecha_atendiendo TIMESTAMP,
    fecha_finalizada TIMESTAMP,
    tiempo_respuesta INTERVAL
        GENERATED ALWAYS AS (fecha_en_sitio - fecha_reportada) STORED
);

CREATE TABLE asignacion (
    id_asignacion SERIAL PRIMARY KEY,
    id_emergencia INTEGER NOT NULL REFERENCES emergencia(id_emergencia),
    id_bombero INTEGER NOT NULL REFERENCES usuario(id_usuario),
    id_unidad INTEGER NOT NULL REFERENCES unidad(id_unidad),
    fecha_asignacion TIMESTAMP NOT NULL DEFAULT NOW(),
    fecha_finalizacion TIMESTAMP
);

CREATE INDEX idx_emergencia_estado ON emergencia(estado);
CREATE INDEX idx_asignacion_emergencia ON asignacion(id_emergencia);

INSERT INTO rol (nombre) VALUES ('Solicitante'), ('Bombero'), ('Administrador');

INSERT INTO tipo_emergencia (nombre) VALUES
    ('Incendio'), ('Accidente de tránsito'), ('Emergencia médica'),
    ('Ataque armado'), ('Rescate'), ('Otro');

INSERT INTO unidad (codigo, tipo, estado) VALUES
    ('U-01', 'Paramédica', 'disponible'),
    ('U-02', 'Paramédica', 'disponible'),
    ('U-03', 'Paramédica', 'disponible'),
    ('U-04', 'Incendios', 'disponible');
