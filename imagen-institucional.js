/* ==========================================================
   SAMILU — IMAGEN INSTITUCIONAL
   JAVASCRIPT COMPLETO
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
       2. ANIMACIÓN DE SECCIONES
    ======================================================= */

    const sections =
        document.querySelectorAll(
            ".institutional-section, .institutional-closing"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        sections.forEach(section => {

            section.classList.add(
                "reveal-item"
            );

            observer.observe(section);

        });

    } else {

        sections.forEach(section => {

            section.classList.add(
                "visible"
            );

        });

    }



    /* ======================================================
       3. BOTÓN VOLVER ARRIBA
    ======================================================= */

    const backTop =
        document.getElementById(
            "backTop"
        );


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 450
                ) {

                    backTop.classList.add(
                        "show"
                    );

                } else {

                    backTop.classList.remove(
                        "show"
                    );

                }

            },
            {
                passive: true
            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* ======================================================
       4. DESPLAZAMIENTO SUAVE
    ======================================================= */

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


                    /*
                       Si el enlace lleva hacia
                       otra página, dejamos que
                       el navegador navegue.
                    */

                    if (
                        url.pathname !==
                        window.location.pathname
                    ) {

                        return;

                    }


                    if (!url.hash) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            url.hash
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
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
       5. EFECTO EN TARJETAS DE FORTALEZAS
    ======================================================= */

    const strengthCards =
        document.querySelectorAll(
            ".strength-card"
        );


    strengthCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                strengthCards.forEach(other => {

                    if (
                        other !== card
                    ) {

                        other.style.opacity =
                            ".65";

                    }

                });

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                strengthCards.forEach(other => {

                    other.style.opacity =
                        "1";

                });

            }
        );

    });



    /* ======================================================
       6. EFECTO EN DIMENSIONES
    ======================================================= */

    const dimensions =
        document.querySelectorAll(
            ".dimension-card"
        );


    dimensions.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-8px) scale(1.02)";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });



    /* ======================================================
       7. MOVIMIENTO SUTIL DEL HERO
    ======================================================= */

    const hero =
        document.querySelector(
            ".institutional-hero"
        );


    const heroImage =
        document.querySelector(
            ".hero-image-frame"
        );


    if (
        hero &&
        heroImage
    ) {

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


                heroImage.style.transform =
                    `
                    rotate(2deg)
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "rotate(2deg)";

            }
        );

    }



    /* ======================================================
       8. PERCEPCIÓN DEL CLIENTE
       VISOR ÚNICO DE IMÁGENES
    ======================================================= */

    const perceptionOptions =
        document.querySelectorAll(
            ".perception-option"
        );


    const perceptionImageView =
        document.getElementById(
            "perceptionImageView"
        );


    /*
       Verificamos que existan
       los botones y el visor.
    */

    if (
        perceptionOptions.length > 0 &&
        perceptionImageView
    ) {


        perceptionOptions.forEach(
            option => {


                /* ==========================================
                   CLICK EN CALIDAD / CERCANÍA / NATURALEZA
                =========================================== */

                option.addEventListener(
                    "click",
                    () => {


                        const imagePath =
                            option.dataset.image;


                        if (!imagePath) {

                            return;

                        }


                        /* ==================================
                           QUITAR ACTIVO A LOS DEMÁS
                        =================================== */

                        perceptionOptions.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        /* ==================================
                           ACTIVAR EL BOTÓN SELECCIONADO
                        =================================== */

                        option.classList.add(
                            "active"
                        );


                        /* ==================================
                           CREAR LA IMAGEN
                        =================================== */

                        const newImage =
                            document.createElement(
                                "img"
                            );


                        newImage.src =
                            imagePath;


                        newImage.alt =
                            `Imagen de ${
                                option.dataset.title ||
                                "SAMILU"
                            }`;


                        /* ==================================
                           REEMPLAZAR SOLO EL CONTENIDO
                           DEL VISOR
                        =================================== */

                        perceptionImageView.innerHTML =
                            "";


                        perceptionImageView.appendChild(
                            newImage
                        );


                        perceptionImageView.classList.add(
                            "has-image"
                        );


                        /* ==================================
                           SI LA IMAGEN NO EXISTE
                        =================================== */

                        newImage.addEventListener(
                            "error",
                            () => {

                                perceptionImageView.innerHTML =
                                    `

                                    <div class="perception-placeholder">

                                        <span>
                                            IMAGEN NO ENCONTRADA
                                        </span>

                                        <small>
                                            Revisa la ubicación:
                                            ${imagePath}
                                        </small>

                                    </div>

                                    `;


                                perceptionImageView.classList.remove(
                                    "has-image"
                                );

                            }
                        );


                    }
                );

            }
        );

    }



    /* ======================================================
       9. EFECTO HOVER EN LAS OPCIONES DE PERCEPCIÓN
    ======================================================= */

    perceptionOptions.forEach(
        option => {

            option.addEventListener(
                "mouseenter",
                () => {

                    if (
                        !option.classList.contains(
                            "active"
                        )
                    ) {

                        option.style.transform =
                            "translateX(6px)";

                    }

                }
            );


            option.addEventListener(
                "mouseleave",
                () => {

                    if (
                        !option.classList.contains(
                            "active"
                        )
                    ) {

                        option.style.transform =
                            "";

                    }

                }
            );

        }
    );


});