import jsPDF from 'jspdf';

/**
 * Genera un PDF con los detalles del nivel, actividades, ejercicios e intentos.
 * @param {Object} nivel - Objeto con la estructura del nivel, actividades y ejercicios.
 * @param {string} pacienteNombre - Nombre del paciente.
 */
export function generarPDFNivel(nivel, pacienteNombre = "") {
  const doc = new jsPDF();
  let y = 15;

  doc.setFontSize(18);
  doc.text(`Resultados del Nivel ${nivel.nivel.number}`, 10, y);
  y += 10;
  if (pacienteNombre) {
    doc.setFontSize(12);
    doc.text(`Paciente: ${pacienteNombre}`, 10, y);
    y += 8;
  }
  doc.setFontSize(12);
  doc.text(`Descripción: ${nivel.nivel.description || ''}`, 10, y);
  y += 8;
  doc.text(`Fecha de asignación: ${new Date(nivel.fechaAsignacion).toLocaleDateString('es-AR', { timeZone: 'UTC' })}`, 10, y);
  y += 10;

  nivel.actividades.forEach((actividad, idxA) => {
    if (y > 270) { doc.addPage(); y = 15; }
    doc.setFontSize(14);
    doc.text(`Actividad: ${actividad.name}`, 10, y);
    y += 7;
    doc.setFontSize(11);
    doc.text(`Descripción: ${actividad.description || ''}`, 12, y);
    y += 6;
    actividad.ejercicios.forEach((ejercicio, idxE) => {
      if (y > 270) { doc.addPage(); y = 15; }
      doc.setFontSize(12);
      doc.text(`Ejercicio: ${ejercicio.name || ejercicio.instrucciones || ''}`, 14, y);
      y += 6;
      if (ejercicio.instructions) {
        doc.setFontSize(10);
        doc.text(`Instrucciones: ${ejercicio.instructions}`, 16, y);
        y += 5;
      }
      if (ejercicio.correctAnswer) {
        doc.text(`Respuesta correcta: ${ejercicio.correctAnswer}`, 16, y);
        y += 5;
      }
      if (ejercicio.opciones || ejercicio.options) {
        const opciones = ejercicio.opciones || ejercicio.options;
        doc.text('Opciones:', 16, y);
        y += 5;
        opciones.forEach((op, idxO) => {
          let textoOpcion = op.text || op.texto || op;
          doc.text(`- ${textoOpcion}`, 18, y);
          y += 5;
        });
      }
      if (ejercicio.intentos && ejercicio.intentos.length > 0) {
        doc.text('Intentos:', 16, y);
        y += 5;
        ejercicio.intentos.forEach((intento, idxI) => {
          doc.text(`Intento ${idxI + 1}: ${intento.respuesta} | ${intento.correcto ? 'Correcto' : 'Incorrecto'} | Fecha: ${new Date(intento.fecha).toLocaleString('es-AR')}`, 18, y);
          y += 5;
        });
      } else {
        doc.text('Sin intentos registrados.', 16, y);
        y += 5;
      }
      y += 2;
    });
    y += 2;
  });

  doc.save(`Resultados_Nivel_${nivel.nivel.number}.pdf`);
} 