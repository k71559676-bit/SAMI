/* ==========================================================
   SAMILU — IDENTIDAD VISUAL
   JS COMPLETO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       MENÚ ACTIVO
    ====================================================== */

    const currentPage = document.body.dataset.page;

    document
        .querySelectorAll(".nav-item[data-page]")
        .forEach(item => {

            item.classList.remove("active");

            if (item.dataset.page === currentPage) {
                item.classList.add("active");
            }

        });


    /* ======================================================
       REVEAL GENERAL AL HACER SCROLL
    ====================================================== */

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    document
        .querySelectorAll(
            ".visual-section, .visual-closing"
        )
        .forEach(section => {

            section.classList.add("reveal-item");

            revealObserver.observe(section);

        });


    /* ======================================================
       BOCETOS Y PROCESO DE CREACIÓN
       Animación de las tarjetas
    ====================================================== */

    const sketchCards =
        document.querySelectorAll(".sketch-card");


    if (sketchCards.length > 0) {

        const sketchObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const card = entry.target;

                            const index =
                                [...sketchCards]
                                .indexOf(card);

                            setTimeout(() => {

                                card.classList.add("show");

                            }, index * 130);

                            sketchObserver.unobserve(card);
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        sketchCards.forEach(card => {

            sketchObserver.observe(card);

        });


        /* ==================================================
           EFECTO HOVER DE LOS NÚMEROS
        ================================================== */

        sketchCards.forEach(card => {

            const number =
                card.querySelector(".sketch-number");


            if (!number) return;


            card.addEventListener(
                "mouseenter",
                () => {

                    number.style.transform =
                        "scale(1.12) rotate(-5deg)";

                    number.style.transition =
                        "transform .4s ease";

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    number.style.transform =
                        "scale(1) rotate(0deg)";

                }
            );

        });

    }


    /* ======================================================
       EFECTO DEL RESUMEN DEL PROCESO
    ====================================================== */

    const selectionSummary =
        document.querySelector(
            ".selection-summary"
        );


    if (selectionSummary) {

        const summaryObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            selectionSummary.classList.add(
                                "summary-visible"
                            );

                            summaryObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.20
                }
            );


        summaryObserver.observe(
            selectionSummary
        );

    }


    /* ======================================================
       PALETA INTERACTIVA
       Muestra HEX + RGB + CMYK
    ====================================================== */

    const colorCards =
        document.querySelectorAll(
            ".color-card"
        );


    const colorDetail =
        document.getElementById(
            "colorDetail"
        );


    const detailColorName =
        document.getElementById(
            "detailColorName"
        );


    const detailHex =
        document.getElementById(
            "detailHex"
        );


    const detailRgb =
        document.getElementById(
            "detailRgb"
        );


    const detailCmyk =
        document.getElementById(
            "detailCmyk"
        );


    const colorData = {

        gold: {
            name: "Dorado",
            hex: "#FAB902",
            rgb: "R:250 G:180 B:2",
            cmyk: "C:2 M:30 Y:100 K:0",
            background: "#FAB902"
        },

        brown: {
            name: "Marrón",
            hex: "#722E01",
            rgb: "R:114 G:46 B:1",
            cmyk: "C:37 M:80 Y:100 K:52",
            background: "#722E01"
        },

        "green-dark": {
            name: "Verde oscuro",
            hex: "#19681E",
            rgb: "R:25 G:104 B:30",
            cmyk: "C:89 M:35 Y:100 K:31",
            background: "#19681E"
        },

        "green-light": {
            name: "Verde claro",
            hex: "#70B123",
            rgb: "R:112 G:177 B:35",
            cmyk: "C:64 M:7 Y:100 K:0",
            background: "#70B123"
        },

        cream: {
            name: "Crema",
            hex: "#FDF6D3",
            rgb: "R:253 G:246 B:211",
            cmyk: "C:1 M:1 Y:20 K:0",
            background: "#FDF6D3"
        }

    };


    colorCards.forEach(card => {

        /* ----------------------------------------------
           AL ENTRAR
        ---------------------------------------------- */

        card.addEventListener(
            "mouseenter",
            () => {

                const key =
                    card.dataset.color;

                const data =
                    colorData[key];


                if (!data) return;


                /* Datos */

                if (detailColorName) {

                    detailColorName.textContent =
                        data.name;

                }


                if (detailHex) {

                    detailHex.textContent =
                        data.hex;

                }


                if (detailRgb) {

                    detailRgb.textContent =
                        data.rgb;

                }


                if (detailCmyk) {

                    detailCmyk.textContent =
                        data.cmyk;

                }


                /* Fondo */

                if (colorDetail) {

                    colorDetail.style.background =
                        data.background;

                }


                /* Color del nombre */

                if (
                    key === "brown" ||
                    key === "green-dark"
                ) {

                    if (detailColorName) {

                        detailColorName.style.color =
                            "#FFFFFF";

                    }

                } else {

                    if (detailColorName) {

                        detailColorName.style.color =
                            "#722E01";

                    }

                }


                /* ------------------------------------------
                   ATENUAR OTROS COLORES
                ------------------------------------------ */

                colorCards.forEach(other => {

                    if (other !== card) {

                        other.style.opacity =
                            "0.65";

                        other.style.transform =
                            "scale(.98)";

                    }

                });

            }
        );


        /* ----------------------------------------------
           AL SALIR
        ---------------------------------------------- */

        card.addEventListener(
            "mouseleave",
            () => {

                if (detailColorName) {

                    detailColorName.textContent =
                        "Pasa el cursor sobre un color";

                    detailColorName.style.color =
                        "#FFFFFF";

                }


                if (detailHex) {

                    detailHex.textContent =
                        "—";

                }


                if (detailRgb) {

                    detailRgb.textContent =
                        "—";

                }


                if (detailCmyk) {

                    detailCmyk.textContent =
                        "—";

                }


                if (colorDetail) {

                    colorDetail.style.background =
                        "#722E01";

                }


                /* Restaurar tarjetas */

                colorCards.forEach(other => {

                    other.style.opacity =
                        "1";

                    other.style.transform =
                        "";

                });

            }
        );

    });


    /* ======================================================
       BOTÓN VOLVER ARRIBA
    ====================================================== */

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
       NAVEGACIÓN SUAVE
    ====================================================== */

    document
        .querySelectorAll(
            'a[href*="#"]'
        )
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
                       Si el enlace lleva a otra página,
                       dejamos que el navegador navegue
                       normalmente.
                    */

                    if (
                        url.pathname !==
                        window.location.pathname
                    ) {

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
       MOVIMIENTO SUTIL DEL IMAGOTIPO HERO
    ====================================================== */

    const logoDisplay =
        document.querySelector(
            ".logo-display"
        );


    const hero =
        document.querySelector(
            ".visual-hero"
        );


    if (
        logoDisplay &&
        hero
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const moveX =
                    (mouseX - centerX) / 35;


                const moveY =
                    (mouseY - centerY) / 35;


                logoDisplay.style.transform =
                    `
                    translate(${moveX}px, ${moveY}px)
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                logoDisplay.style.transform =
                    "";

            }
        );

    }


    /* ======================================================
       EFECTO PARALLAX SUAVE EN LAS DECORACIONES
    ====================================================== */

    const sketchesSection =
        document.querySelector(
            ".sketches-section"
        );


    if (sketchesSection) {

        sketchesSection.addEventListener(
            "mousemove",
            event => {

                const rect =
                    sketchesSection.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 20;


                const moveY =
                    (y - 0.5) * 20;


                sketchesSection.style.setProperty(
                    "--mouse-x",
                    `${moveX}px`
                );


                sketchesSection.style.setProperty(
                    "--mouse-y",
                    `${moveY}px`
                );

            }
        );

    }


    /* ======================================================
       ANIMACIÓN DE LA PROPUESTA SELECCIONADA
    ====================================================== */

    const selectedSketch =
        document.querySelector(
            ".sketch-card.selected"
        );


    if (selectedSketch) {

        selectedSketch.addEventListener(
            "mouseenter",
            () => {

                selectedSketch
                    .classList
                    .add("selected-hover");

            }
        );


        selectedSketch.addEventListener(
            "mouseleave",
            () => {

                selectedSketch
                    .classList
                    .remove("selected-hover");

            }
        );

    }


});
/* ==========================================================
   LIGHTBOX — IMAGEN AMPLIADA
========================================================== */

const sketchImages =
    document.querySelectorAll(
        ".sketch-image-box img"
    );


/* Crear la ventana ampliada */

const lightbox =
    document.createElement("div");

lightbox.className =
    "image-lightbox";


/* Botón cerrar */

const closeButton =
    document.createElement("button");

closeButton.className =
    "lightbox-close";

closeButton.innerHTML =
    "&times;";

closeButton.setAttribute(
    "aria-label",
    "Cerrar imagen"
);


/* Imagen grande */

const lightboxImage =
    document.createElement("img");

lightboxImage.alt =
    "Vista ampliada de la imagen";


/* Texto */

const lightboxTitle =
    document.createElement("div");

lightboxTitle.className =
    "lightbox-title";


/* Construcción */

lightbox.appendChild(
    closeButton
);

lightbox.appendChild(
    lightboxImage
);

lightbox.appendChild(
    lightboxTitle
);

document.body.appendChild(
    lightbox
);


/* ==========================================================
   ABRIR AL PASAR EL CURSOR
========================================================== */

sketchImages.forEach((image) => {

    image.addEventListener(
        "mouseenter",
        () => {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt ||
                "Imagen ampliada";


            /* Buscar nombre de la propuesta */

            const card =
                image.closest(
                    ".sketch-card"
                );


            if (card) {

                const title =
                    card.querySelector(
                        ".sketch-content h3"
                    );


                if (title) {

                    lightboxTitle.textContent =
                        title.textContent;

                }

            }


            lightbox.classList.add(
                "active"
            );

        }
    );

});


/* ==========================================================
   CERRAR AL SALIR DE LA VISTA AMPLIADA
========================================================== */

let closeTimer;


lightbox.addEventListener(
    "mouseleave",
    () => {

        closeTimer =
            setTimeout(() => {

                lightbox.classList.remove(
                    "active"
                );

            }, 120);

    }
);


/* Mantener abierta si el cursor está dentro */

lightbox.addEventListener(
    "mouseenter",
    () => {

        clearTimeout(
            closeTimer
        );

    }
);


/* ==========================================================
   BOTÓN CERRAR
========================================================== */

closeButton.addEventListener(
    "click",
    () => {

        lightbox.classList.remove(
            "active"
        );

    }
);


/* ==========================================================
   CERRAR HACIENDO CLICK EN EL FONDO
========================================================== */

lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================================
   CERRAR CON ESC
========================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);
