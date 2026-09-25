document.addEventListener('DOMContentLoaded', () => {

    const botonMenu = document.getElementById('boton');
    const menuNav = document.getElementById('menu');
    const botonCierre = document.getElementById('cierre');

    if (botonMenu && menuNav) {
        botonMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            menuNav.classList.toggle('activo');
        });
    }

    if (botonCierre && menuNav) {
        botonCierre.addEventListener('click', () => {
            menuNav.classList.remove('activo');
        });
    }

    document.addEventListener('click', (e) => {
        if (menuNav && botonMenu) {
            if (!menuNav.contains(e.target) && !botonMenu.contains(e.target)) {
                menuNav.classList.remove('activo');
            }
        }
    });

    const seccionesCarrusel = document.querySelectorAll('.seccion-carrusel');

    seccionesCarrusel.forEach(seccion => {
        const diapositivas = seccion.querySelectorAll('.diapositiva-carrusel');
        const puntos = seccion.querySelectorAll('.punto');
        let indiceActual = 0;

        if (diapositivas.length > 0) {
            function mostrarDiapositiva(indice) {
                diapositivas.forEach(d => d.classList.remove('activa'));
                puntos.forEach(p => p.classList.remove('activo'));
                
                if (diapositivas[indice]) diapositivas[indice].classList.add('activa');
                if (puntos[indice]) puntos[indice].classList.add('activo');
                indiceActual = indice;
            }

            function siguienteDiapositiva() {
                let siguienteIndice = (indiceActual + 1) % diapositivas.length;
                mostrarDiapositiva(siguienteIndice);
            }

            let intervaloCarrusel = setInterval(siguienteDiapositiva, 4000);

            puntos.forEach(punto => {
                punto.addEventListener('click', () => {
                    clearInterval(intervaloCarrusel);
                    const indiceSeleccionado = parseInt(punto.getAttribute('data-diapositiva'));
                    mostrarDiapositiva(indiceSeleccionado);
                    intervaloCarrusel = setInterval(siguienteDiapositiva, 4000);
                });
            });
        }
    });

    const botonesDesplegables = document.querySelectorAll('.boton-desplegable');

    botonesDesplegables.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.classList.toggle('activo');

            const contenido = boton.nextElementSibling;
            if (contenido && contenido.style) {
                if (contenido.style.maxHeight) {
                    contenido.style.maxHeight = null;
                } else {
                    contenido.style.maxHeight = contenido.scrollHeight + "px";
                }
            }
        });
    });


    const formContacto = document.getElementById('formContacto');
    const formComentario = document.getElementById('formComentario');
    const contenedorComentarios = document.getElementById('contenedorComentarios');


    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombreUsuario').value.trim();
            const apellido = document.getElementById('apellidoUsuario').value.trim();
            const mail = document.getElementById('mailUsuario').value.trim();
            const edad = document.getElementById('edadUsuario').value.trim();

            if (nombre === "" || apellido === "" || mail === "" || edad === "") return;

            alert("¡Datos de contacto guardados correctamente!");
        });
    }

    // Manejo independiente del formulario de comentarios y mensajes
    if (formComentario && contenedorComentarios) {
        formComentario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Intentamos capturar los datos de contacto por si los rellenó arriba
            const nombreInput = document.getElementById('nombreUsuario');
            const apellidoInput = document.getElementById('apellidoUsuario');
            const apodoInput = document.getElementById('apodoUsuario');
            const textoInput = document.getElementById('textoComentario');

            const nombre = (nombreInput && nombreInput.value.trim() !== "") ? nombreInput.value.trim() : "Anónimo";
            const apellido = (apellidoInput) ? apellidoInput.value.trim() : "";
            const apodo = apodoInput ? apodoInput.value.trim() : "";
            const texto = textoInput ? textoInput.value.trim() : "";

            if (texto === "") return;

            const nuevaTarjeta = document.createElement('div');
            nuevaTarjeta.classList.add('tarjeta-comentario');

            nuevaTarjeta.innerHTML = `
                <div class="autor-comentario">${nombre} ${apellido} ${apodo ? `(${apodo})` : ''}</div>
                <div class="texto-comentario-usuario">${texto}</div>
            `;

            contenedorComentarios.prepend(nuevaTarjeta);
            
            formComentario.reset();
        });
    }
});


function verificarRespuestaTrivia(eleccionUsuario, esCorrectaReal, idResultado, numeroPregunta) {
    const contenedorAlerta = document.getElementById(idResultado || "alerta-resultado");
    if (!contenedorAlerta) return;
    
    if (eleccionUsuario === esCorrectaReal) {
        contenedorAlerta.textContent = "¡Correcto!";
        contenedorAlerta.style.color = "#2e5a27"; 
    } else {
        contenedorAlerta.textContent = "Inténtalo otra vez";
        contenedorAlerta.style.color = "#8b0000"; 
    }

    const siguientePregunta = document.getElementById(`bloque-pregunta-${numeroPregunta + 1}`);
    if (siguientePregunta) {
        siguientePregunta.classList.remove('pregunta-oculta');
        
        const contenidoDesplegable = siguientePregunta.closest('.contenido-respuesta');
        if (contenidoDesplegable && contenidoDesplegable.style.maxHeight) {
            contenidoDesplegable.style.maxHeight = contenidoDesplegable.scrollHeight + 500 + "px";
        }
    }
}

