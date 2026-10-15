/* ==========================================================
   SAMILU — APLICACIONES
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
       2. REVEAL DE SECCIONES
    ====================================================== */

    const sections =
        document.querySelectorAll(
            ".applications-section, .application-principles, .applications-closing"
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

            section.classList.add(
                "reveal-item"
            );

            revealObserver.observe(
                section
            );

        });

    }
    else{

        sections.forEach(section => {

            section.classList.add(
                "visible"
            );

        });

    }



    /* ======================================================
       3. BOTÓN VOLVER ARRIBA
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
       4. NAVEGACIÓN SUAVE
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
       5. VISOR DE APLICACIONES
       UN SOLO CUADRO PARA TODAS LAS IMÁGENES
    ====================================================== */

    const applicationOptions =
        document.querySelectorAll(
            ".application-option"
        );


    const applicationImageViewer =
        document.getElementById(
            "applicationImageViewer"
        );


    if (
        applicationOptions.length &&
        applicationImageViewer
    ){


        applicationOptions.forEach(
            option => {


                option.addEventListener(
                    "click",
                    () => {


                        const imagePath =
                            option.dataset.image;


                        const title =
                            option.dataset.title
                            || "Aplicación SAMILU";


                        if (!imagePath){

                            return;

                        }


                        /* ==================================
                           QUITAR ACTIVO
                        =================================== */

                        applicationOptions.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        /* ==================================
                           ACTIVAR OPCIÓN
                        =================================== */

                        option.classList.add(
                            "active"
                        );


                        /* ==================================
                           CREAR IMAGEN
                        =================================== */

                        const image =
                            document.createElement(
                                "img"
                            );


                        image.src =
                            imagePath;


                        image.alt =
                            `${title} - SAMILU`;


                        /* ==================================
                           MOSTRAR EN EL ÚNICO VISOR
                        =================================== */

                        applicationImageViewer.innerHTML =
                            "";


                        applicationImageViewer.appendChild(
                            image
                        );


                        applicationImageViewer.classList.add(
                            "has-image"
                        );


                        /* ==================================
                           ERROR DE IMAGEN
                        =================================== */

                        image.addEventListener(
                            "error",
                            () => {

                                applicationImageViewer.classList.remove(
                                    "has-image"
                                );


                                applicationImageViewer.innerHTML = `

                                    <div class="application-placeholder">

                                        <div class="viewer-icon">
                                            !
                                        </div>

                                        <strong>
                                            IMAGEN NO ENCONTRADA
                                        </strong>

                                        <span>
                                            Revisa la ruta:
                                            ${imagePath}
                                        </span>

                                    </div>

                                `;

                            }
                        );

                    }
                );

            }
        );



        /* ==================================================
           SELECCIONAR LA PRIMERA AUTOMÁTICAMENTE
           DESPUÉS DE UN PEQUEÑO RETRASO
        ================================================== */

        setTimeout(
            () => {

                if (
                    applicationOptions[0]
                ){

                    applicationOptions[0].click();

                }

            },
            700
        );

    }



    /* ======================================================
       6. EFECTO DE ENFOQUE EN LAS OPCIONES
    ====================================================== */

    applicationOptions.forEach(
        option => {

            option.addEventListener(
                "mouseenter",
                () => {

                    applicationOptions.forEach(
                        other => {

                            if (
                                other !== option &&
                                !other.classList.contains(
                                    "active"
                                )
                            ){

                                other.style.opacity =
                                    ".72";

                            }

                        }
                    );

                }
            );


            option.addEventListener(
                "mouseleave",
                () => {

                    applicationOptions.forEach(
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
       7. MOVIMIENTO SUTIL DEL HERO
    ====================================================== */

    const hero =
        document.querySelector(
            ".applications-hero"
        );


    const heroCircle =
        document.querySelector(
            ".hero-circle"
        );


    if (
        hero &&
        heroCircle
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


                heroCircle.style.transform =
                    `
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    rotate(
                        ${x * 3}deg
                    )
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroCircle.style.transform =
                    "";

            }
        );

    }



    /* ======================================================
       8. EFECTO EN PRINCIPIOS
    ====================================================== */

    const principleItems =
        document.querySelectorAll(
            ".principle-item"
        );


    principleItems.forEach(
        item => {

            item.addEventListener(
                "mouseenter",
                () => {

                    item.style.transform =
                        "translateX(7px)";

                    item.style.transition =
                        "transform .3s ease";

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    item.style.transform =
                        "";

                }
            );

        }
    );


});