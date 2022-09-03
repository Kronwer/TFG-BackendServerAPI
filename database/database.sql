CREATE DATABASE geodatabase;

CREATE TABLE coordinates(
    id SERIAL PRIMARY KEY,
    building integer,
    floornumber integer,
    latitude float,
    longitude float,
    timedate TIMESTAMP
);

CREATE TABLE building(
    id SERIAL PRIMARY KEY,
    name TEXT,
    floors integer,
    latitude float,
    longitude float
);

INSERT INTO coordinates (id, building, latitude, longitude, timedate, floornumber) VALUES
    (1, 1, 39.482926395770775, -0.3468272121410691,'2022-09-12 12:00:00', 1),
    (2, 1, 39.482910393698766, -0.34673869791851814,'2022-09-12 12:00:00', 1),
    (3, 1, 39.482869157573184, -0.346571238578557,'2022-09-12 12:00:00', 1),
    (4, 1, 39.48283346060668, -0.3464667758226219,'2022-09-12 12:00:00', 1),
    (5, 1, 39.48278976257373, -0.3463120752895149,'2022-09-12 12:00:00', 1),
    (6, 1, 39.482875927683715, -0.34712146216285755,'2022-09-12 12:00:00', 2),
    (7, 1, 39.48282730595674, -0.3469930766688873,'2022-09-12 12:00:00', 2),
    (8, 1, 39.48277068314121, -0.34675145672777113,'2022-09-12 12:00:00', 2),
    (9, 1, 39.4826949808294, -0.3465776179843828,'2022-09-12 12:00:00', 2),
    (10, 1, 39.48264266617552, -0.3464229174512758,'2022-09-12 12:00:00', 2),
    (11, 1, 39.48263281870578, -0.34700344318547655,'2022-09-12 12:00:00', 3),
    (12, 1, 39.48259712162019, -0.3468973856035011,'2022-09-12 12:00:00', 3),
    (13, 1, 39.48254542235916, -0.34673790049309,'2022-09-12 12:00:00', 3),
    (14, 1, 39.48250110867724, -0.3465808076836978,'2022-09-12 12:00:00', 3),
    (15, 1, 39.482456179498705, -0.346434878830303,'2022-09-12 12:00:00', 3),
    (16, 1, 39.48292516484032, -0.3470473015846995,'2022-09-15 12:00:00', 1),
    (17, 1, 39.482752834637445, -0.34715415659210325,'2022-09-15 12:00:00', 1),
    (18, 1, 39.48285561734442, -0.34669882665595025,'2022-09-15 12:00:00', 1),
    (19, 1, 39.48259527522003, -0.346788935729358,'2022-09-15 12:00:00', 1),
    (20, 1, 39.48275714289509, -0.34639739981738393,'2022-09-15 12:00:00', 1),
    (21, 1, 39.48252880473271, -0.3465106342282148,'2022-09-15 12:00:00', 1);

INSERT INTO building (name, latitude, longitude) VALUES
    ('ETSINF - EDIFICIO 1G', 39.482716712422764, -0.346685476430633),
    ('ETSINF - EDIFICIO 1E', 39.482677632750196, -0.34830574416596655);

DROP TABLE coordinates
DROP TABLE building

SELECT timedate
FROM coordinates
WHERE timedate >= '2022-05-11 19:00:00' AND timedate < '2022-05-11 20:00:00';