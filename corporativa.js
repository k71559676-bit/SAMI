/* =========================================================
   SAMILU — COMUNICACIÓN CORPORATIVA
   Efectos interactivos y animaciones
   Archivo: corporativa.js
   ========================================================= */

(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", iniciarCorporativa);

    function iniciarCorporativa() {
        const pagina = document.querySelector(".communication-page");

        // Evita ejecutar los efectos en páginas que no correspondan.
        if (!pagina) return;

        const movimientoReducido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        /* =====================================================
           1. ESTILOS DE LOS EFECTOS
           ===================================================== */

        const estilos = document.createElement("style");

        estilos.textContent = `
            /* Aparición progresiva al desplazarse */

            .communication-page .cc-js-reveal {
                opacity: 0;
                transform: translateY(24px);
                transition:
                    opacity .65s ease,
                    transform .65s cubic-bezier(.2,.7,.2,1);
                transition-delay: var(--cc-delay, 0ms);
            }

            .communication-page .cc-js-reveal.cc-js-visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Mantener los efectos hover de las tarjetas */

            .communication-page .data-card.cc-js-reveal.cc-js-visible:hover,
            .communication-page .info-panel.cc-js-reveal.cc-js-visible:hover,
            .communication-page .foda-card.cc-js-reveal.cc-js-visible:hover,
            .communication-page .message-card.cc-js-reveal.cc-js-visible:hover,
            .communication-page .audience-branches article.cc-js-reveal.cc-js-visible:hover,
            .communication-page .objective-list article.cc-js-reveal.cc-js-visible:hover,
            .communication-page .budget-grid article.cc-js-reveal.cc-js-visible:hover,
            .communication-page .process-flow article.cc-js-reveal.cc-js-visible:hover {
                transform: translateY(-5px);
                transition-delay: 0ms;
            }

            /* Barra de progreso de lectura */

            .cc-reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                z-index: 10000;
                pointer-events: none;
                background: rgba(232, 165, 26, .13);
            }

            .cc-reading-progress__bar {
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    #AAB87A,
                    #E8A51A,
                    #F5CB61
                );
                transform: scaleX(0);
                transform-origin: left center;
                will-change: transform;
                box-shadow: 0 0 10px rgba(232, 165, 26, .35);
            }

            /* Botón flotante para volver arriba */

            .cc-back-top {
                position: fixed;
                right: 24px;
                bottom: 88px;
                z-index: 999;
                display: grid;
                place-items: center;
                width: 49px;
                height: 49px;
                padding: 0;
                border: 1px solid rgba(255, 255, 255, .45);
                border-radius: 17px;
                background: #5D542E;
                color: #FFF9E8;
                box-shadow: 0 9px 25px rgba(63, 58, 34, .24);
                font-family: inherit;
                font-size: 1.65rem;
                font-weight: 700;
                line-height: 1;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transform: translateY(12px);
                transition:
                    opacity .25s ease,
                    transform .25s ease,
                    background .25s ease,
                    box-shadow .25s ease,
                    visibility .25s ease;
            }

            .cc-back-top.cc-back-top--visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .cc-back-top:hover {
                background: #E8A51A;
                color: #3F3A22;
                box-shadow: 0 12px 28px rgba(180, 123, 14, .3);
                transform: translateY(-4px);
            }

            .cc-back-top:focus-visible {
                outline: 3px solid #E8A51A;
                outline-offset: 4px;
            }

            @media (max-width: 600px) {
                .cc-back-top {
                    right: 15px;
                    bottom: 82px;
                    width: 45px;
                    height: 45px;
                    border-radius: 15px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .communication-page .cc-js-reveal {
                    opacity: 1 !important;
                    transform: none !important;
                    transition: none !important;
                }

                .cc-back-top,
                .cc-back-top:hover {
                    transition: none !important;
                }

                .cc-reading-progress__bar {
                    will-change: auto;
                }
            }
        `;

        document.head.appendChild(estilos);

        /* =====================================================
           2. ANIMACIÓN DE TARJETAS Y CONTENIDO
           ===================================================== */

        const selectores = [
            ".cc-section .intro-panel",
            ".cc-section .data-card",
            ".cc-section .info-panel",
            ".cc-section .foda-card",
            ".cc-section .audience-hub",
            ".cc-section .audience-branches article",
            ".cc-section .objective-main",
            ".cc-section .objective-list article",
            ".cc-section .message-card",
            ".cc-section .table-wrap",
            ".cc-section .budget-grid article",
            ".cc-section .budget-total",
            ".cc-section .process-flow article",
            ".cc-section .feedback-band",
            ".cc-section .phase-list article",
            ".cc-section .quarterly-box",
            ".cc-section .imagotype-guideline",
            ".communication-closing"
        ];

        const elementos = new Set();

        selectores.forEach((selector) => {
            pagina.querySelectorAll(selector).forEach((elemento) => {
                elementos.add(elemento);
            });
        });

        if (movimientoReducido) {
            elementos.forEach((elemento) => {
                elemento.classList.add("cc-js-visible");
            });
        } else {
            elementos.forEach((elemento) => {
                elemento.classList.add("cc-js-reveal");
            });

            // Distribuye ligeramente la aparición de las tarjetas.
            [
                ".data-card",
                ".foda-card",
                ".audience-branches article",
                ".objective-list article",
                ".message-card",
                ".budget-grid article",
                ".process-flow article",
                ".phase-list article"
            ].forEach((selector) => {
                pagina.querySelectorAll(selector).forEach((elemento, indice) => {
                    elemento.style.setProperty(
                        "--cc-delay",
                        `${(indice % 4) * 75}ms`
                    );
                });
            });

            if ("IntersectionObserver" in window) {
                const observador = new IntersectionObserver(
                    (entradas, observer) => {
                        entradas.forEach((entrada) => {
                            if (entrada.isIntersecting) {
                                entrada.target.classList.add("cc-js-visible");
                                observer.unobserve(entrada.target);

                                // Limpia el retraso una vez visible.
                                entrada.target.addEventListener(
                                    "transitionend",
                                    (evento) => {
                                        if (evento.propertyName === "opacity") {
                                            entrada.target.style.removeProperty(
                                                "--cc-delay"
                                            );
                                        }
                                    },
                                    { once: true }
                                );
                            }
                        });
                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -35px 0px"
                    }
                );

                elementos.forEach((elemento) => observador.observe(elemento));
            } else {
                // Compatibilidad con navegadores sin IntersectionObserver.
                elementos.forEach((elemento) => {
                    elemento.classList.add("cc-js-visible");
                });
            }
        }

        /* =====================================================
           3. BARRA DE PROGRESO DE LECTURA
           ===================================================== */

        const progreso = document.createElement("div");
        progreso.className = "cc-reading-progress";
        progreso.setAttribute("aria-hidden", "true");

        const barraProgreso = document.createElement("div");
        barraProgreso.className = "cc-reading-progress__bar";

        progreso.appendChild(barraProgreso);
        document.body.appendChild(progreso);

        let desplazamientoPendiente = false;

        function actualizarProgreso() {
            const documento = document.documentElement;

            const alturaTotal =
                documento.scrollHeight - window.innerHeight;

            const avance = alturaTotal > 0
                ? window.scrollY / alturaTotal
                : 0;

            barraProgreso.style.transform =
                `scaleX(${Math.min(1, Math.max(0, avance))})`;
        }

        function programarActualizacion() {
            if (desplazamientoPendiente) return;

            desplazamientoPendiente = true;

            window.requestAnimationFrame(() => {
                actualizarProgreso();
                actualizarBotonArriba();
                desplazamientoPendiente = false;
            });
        }

        /* =====================================================
           4. BOTÓN FLOTANTE "VOLVER ARRIBA"
           ===================================================== */

        const botonArriba = document.createElement("button");

        botonArriba.type = "button";
        botonArriba.className = "cc-back-top";
        botonArriba.setAttribute("aria-label", "Volver al inicio de la página");
        botonArriba.setAttribute("title", "Volver arriba");
        botonArriba.innerHTML = "↑";

        document.body.appendChild(botonArriba);

        function actualizarBotonArriba() {
            botonArriba.classList.toggle(
                "cc-back-top--visible",
                window.scrollY > 450
            );
        }

        botonArriba.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: movimientoReducido ? "auto" : "smooth"
            });
        });

        /* =====================================================
           5. DESPLAZAMIENTO Y ACTUALIZACIONES
           ===================================================== */

        window.addEventListener(
            "scroll",
            programarActualizacion,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            programarActualizacion,
            { passive: true }
        );

        actualizarProgreso();
        actualizarBotonArriba();

        /* =====================================================
           6. EFECTO SUTIL EN LOS BOTONES PRINCIPALES
           ===================================================== */

        pagina.querySelectorAll(".communication-cta").forEach((enlace) => {
            enlace.addEventListener("mouseenter", () => {
                enlace.style.setProperty("--cc-cta-hover", "1");
            });

            enlace.addEventListener("mouseleave", () => {
                enlace.style.removeProperty("--cc-cta-hover");
            });
        });

        console.info("SAMILU: efectos de Comunicación Corporativa activados.");
    }
})();
