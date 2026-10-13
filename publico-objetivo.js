document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENÚ ACTIVO
    ===================================================== */

    const currentPage =
        document.body.dataset.page || "";

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        if (item.dataset.page === currentPage) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });


    /* =====================================================
       DROPDOWNS
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".dropdown-item");

    document.addEventListener("click", event => {

        if (!event.target.closest(".dropdown-item")) {

            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("open");
            });

        }

    });


    /* =====================================================
       CARGA Y COMPROBACIÓN DE IMÁGENES
    ===================================================== */

    const imageBoxes =
        document.querySelectorAll(".image-box");

    imageBoxes.forEach(box => {

        const img = box.querySelector("img");

        const placeholder =
            box.querySelector(".image-placeholder");


        /* Si el HTML no tiene imagen, avisa en consola */

        if (!img) {

            console.warn(
                "Falta una etiqueta <img> en este recuadro:",
                box
            );

            return;

        }


        /* Imagen cargada correctamente */

        const mostrarImagen = () => {

            img.style.display = "block";

            if (placeholder) {
                placeholder.style.display = "none";
            }

        };


        /* Imagen no encontrada */

        const mostrarPlaceholder = () => {

            img.style.display = "none";

            if (placeholder) {
                placeholder.style.display = "flex";
            }

            console.error(
                "No se pudo cargar la imagen. Revisa la ruta y el nombre:",
                img.getAttribute("src")
            );

        };


        img.addEventListener("load", mostrarImagen);

        img.addEventListener("error", mostrarPlaceholder);


        /* Comprueba si la imagen ya terminó de cargar */

        if (img.complete) {

            if (img.naturalWidth > 0) {
                mostrarImagen();
            } else {
                mostrarPlaceholder();
            }

        }

    });


    /* =====================================================
       ANIMACIÓN AL ENTRAR A LAS SECCIONES
    ===================================================== */

    const animatedSections =
        document.querySelectorAll(
            ".segment-profile, " +
            ".age-card, " +
            ".need-card, " +
            ".characteristic-card, " +
            ".location-content"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "section-visible"
                            );

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        animatedSections.forEach(element => {

            element.classList.add("section-hidden");

            observer.observe(element);

        });

    } else {

        animatedSections.forEach(element => {
            element.classList.add("section-visible");
        });

    }


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target =
                    document.getElementById(
                        targetId.substring(1)
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       ENTRADA GENERAL
    ===================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add("page-loaded");

    });


    console.log(
        "SAMILU: JavaScript de Público Objetivo cargado."
    );

});