function ampliarImagen(idImagen) {
    const imagen = document.getElementById(idImagen);
    if (imagen) {
        imagen.classList.add('ampliada');
        const contenedor = imagen.closest('.item-efecto-ampliable');
        if (contenedor) {
            const botonCierre = contenedor.querySelector('.boton-cerrar');
            if (botonCierre) {
                botonCierre.style.display = 'flex';
            }
        }
    }
}

function cerrarImagen(idImagen) {
    const imagen = document.getElementById(idImagen);
    if (imagen) {
        imagen.classList.remove('ampliada');
        const contenedor = imagen.closest('.item-efecto-ampliable');
        if (contenedor) {
            const botonCierre = contenedor.querySelector('.boton-cerrar');
            if (botonCierre) {
                botonCierre.style.display = 'none';
            }
        }
    }
}

const baseDatosTierraMedia = [
    {
        titulo: "Personajes importantes",
        descripcion: "1. Frodo Bolsón<br>2. Sam Gamey<br>3. Aragorn<br>4. Gandalf<br>5. Legolas<br>6. Gimli<br>7. Boromir<br>8. Merry <br>9. Pippin <br>10. Saruman<br>11. Éowyn<br>12. Théoden<br>13. Faramir<br>14. Sauron<br>15. Gollum"
    },
    {
        titulo: "Pelicula",
        descripcion: "<strong>La Comunidad del Anillo: Personaje relevante: BOROMIR</strong><br><br><strong>Las Dos Torres: Personaje relevante: ÉOWYN</strong><br><br><strong>El Retorno del Rey: Personaje relevante: EL REY BRUJO DE ANGMAR</strong>"
    }
];

function limpiarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function filtrarBaseDatos() {
    const inputElement = document.getElementById('inputBuscador');
    const contenedorResultados = document.getElementById('resultadoBusqueda');
    
    if (!inputElement || !contenedorResultados) return;

    const textoBusqueda = limpiarTexto(inputElement.value);

    if (textoBusqueda === "") {
        contenedorResultados.innerHTML = "";
        contenedorResultados.classList.add('oculto');
        return;
    }

    const resultadosFiltrados = baseDatosTierraMedia.filter(item => 
        limpiarTexto(item.titulo).includes(textoBusqueda) || 
        limpiarTexto(item.descripcion).includes(textoBusqueda)
    );

    if (resultadosFiltrados.length > 0) {
        let htmlResultados = "";
        resultadosFiltrados.forEach(res => {
            htmlResultados += `
                <div class="item-resultado-bd">
                    <strong>${res.titulo}</strong>
                    <p class="texto-resultado-grande">${res.descripcion}</p>
                </div>
            `;
        });
        contenedorResultados.innerHTML = htmlResultados;
        contenedorResultados.classList.remove('oculto');
    } else {
        contenedorResultados.innerHTML = `<p class="texto-no-encontrado">No se encontraron resultados para "${inputElement.value}". Prueba buscando "Especies", "Personajes importantes" o "Pelicula".</p>`;
        contenedorResultados.classList.remove('oculto');
    }
}

function deslizarASeccion() {
    const seccionFotos = document.getElementById('seccionFotos');
    if (seccionFotos) {
        seccionFotos.scrollIntoView({ behavior: 'smooth' });
    }
}

function mostrarModalContenido(titulo, texto) {
    const modal = document.getElementById('modalContenido');
    const elementoTitulo = document.getElementById('modalTitulo');
    const elementoTexto = document.getElementById('modalTexto');

    if (modal && elementoTitulo && elementoTexto) {
        elementoTitulo.innerHTML = titulo;
        elementoTexto.innerHTML = texto;
        modal.classList.add('modal-activo');
    }
}

function cerrarModalContenido() {
    const modal = document.getElementById('modalContenido');
    if (modal) {
        modal.classList.remove('modal-activo');
    }
}

function descubrirImagen(numero) {
    const imagenOculta = document.getElementById(`imgOculta${numero}`);
    const contenedorBoton = document.getElementById(`contenedorBtn${numero}`);
    
    if (imagenOculta && contenedorBoton) {
        imagenOculta.classList.add('visible');
        contenedorBoton.style.display = 'none';
    }
}

function abrirModalLugar(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.add('modal-activo');
    }
}

function cerrarModalLugar(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.remove('modal-activo');
    }
}

function cerrarModalFuera(evento, idModal) {
    const modal = document.getElementById(idModal);
    if (evento.target === modal) {
        modal.classList.remove('modal-activo');
    }
}

function ampliarImagenGaleria(idImg) {
    const imgOriginal = document.getElementById(idImg);
    const lightbox = document.getElementById('modalLightbox');
    const imgAmpliada = document.getElementById('imgLightboxAmpliada');

    if (imgOriginal && lightbox && imgAmpliada) {
        imgAmpliada.src = imgOriginal.src;
        lightbox.classList.add('activo');
    }
}
function cerrarImagenGaleria() {
    const lightbox = document.getElementById('modalLightbox');
    if (lightbox) {
        lightbox.classList.remove('activo');
    }
}