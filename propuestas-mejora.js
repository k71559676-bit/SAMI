/* ==========================================================
   SAMILU — PROPUESTAS DE MEJORA
   JAVASCRIPT COMPLETO
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
       1. BOTÓN VOLVER ARRIBA
       ====================================================== */

    const backTop = document.getElementById("backTop");

    function controlarBotonArriba() {

        if (!backTop) return;

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        controlarBotonArriba,
        { passive:true }
    );

    controlarBotonArriba();


    if (backTop) {

        backTop.addEventListener("click", function () {

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        });

    }


    /* ======================================================
       2. DESPLAZAMIENTO SUAVE A LAS SECCIONES
       ====================================================== */

    const enlacesInternos =
        document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(function (enlace) {

        enlace.addEventListener("click", function (e) {

            const destinoID =
                enlace.getAttribute("href");

            if (
                !destinoID ||
                destinoID === "#"
            ) {
                return;
            }

            const destino =
                document.querySelector(destinoID);

            if (!destino) {
                return;
            }

            e.preventDefault();

            const navbar =
                document.querySelector(".navbar");

            const alturaNavbar =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const posicion =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaNavbar -
                15;

            window.scrollTo({
                top:posicion,
                behavior:"smooth"
            });

        });

    });


    /* ======================================================
       3. ANIMACIÓN DE APARICIÓN
       ====================================================== */

    const elementosReveal =
        document.querySelectorAll(
            ".proposals-hero, " +
            ".improvement-overview, " +
            ".proposal-section, " +
            ".proposals-closing"
        );


    const observador =
        new IntersectionObserver(
            function (entradas, observer) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entrada.target
                        );

                    }

                });

            },
            {
                threshold:0.12,
                rootMargin:"0px 0px -50px 0px"
            }
        );


    elementosReveal.forEach(function (elemento) {

        observador.observe(elemento);

    });


    /* ======================================================
       4. VISOR CAMBIANTE — REDES SOCIALES
       ====================================================== */

    const socialImage =
        document.getElementById("socialImage");

    const socialPlaceholder =
        document.getElementById(
            "socialPlaceholder"
        );

    const socialCards =
        document.querySelectorAll(
            ".social-card[data-image]"
        );


    console.log(
        "Visor de redes encontrado:",
        socialImage
    );

    console.log(
        "Tarjetas encontradas:",
        socialCards.length
    );


    /* ======================================================
       FUNCIÓN PARA CAMBIAR LA IMAGEN
       ====================================================== */

    function cambiarImagenSocial(card) {

        if (!socialImage) {

            console.error(
                "No existe #socialImage en el HTML."
            );

            return;
        }


        const nuevaImagen =
            card.getAttribute("data-image");

        const nuevoAlt =
            card.getAttribute("data-alt") ||
            "Imagen de redes sociales SAMILU";


        if (!nuevaImagen) {

            console.error(
                "La tarjeta no tiene data-image:",
                card
            );

            return;
        }


        /* -----------------------------------------------
           Cambiar tarjeta activa
           ----------------------------------------------- */

        socialCards.forEach(function (item) {

            item.classList.remove("active");

        });

        card.classList.add("active");


        /* -----------------------------------------------
           Preparar efecto
           ----------------------------------------------- */

        socialImage.classList.add(
            "image-changing"
        );


        /* -----------------------------------------------
           Precargar imagen
           ----------------------------------------------- */

        const imagenNueva =
            new Image();


        imagenNueva.onload = function () {

            /* Cambiar imagen */

            socialImage.src =
                nuevaImagen;

            socialImage.alt =
                nuevoAlt;


            socialImage.style.display =
                "block";


            /* Ocultar placeholder */

            if (socialPlaceholder) {

                socialPlaceholder.style.display =
                    "none";

            }


            /* Mostrar imagen */

            setTimeout(function () {

                socialImage.classList.remove(
                    "image-changing"
                );

            }, 30);

        };


        imagenNueva.onerror = function () {

            console.error(
                "No se pudo cargar:",
                nuevaImagen
            );


            socialImage.classList.remove(
                "image-changing"
            );


            socialImage.style.display =
                "none";


            if (socialPlaceholder) {

                socialPlaceholder.style.display =
                    "flex";


                const texto =
                    socialPlaceholder.querySelector(
                        "span"
                    );

                if (texto) {

                    texto.textContent =
                        "NO SE ENCONTRÓ LA IMAGEN";

                }

            }

        };


        /* Iniciar carga */

        imagenNueva.src =
            nuevaImagen;

    }


    /* ======================================================
       5. EVENTO CLICK EN CADA RED SOCIAL
       ====================================================== */

    socialCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                cambiarImagenSocial(card);

            }
        );

    });


    /* ======================================================
       6. CARGAR FACEBOOK COMO IMAGEN INICIAL
       ====================================================== */

    if (
        socialImage &&
        socialCards.length > 0
    ) {

        const primeraTarjeta =
            document.querySelector(
                ".social-card[data-image]"
            );


        if (primeraTarjeta) {

            /* Marcar Facebook como activo */

            socialCards.forEach(function (card) {

                card.classList.remove(
                    "active"
                );

            });

            primeraTarjeta.classList.add(
                "active"
            );


            /* Cargar imagen inicial */

            const imagenInicial =
                primeraTarjeta.getAttribute(
                    "data-image"
                );


            if (imagenInicial) {

                socialImage.src =
                    imagenInicial;

                socialImage.alt =
                    primeraTarjeta.getAttribute(
                        "data-alt"
                    ) ||
                    "Imagen inicial de redes sociales";

            }

        }

    }


    /* ======================================================
       7. DETECCIÓN DE IMÁGENES DE LAS OTRAS PROPUESTAS
       ====================================================== */

    const imagenesPropuesta =
        document.querySelectorAll(
            ".proposal-image-slot img"
        );


    imagenesPropuesta.forEach(function (imagen) {

        imagen.addEventListener(
            "error",
            function () {

                imagen.style.display =
                    "none";

                const placeholder =
                    imagen.parentElement.querySelector(
                        ".proposal-placeholder"
                    );

                if (placeholder) {

                    placeholder.style.display =
                        "flex";

                }

            }
        );


        imagen.addEventListener(
            "load",
            function () {

                imagen.style.display =
                    "block";

                const placeholder =
                    imagen.parentElement.querySelector(
                        ".proposal-placeholder"
                    );

                /* No ocultar el placeholder del
                   visor social si no corresponde */

                if (
                    placeholder &&
                    imagen.id !== "socialImage"
                ) {

                    placeholder.style.display =
                        "none";

                }

            }
        );

    });


    /* ======================================================
       8. INICIALIZAR IMÁGENES
       ====================================================== */

    imagenesPropuesta.forEach(function (imagen) {

        if (imagen.complete) {

            if (imagen.naturalWidth > 0) {

                imagen.style.display =
                    "block";

                const placeholder =
                    imagen.parentElement.querySelector(
                        ".proposal-placeholder"
                    );

                if (
                    placeholder &&
                    imagen.id !== "socialImage"
                ) {

                    placeholder.style.display =
                        "none";

                }

            } else {

                imagen.style.display =
                    "none";

            }

        }

    });


    /* ======================================================
       FIN
       ====================================================== */

    console.log(
        "SAMILU — propuestas-mejora.js cargado correctamente."
    );

});

