document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MENÚ ACTIVO SEGÚN LA PÁGINA
    ===================================================== */

    const paginaActual = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    const equivalencias = {
        "index.html": "inicio",
        "": "inicio",
        "empresa.html": "empresa",
        "publico-objetivo.html": "publico",
        "identidad-corporativa.html": "corporativa",
        "identidad-visual.html": "visual",
        "imagen-institucional.html": "imagen",
        "aplicaciones.html": "aplicaciones",
        "comunicaciones.html": "comunicacion",
        "manual-identidad.html": "manual",
        "propuestas-mejora.html": "propuestas"
    };


    const paginaActiva =
        equivalencias[paginaActual] || "inicio";


    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(item => {

        item.classList.remove("active");


        if (item.dataset.page === paginaActiva) {

            item.classList.add("active");

        }

    });


    /* =====================================================
       MENÚS DESPLEGABLES
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".dropdown-item");


    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(".nav-button");


        if (!button) return;


        button.addEventListener("click", event => {

            event.stopPropagation();


            /* Cerrar los demás */

            dropdowns.forEach(other => {

                if (other !== dropdown) {

                    other.classList.remove("open");

                }

            });


            /* Abrir / cerrar el actual */

            dropdown.classList.toggle("open");

        });

    });


    /* =====================================================
       CERRAR MENÚ AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener("click", () => {

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("open");

        });

    });


    /* =====================================================
       EVITAR QUE EL CLICK EN EL SUBMENÚ LO CIERRE
    ===================================================== */

    document
        .querySelectorAll(".dropdown-menu")
        .forEach(menu => {

            menu.addEventListener("click", event => {

                event.stopPropagation();

            });

        });


    /* =====================================================
       BENEFICIOS
    ===================================================== */

    const benefits =
        document.querySelectorAll(".benefit");


    /* =====================================================
       ANIMACIÓN DE BENEFICIOS AL APARECER
    ===================================================== */

    if (benefits.length > 0) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach((entry, index) => {

                        if (entry.isIntersecting) {

                            setTimeout(() => {

                                entry.target.classList.add("show");

                            }, index * 120);


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.3
                }

            );


        benefits.forEach(benefit => {

            observer.observe(benefit);

        });

    }


    /* =====================================================
       TARJETAS DE BENEFICIOS
       SOLO UNA ABIERTA A LA VEZ
    ===================================================== */

    benefits.forEach(card => {


        /* CLICK */

        card.addEventListener("click", () => {


            /* Cerrar las demás */

            benefits.forEach(otherCard => {

                if (otherCard !== card) {

                    otherCard.classList.remove(
                        "flipped"
                    );

                }

            });


            /* Voltear la seleccionada */

            card.classList.toggle("flipped");

        });


        /* =================================================
           ENTER / ESPACIO
        ================================================= */

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                /* Cerrar las demás */

                benefits.forEach(otherCard => {

                    if (otherCard !== card) {

                        otherCard.classList.remove(
                            "flipped"
                        );

                    }

                });


                /* Voltear la seleccionada */

                card.classList.toggle(
                    "flipped"
                );

            }

        });


    });


    /* =====================================================
       MOVIMIENTO SUAVE DEL HERO
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    const heroImage =
        document.querySelector(".hero-image");


    if (hero && heroImage) {


        hero.addEventListener(
            "mousemove",
            event => {


                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left)
                    / rect.width - 0.5;


                const y =
                    (event.clientY - rect.top)
                    / rect.height - 0.5;


                heroImage.style.transform =
                    `scale(1.025)
                     translate(
                        ${x * -8}px,
                        ${y * -5}px
                     )`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "scale(1) translate(0,0)";

            }
        );

    }


    /* =====================================================
       BOTÓN DEL HERO
       LLEVAR A LA SECCIÓN DE PRODUCTOS
    ===================================================== */

    const heroButton =
        document.querySelector(".hero-button");


    if (heroButton) {


        const arrow =
            heroButton.querySelector(".button-arrow");


        heroButton.addEventListener(
            "mouseenter",
            () => {

                if (arrow) {

                    arrow.style.transform =
                        "translateX(5px)";

                }

            }
        );


        heroButton.addEventListener(
            "mouseleave",
            () => {

                if (arrow) {

                    arrow.style.transform =
                        "translateX(0)";

                }

            }
        );


        /* ================================================
           IR A PRODUCTOS
        ================================================ */

        heroButton.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const target =
                    document.querySelector("#productos");


                if (target) {

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    }


    /* =====================================================
       EFECTO HOVER EN BENEFICIOS
    ===================================================== */

    benefits.forEach(benefit => {


        benefit.addEventListener(
            "mouseenter",
            () => {

                benefit.style.zIndex = "10";

            }
        );


        benefit.addEventListener(
            "mouseleave",
            () => {

                benefit.style.zIndex = "1";

            }
        );

    });


    /* =====================================================
       VENTANA DE IMAGEN AMPLIADA
    ===================================================== */

    const imagePlaceholders =
        document.querySelectorAll(
            ".benefit-image-placeholder"
        );


    if (imagePlaceholders.length > 0) {


        /* Crear ventana */

        const previewWindow =
            document.createElement("div");


        previewWindow.className =
            "image-preview-window";


        previewWindow.innerHTML =
            `
                <img
                    src=""
                    alt="Vista ampliada"
                >
            `;


        document.body.appendChild(
            previewWindow
        );


        const previewImage =
            previewWindow.querySelector("img");


        /* ================================================
           ACTIVAR VENTANA PARA CADA IMAGEN
        ================================================ */

        imagePlaceholders.forEach(
            placeholder => {


                const image =
                    placeholder.querySelector("img");


                /* Si todavía no existe imagen,
                   no hacer nada */

                if (!image) return;


                /* -----------------------------------------
                   ENTRAR
                ----------------------------------------- */

                placeholder.addEventListener(
                    "mouseenter",
                    event => {


                        previewImage.src =
                            image.src;


                        previewImage.alt =
                            image.alt ||
                            "Vista ampliada";


                        previewWindow.classList.add(
                            "show"
                        );


                        moverVentana(
                            event
                        );

                    }
                );


                /* -----------------------------------------
                   MOVER
                ----------------------------------------- */

                placeholder.addEventListener(
                    "mousemove",
                    event => {

                        moverVentana(
                            event
                        );

                    }
                );


                /* -----------------------------------------
                   SALIR
                ----------------------------------------- */

                placeholder.addEventListener(
                    "mouseleave",
                    () => {

                        previewWindow.classList.remove(
                            "show"
                        );

                    }
                );

            }
        );


        /* ================================================
           POSICIÓN DE LA VENTANA
        ================================================ */

        function moverVentana(event) {


            const separacion = 20;


            let x =
                event.clientX +
                separacion;


            let y =
                event.clientY +
                separacion;


            const ancho =
                previewWindow.offsetWidth;


            const alto =
                previewWindow.offsetHeight;


            /* Evitar salir por la derecha */

            if (
                x + ancho >
                window.innerWidth
            ) {

                x =
                    event.clientX -
                    ancho -
                    separacion;

            }


            /* Evitar salir por abajo */

            if (
                y + alto >
                window.innerHeight
            ) {

                y =
                    event.clientY -
                    alto -
                    separacion;

            }


            /* Evitar salir por arriba */

            if (y < 10) {

                y = 10;

            }


            /* Evitar salir por la izquierda */

            if (x < 10) {

                x = 10;

            }


            previewWindow.style.left =
                `${x}px`;


            previewWindow.style.top =
                `${y}px`;

        }

    }


    /* =====================================================
       CARGA INICIAL
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});