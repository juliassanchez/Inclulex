const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('frecuencia.db', (err) => {
    if (err) throw err;
  });

// get a frecuency given the word
exports.obtenerFrecuencia = (palabra) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM frecuencia_filtrada where palabra = ?';
    db.get(sql, [palabra], (err, row) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        reject(err);
      }

      if (!row) {
        resolve({ error: 'Word not found.' });
      } else {
        const frecuencia = row;
        console.log('Frecuencia obtenida:', frecuencia);
        resolve(frecuencia);
      }
    });
  });
};