/* ==========================================================
   SAMILU — VISOR DE IMÁGENES AMPLIADAS (LIGHTBOX)
   Permite hacer clic en una imagen para verla en grande.
   ========================================================== */

(() => {
    "use strict";

    // Evita crear el visor más de una vez.
    if (document.getElementById("samiluImageLightbox")) return;

    // Crear el fondo del visor.
    const lightbox = document.createElement("div");
    lightbox.id = "samiluImageLightbox";
    lightbox.className = "samilu-image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Vista ampliada de la imagen");
    lightbox.setAttribute("aria-hidden", "true");

    // Crear el botón de cierre.
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "samilu-image-lightbox__close";
    closeButton.setAttribute("aria-label", "Cerrar imagen ampliada");
    closeButton.innerHTML = "&times;";

    // Crear la imagen ampliada.
    const enlargedImage = document.createElement("img");
    enlargedImage.className = "samilu-image-lightbox__image";
    enlargedImage.alt = "";
    enlargedImage.draggable = false;

    lightbox.append(closeButton, enlargedImage);
    document.body.appendChild(lightbox);

    let previousOverflow = "";
    let previouslyFocusedElement = null;

    // Abrir el visor.
    function openLightbox(sourceImage) {
        // No abrir imágenes que no se han cargado correctamente.
        if (
            !sourceImage.naturalWidth ||
            getComputedStyle(sourceImage).display === "none"
        ) {
            return;
        }

        previouslyFocusedElement = document.activeElement;
        previousOverflow = document.body.style.overflow;

        enlargedImage.src = sourceImage.currentSrc || sourceImage.src;
        enlargedImage.alt = sourceImage.alt || "Imagen ampliada de SAMILU";

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");

        // Evitar que la página se desplace detrás del visor.
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    // Cerrar el visor.
    function closeLightbox() {
        if (!lightbox.classList.contains("is-open")) return;

        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousOverflow;

        enlargedImage.removeAttribute("src");

        // Devolver el foco al elemento anterior.
        if (
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === "function"
        ) {
            previouslyFocusedElement.focus();
        }
    }

    // Detectar clics en las imágenes de las propuestas.
    // También funciona cuando cambia la imagen de redes sociales.
    document.addEventListener("click", (event) => {
        const clickedImage = event.target.closest(
            ".proposal-image-slot img"
        );

        if (!clickedImage) return;

        openLightbox(clickedImage);
    });

    // Cerrar con el botón X.
    closeButton.addEventListener("click", closeLightbox);

    // Cerrar al pulsar el fondo oscuro.
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar al presionar Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
})();
