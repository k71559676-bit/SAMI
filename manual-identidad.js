/* ==========================================================
   SAMILU — MANUAL DE IDENTIDAD CORPORATIVA
========================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ======================================================
       1. MENÚ ACTIVO
    ====================================================== */

    const currentPage =
        document.body.dataset.page;


    document
        .querySelectorAll(".nav-item[data-page]")
        .forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.page === currentPage
            ) {
                item.classList.add("active");
            }

        });



    /* ======================================================
       2. REVEAL DE SECCIONES
    ====================================================== */

    const sections =
        document.querySelectorAll(
            ".manual-section, .manual-closing"
        );


    if (
        "IntersectionObserver"
        in window
    ){

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold:.12
                }
            );


        sections.forEach(section => {

            revealObserver.observe(section);

        });

    }
    else{

        sections.forEach(section => {

            section.classList.add("visible");

        });

    }



    /* ======================================================
       3. NAVEGACIÓN SUAVE
    ====================================================== */

    document
        .querySelectorAll('a[href*="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const url =
                        new URL(
                            link.href,
                            window.location.href
                        );


                    if (
                        url.pathname !==
                        window.location.pathname
                    ){
                        return;
                    }


                    if (!url.hash){
                        return;
                    }


                    const target =
                        document.querySelector(
                            url.hash
                        );


                    if (!target){
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:"smooth",
                        block:"start"
                    });


                    history.replaceState(
                        null,
                        "",
                        url.hash
                    );

                }
            );

        });



    /* ======================================================
       4. BOTÓN ARRIBA
    ====================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    if (backTop){

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 450
                ){

                    backTop.classList.add(
                        "show"
                    );

                }
                else{

                    backTop.classList.remove(
                        "show"
                    );

                }

            },
            {
                passive:true
            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }
        );

    }



    /* ======================================================
       5. INTERACCIÓN DE LOS ELEMENTOS DEL LOGOTIPO
    ====================================================== */

    const symbolOptions =
        document.querySelectorAll(
            ".logo-symbol-option"
        );


    const symbolDescription =
        document.getElementById(
            "logoSymbolDescription"
        );


    const symbolTexts = {

        bee:
            "La abeja representa la actividad apícola y el origen natural de los productos.",

        dipper:
            "El cucharón de miel refuerza la relación directa de SAMILU con la miel y su elaboración.",

        leaves:
            "Las hojas representan la naturaleza y el entorno de la Selva Central.",

        drops:
            "Las gotas visuales complementan el nombre y refuerzan el concepto de miel y producto."

    };


    symbolOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    symbolOptions.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    option.classList.add(
                        "active"
                    );


                    const symbol =
                        option.dataset.symbol;


                    if (
                        symbolDescription &&
                        symbolTexts[symbol]
                    ){

                        symbolDescription.style.opacity =
                            "0";


                        setTimeout(
                            () => {

                                symbolDescription.textContent =
                                    symbolTexts[symbol];


                                symbolDescription.style.opacity =
                                    "1";

                            },
                            160
                        );

                    }

                }
            );

        }
    );



    /* ======================================================
       6. PALETA INTERACTIVA
    ====================================================== */

    const wallColors =
        document.querySelectorAll(
            ".wall-color"
        );


    const colorInfo =
        document.getElementById(
            "manualColorInfo"
        );


    const colorDescriptions = {

        "#FAB902":
            "Dorado · #FAB902 · asociado visualmente con la miel, la calidez y la tradición.",

        "#722E01":
            "Marrón · #722E01 · aporta profundidad, estabilidad, calidad y definición.",

        "#19681E":
            "Verde oscuro · #19681E · representa naturaleza y origen regional.",

        "#70B123":
            "Verde claro · #70B123 · transmite frescura y una sensación juvenil.",

        "#FDF6D3":
            "Crema · #FDF6D3 · funciona como base clara y cálida para la identidad."

    };


    wallColors.forEach(
        color => {

            color.addEventListener(
                "mouseenter",
                () => {

                    const value =
                        color.dataset.color;


                    if (
                        colorInfo &&
                        colorDescriptions[value]
                    ){

                        colorInfo.textContent =
                            colorDescriptions[value];

                    }

                }
            );


            color.addEventListener(
                "mouseleave",
                () => {

                    if (colorInfo){

                        colorInfo.textContent =
                            "Pasa el cursor sobre un color.";

                    }

                }
            );

        }
    );



    /* ======================================================
       7. NODOS DE USABILIDAD
    ====================================================== */

    const useNodes =
        document.querySelectorAll(
            ".use-node"
        );


    const useMessage =
        document.getElementById(
            "useMessage"
        );


    const useTexts = {

        "node-print":
            "Impresos: tarjetas, afiches y materiales físicos.",

        "node-digital":
            "Digital: sitio web y demás soportes digitales.",

        "node-packaging":
            "Empaques: frascos, etiquetas y presentación del producto.",

        "node-social":
            "Redes: aplicaciones de la identidad en contenidos sociales."

    };


    useNodes.forEach(
        node => {

            node.addEventListener(
                "click",
                () => {

                    const className =
                        [...node.classList]
                        .find(
                            className =>
                                className.startsWith(
                                    "node-"
                                )
                        );


                    if (
                        useMessage &&
                        useTexts[className]
                    ){

                        useMessage.textContent =
                            useTexts[className];

                        useMessage.style.transform =
                            "translateX(-50%) scale(1.05)";


                        setTimeout(
                            () => {

                                useMessage.style.transform =
                                    "translateX(-50%) scale(1)";

                            },
                            220
                        );

                    }

                }
            );

        }
    );



    /* ======================================================
       8. ANIMACIÓN DE LOS TAMAÑOS
    ====================================================== */

    const sizeLogos =
        document.querySelectorAll(
            ".size-logo"
        );


    sizeLogos.forEach(
        logo => {

            logo.addEventListener(
                "mouseenter",
                () => {

                    sizeLogos.forEach(
                        other => {

                            if (
                                other !== logo
                            ){

                                other.style.opacity =
                                    ".45";

                            }

                        }
                    );

                }
            );


            logo.addEventListener(
                "mouseleave",
                () => {

                    sizeLogos.forEach(
                        other => {

                            other.style.opacity =
                                "1";

                        }
                    );

                }
            );

        }
    );



    /* ======================================================
       9. EFECTO PARALLAX SUAVE EN EL MANUAL
    ====================================================== */

    const manualBook =
        document.querySelector(
            ".manual-book"
        );


    const hero =
        document.querySelector(
            ".manual-hero"
        );


    if (
        manualBook &&
        hero
    ){

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) / rect.width - .5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) / rect.height - .5;


                manualBook.style.transform =
                    `
                    rotate(
                        ${x * 5}deg
                    )
                    translate(
                        ${x * 7}px,
                        ${y * 7}px
                    )
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                manualBook.style.transform =
                    "rotate(5deg)";

            }
        );

    }



});

/* =========================================================
   SAMILU — AMPLIACIÓN DE TODAS LAS IMÁGENES DEL MANUAL
   Clic para ampliar. X, Escape o fondo para cerrar.
   ========================================================= */

(() => {
    "use strict";

    // Evitar inicializar el visor más de una vez.
    if (window.samiluManualLightboxInitialized) return;
    window.samiluManualLightboxInitialized = true;

    function iniciarVisorSamilu() {
        const contenido = document.querySelector("main");

        if (!contenido) return;

        // Seleccionar las imágenes del contenido del manual.
        const imagenes = contenido.querySelectorAll("img");

        imagenes.forEach((img) => {
            img.classList.add("samilu-zoomable");
            img.setAttribute("tabindex", "0");
            img.setAttribute("role", "button");
            img.setAttribute(
                "aria-label",
                "Ampliar imagen: " + (img.alt || "Imagen de SAMILU")
            );
        });

        // Crear el visor automáticamente, sin modificar el HTML.
        const visor = document.createElement("div");
        visor.className = "samilu-lightbox";
        visor.setAttribute("aria-hidden", "true");
        visor.setAttribute("role", "dialog");
        visor.setAttribute("aria-modal", "true");
        visor.setAttribute("aria-label", "Imagen ampliada");

        // Botón X.
        const botonCerrar = document.createElement("button");
        botonCerrar.type = "button";
        botonCerrar.className = "samilu-lightbox__close";
        botonCerrar.textContent = "×";
        botonCerrar.setAttribute("aria-label", "Cerrar imagen ampliada");
        botonCerrar.title = "Cerrar (Esc)";

        // Imagen grande.
        const imagenGrande = document.createElement("img");
        imagenGrande.className = "samilu-lightbox__image";
        imagenGrande.alt = "";

        visor.append(botonCerrar, imagenGrande);
        document.body.appendChild(visor);

        let imagenAnterior = null;
        let overflowAnterior = "";

        // Abrir una imagen.
        function abrirImagen(img) {
            const ruta = img.currentSrc || img.src;

            // No abrir imágenes que no se hayan cargado.
            if (!ruta || !img.complete || img.naturalWidth === 0) {
                return;
            }

            imagenAnterior = img;
            overflowAnterior = document.body.style.overflow;

            imagenGrande.src = ruta;
            imagenGrande.alt = img.alt || "Imagen de SAMILU";

            visor.classList.add("is-open");
            visor.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
            botonCerrar.focus();
        }

        // Cerrar y restaurar la página.
        function cerrarImagen() {
            if (!visor.classList.contains("is-open")) return;

            visor.classList.remove("is-open");
            visor.setAttribute("aria-hidden", "true");

            document.body.style.overflow = overflowAnterior;
            imagenGrande.removeAttribute("src");

            if (imagenAnterior && imagenAnterior.isConnected) {
                imagenAnterior.focus({ preventScroll: true });
            }

            imagenAnterior = null;
        }

        // Abrir al hacer clic en cualquier imagen del contenido.
        contenido.addEventListener("click", (evento) => {
            const elemento = evento.target instanceof Element
                ? evento.target
                : evento.target.parentElement;

            const img = elemento?.closest("img.samilu-zoomable");

            if (!img) return;

            // Si la imagen está dentro de un enlace, evitar navegar.
            if (img.closest("a")) {
                evento.preventDefault();
            }

            abrirImagen(img);
        });

        // Permitir abrir imágenes con Enter o barra espaciadora.
        contenido.addEventListener("keydown", (evento) => {
            const elemento = evento.target instanceof Element
                ? evento.target
                : evento.target.parentElement;

            const img = elemento?.closest("img.samilu-zoomable");

            if (!img) return;

            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrirImagen(img);
            }
        });

        // Cerrar con la X.
        botonCerrar.addEventListener("click", cerrarImagen);

        // Cerrar al hacer clic en el fondo oscuro.
        visor.addEventListener("click", (evento) => {
            if (evento.target === visor) {
                cerrarImagen();
            }
        });

        // Cerrar al presionar Escape.
        document.addEventListener("keydown", (evento) => {
            if (
                evento.key === "Escape" &&
                visor.classList.contains("is-open")
            ) {
                cerrarImagen();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            iniciarVisorSamilu,
            { once: true }
        );
    } else {
        iniciarVisorSamilu();
    }
})();
