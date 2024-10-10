document.getElementById('numeroForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const numero = document.getElementById('numero').value;

    const response = await fetch('src/json/index.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numero })
    });

    if (response.ok) {
        alert('Número guardado con éxito');
    } else {
        alert('Error al guardar el número');
    }

    // Limpiar el campo de entrada
    document.getElementById('numero').value = '';
});


// Función para convertir números a letras
const numeroALetras = (numero) => {
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const centenas = ['cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (numero === 0) return 'cero';

    const convertirMillones = (n) => {
        if (n >= 1000000) {
            const millones = Math.floor(n / 1000000);
            const resto = n % 1000000;
            return (millones === 1 ? 'un millón' : numeroALetras(millones) + ' millones') + (resto > 0 ? ' ' + numeroALetras(resto) : '');
        }
        return convertirMiles(n);
    };

    const convertirMiles = (n) => {
        if (n >= 1000) {
            const miles = Math.floor(n / 1000);
            const resto = n % 1000;
            return (miles === 1 ? 'mil' : numeroALetras(miles) + ' mil') + (resto > 0 ? ' ' + numeroALetras(resto) : '');
        }
        return convertirCentenas(n);
    };

    const convertirCentenas = (n) => {
        if (n >= 100) {
            const cientos = Math.floor(n / 100);
            const resto = n % 100;
            return centenas[cientos - 1] + (resto > 0 ? ' ' + numeroALetras(resto) : '');
        }
        return convertirDecenas(n);
    };

    const convertirDecenas = (n) => {
        if (n >= 20) {
            const decena = Math.floor(n / 10);
            const resto = n % 10;
            return decenas[decena - 1] + (resto > 0 ? ' y ' + unidades[resto] : '');
        }
        if (n >= 11 && n <= 19) {
            return especiales[n - 11];
        }
        return unidades[n];
    };

    return convertirMillones(numero);
};

// Función para redondear y convertir número en formato literal
function procesarNumeros(datos) {
    return datos.map(item => {
        // Redondear el número a dos decimales
        let numeroRedondeado = parseFloat(item.numero).toFixed(2);

        // Separar parte entera y decimal
        let partes = numeroRedondeado.split('.');
        let entero = parseInt(partes[0]);
        let decimales = partes[1];

        // Convertir la parte entera en literal
        let literalEntero = numeroALetras(entero);

        // Crear el formato del número en literal con decimales en formato 00/100
        let numeroLiteral = `${literalEntero} ${decimales}/100`;

        return {
            numero: item.numero,
            literal: numeroLiteral
        };
    });
}

// Leer el archivo .json
// Usar fetch para obtener el archivo JSON

const procesonum = () => {
      fetch('src/json/index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
                  }
            return response.json(); // Convierte la respuesta en JSON
        })
        .then(datos => {
            let resultado = procesarNumeros(datos);
            document.getElementById('resultado').textContent = JSON.stringify(resultado, null, 2);
            localStorage.setItem('resultados', JSON.stringify(resultado));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
procesonum();