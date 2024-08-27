<?php

function crear_segmento($campos)
{
    return implode('|', $campos);
}


// Segmento MSH (Message Header)
$msh = crear_segmento([
    'MSH', // Nombre del segmento
    '^~\&', // Separadores
    'SendingApp', // Aplicación emisora
    'SendingFac', // instalacion emisora
    'ReceivingApp', // Aplicación receptora
    'ReceivingFac', // Instalación receptora
    date('YmdHis'), // Fecha y hora del mensaje
    '', // Seguridad
    'ADT^A01', // Tipo de mensaje
    '123456', // ID del mensaje
    'P', // Prioridad
    '2.3', // Versión de HL7
]);

//PID = Patient Identification
$pid = crear_segmento([
    'PID', // Nombre del segmento
    '1', // set ID
    '', // ID del paciente externo
    '123456', // ID del paciente
    '', // ID del paciente alternativo
    'Perez^Juan', // Nombre del paciente
    '', // Apellido materno
    '19700101', // Fecha de nacimiento
    'M', // Sexo
]);

//PV1 = Patient Visit
$pv1 = crear_segmento([
    'PV1', // Segmento
    '1', // Set ID
    'I', // Paciente interno
    'ER', //Ubicacion paciente
]);

//Combinar Mensaje
$hl7_message = $msh . "\r" . $pid . "\r" . $pv1 . "\r";

echo "<pre>Mensaje HL7:\n";
echo htmlspecialchars($hl7_message);
echo "\n</pre>";


?>