/* ==========================================================
   SAMILU — COMUNICACIONES
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
            ){

                item.classList.add("active");

            }

        });



    /* ======================================================
       2. REVEAL DE SECCIONES
    ====================================================== */

    const sections =
        document.querySelectorAll(
            ".communication-section, .communication-closing"
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
       4. BOTÓN VOLVER ARRIBA
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
       5. VISOR DE CANALES
       FACEBOOK / INSTAGRAM / TIKTOK
    ====================================================== */

    const channelOptions =
        document.querySelectorAll(
            ".channel-option"
        );


    const channelImageViewer =
        document.getElementById(
            "channelImageViewer"
        );


    if (
        channelOptions.length > 0 &&
        channelImageViewer
    ){


        channelOptions.forEach(
            option => {

                option.addEventListener(
                    "click",
                    () => {


                        const imagePath =
                            option.dataset.image;


                        const title =
                            option.dataset.title
                            || "Canal SAMILU";


                        if (!imagePath){

                            return;

                        }


                        /* ACTIVAR */

                        channelOptions.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        option.classList.add(
                            "active"
                        );


                        /* CREAR IMAGEN */

                        const image =
                            document.createElement(
                                "img"
                            );


                        image.src =
                            imagePath;


                        image.alt =
                            `${title} - SAMILU`;


                        /* CAMBIAR EL ÚNICO VISOR */

                        channelImageViewer.innerHTML =
                            "";


                        channelImageViewer.appendChild(
                            image
                        );


                        channelImageViewer.classList.add(
                            "has-image"
                        );


                        /* ERROR */

                        image.addEventListener(
                            "error",
                            () => {

                                channelImageViewer.classList.remove(
                                    "has-image"
                                );


                                channelImageViewer.innerHTML = `

                                    <div class="channel-placeholder">

                                        <span>
                                            IMAGEN NO ENCONTRADA
                                        </span>

                                        <small>
                                            Revisa la ubicación:
                                            ${imagePath}
                                        </small>

                                    </div>

                                `;

                            }
                        );

                    }
                );

            }
        );


        /* Seleccionar Facebook inicialmente */

        setTimeout(
            () => {

                if (
                    channelOptions[0]
                ){

                    channelOptions[0].click();

                }

            },
            500
        );

    }



    /* ======================================================
       6. BOTÓN — REVELAR MENSAJE
    ====================================================== */

    const replayMessage =
        document.getElementById(
            "replayMessage"
        );


    const posterMessage =
        document.getElementById(
            "posterMessage"
        );


    if (
        replayMessage &&
        posterMessage
    ){

        const originalHTML =
            posterMessage.innerHTML;


        replayMessage.addEventListener(
            "click",
            () => {


                posterMessage.classList.remove(
                    "message-replay"
                );


                void posterMessage.offsetWidth;


                posterMessage.innerHTML =
                    originalHTML;


                posterMessage.classList.add(
                    "message-replay"
                );


            }
        );

    }



    /* ======================================================
       7. EFECTO PARALLAX DEL POSTER
    ====================================================== */

    const messageVisual =
        document.querySelector(
            ".message-visual"
        );


    const messagePoster =
        document.querySelector(
            ".message-poster"
        );


    if (
        messageVisual &&
        messagePoster
    ){

        messageVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    messageVisual.getBoundingClientRect();


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


                messagePoster.style.transform =
                    `
                    rotate(
                        ${x * 4}deg
                    )
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;

            }
        );


        messageVisual.addEventListener(
            "mouseleave",
            () => {

                messagePoster.style.transform =
                    "rotate(4deg)";

            }
        );

    }



    /* ======================================================
       8. EFECTO DE HOVER EN LOS CANALES
    ====================================================== */

    channelOptions.forEach(
        option => {

            option.addEventListener(
                "mouseenter",
                () => {

                    channelOptions.forEach(
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

                    channelOptions.forEach(
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
       9. SLOGAN — REVELACIÓN LETRA POR LETRA
    ====================================================== */

    const typedSlogan =
        document.getElementById(
            "typedSlogan"
        );


    if (typedSlogan){

        const sloganText =
            "El sabor natural de la Selva Central.";


        let index = 0;


        typedSlogan.textContent =
            "";


        const typeSlogan =
            () => {

                if (
                    index <
                    sloganText.length
                ){

                    typedSlogan.textContent +=
                        sloganText.charAt(index);

                    index++;

                    setTimeout(
                        typeSlogan,
                        45
                    );

                }

            };


        const sloganObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ){

                                typeSlogan();

                                sloganObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:.4
                }
            );


        sloganObserver.observe(
            typedSlogan
        );

    }



    /* ======================================================
       10. RESPETO A REDUCED MOTION
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reducedMotion.matches
    ){

        document
            .querySelectorAll("*")
            .forEach(element => {

                element.style.animationDuration =
                    "0.01ms";

                element.style.transitionDuration =
                    "0.01ms";

            });

    }


});