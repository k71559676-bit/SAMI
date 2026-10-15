/* =====================================================
   SAMILU — JAVASCRIPT
   Página: EMPRESA
   ===================================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MENÚ ACTIVO
    ===================================================== */

    const currentPage =
        document.body.dataset.page || "inicio";

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(item => {

        const itemPage =
            item.dataset.page;

        if (itemPage === currentPage) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });



    /* =====================================================
       MENÚS DESPLEGABLES
       Compatible con .nav-button y con enlaces directos
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".dropdown-item");


    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(".nav-button");


        /* -------------------------------------------------
           Si existe .nav-button, mantiene el comportamiento
           de apertura mediante clic.
        ------------------------------------------------- */

        if (button) {

            button.addEventListener("click", event => {

                event.preventDefault();

                event.stopPropagation();


                dropdowns.forEach(other => {

                    if (other !== dropdown) {

                        other.classList.remove("open");

                    }

                });


                dropdown.classList.toggle("open");

            });

        }

    });


    document.addEventListener("click", () => {

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("open");

        });

    });


    document
        .querySelectorAll(".dropdown-menu")
        .forEach(menu => {

            menu.addEventListener("click", event => {

                event.stopPropagation();

            });

        });



    /* =====================================================
       DATOS DE LA EMPRESA
    ===================================================== */


    const companyCards =
        document.querySelectorAll(".company-card");


    const companyNumber =
        document.getElementById("company-number");


    const companyLabel =
        document.getElementById("company-label");


    const companyTitle =
        document.getElementById("company-title");


    const companyDescription =
        document.getElementById("company-description");


    const companyImage =
        document.getElementById("company-image");


    const companyImageText =
        document.getElementById("company-image-text");



    /* =====================================================
       INFORMACIÓN DE EMPRESA
    ===================================================== */

    const companyData = {


        /* -------------------------------------------------
           EMPRESA
        ------------------------------------------------- */

        empresa: {

            number: "01",

            label: "EMPRESA",

            title:
                "Sabor Amazónico, Miel y Luz S.A.C.",

            description:
                "Sabor Amazónico, Miel y Luz es una empresa agroindustrial dedicada a la preparación y venta de derivados de la miel.",

            image:
                "img/empresa.png",

            imageText:
                "Representación de la empresa"

        },


        /* -------------------------------------------------
           MARCA
        ------------------------------------------------- */

        marca: {

            number: "02",

            label: "MARCA",

            title:
                "SAMILU",

            description:
                "SAMILU es la marca de la empresa y representa su propuesta de productos derivados de la miel, vinculada con la naturaleza y el origen de la Selva Central.",

            image:
                "img/logo-samilu.png",

            imageText:
                "Marca SAMILU"

        },


        /* -------------------------------------------------
           ACTIVIDAD
        ------------------------------------------------- */

        actividad: {

            number: "03",

            label: "ACTIVIDAD",

            title:
                "Elaboración y venta",

            description:
                "La empresa se dedica a la elaboración y venta de productos derivados de la miel.",

            image:
                "img/productos.jpg",

            imageText:
                "Actividad agroindustrial"

        },


        /* -------------------------------------------------
           UBICACIÓN
        ------------------------------------------------- */

        ubicacion: {

            number: "04",

            label: "UBICACIÓN",

            title:
                "Selva Central, Junín",

            description:
                "La empresa se encuentra vinculada con la Selva Central de Junín, origen que forma parte importante de la identidad de SAMILU.",

            image:
                "img/selva-central.jpg",

            imageText:
                "Selva Central"

        },


        /* -------------------------------------------------
           PRODUCTOS
        ------------------------------------------------- */

        productos: {

            number: "05",

            label: "PRODUCTOS",

            title:
                "Derivados de la miel",

            description:
                "SAMILU ofrece crema untable, barras energéticas y miel saborizada, elaboradas a partir de miel y otros ingredientes seleccionados.",

            image:
                "img/productos.jpg",

            imageText:
                "Productos SAMILU"

        }

    };



    /* =====================================================
       FUNCIÓN GENERAL PARA CARGAR UNA IMAGEN
    ===================================================== */

    function cargarImagen(imgElement, imagePath, altText) {

        if (!imgElement || !imagePath) {
            return;
        }


        const nuevaImagen =
            new Image();


        imgElement.style.opacity = "0";


        nuevaImagen.onload = () => {

            imgElement.src =
                imagePath;

            imgElement.alt =
                altText || "Imagen SAMILU";

            imgElement.style.display =
                "block";


            setTimeout(() => {

                imgElement.style.opacity =
                    "1";

            }, 40);

        };


        nuevaImagen.onerror = () => {

            console.error(
                "No se encontró la imagen:",
                imagePath
            );

            imgElement.style.display =
                "none";

            imgElement.style.opacity =
                "1";

        };


        nuevaImagen.src =
            imagePath;

    }



    /* =====================================================
       FUNCIÓN PARA CAMBIAR IMAGEN DE EMPRESA
    ===================================================== */

    function cambiarImagenEmpresa(card, data) {

        if (!companyImage || !data) {
            return;
        }


        /*
           Primero utiliza data-image del botón.

           Esto permite cambiar solamente el nombre
           de la imagen desde el HTML.

           Ejemplo:

           data-image="img/empresa.png"
        */

        const imagenDelHTML =
            card.dataset.image;


        const imagenFinal =
            imagenDelHTML || data.image;


        const altFinal =
            card.dataset.alt ||
            data.imageText ||
            data.title;


        cargarImagen(
            companyImage,
            imagenFinal,
            altFinal
        );

    }



    /* =====================================================
       CLICK EN LAS TARJETAS DE EMPRESA
    ===================================================== */

    companyCards.forEach(card => {

        card.addEventListener("click", () => {


            const key =
                card.dataset.company;


            const data =
                companyData[key];


            if (!data) {
                return;
            }



            /* ---------------------------------------------
               TARJETA ACTIVA
            --------------------------------------------- */

            companyCards.forEach(item => {

                item.classList.remove("active");

            });


            card.classList.add("active");



            /* ---------------------------------------------
               INFORMACIÓN
            --------------------------------------------- */

            if (companyNumber) {

                companyNumber.textContent =
                    data.number;

            }


            if (companyLabel) {

                companyLabel.textContent =
                    data.label;

            }


            if (companyTitle) {

                companyTitle.textContent =
                    data.title;

            }


            if (companyDescription) {

                companyDescription.textContent =
                    data.description;

            }


            if (companyImageText) {

                companyImageText.textContent =
                    data.imageText;

            }



            /* ---------------------------------------------
               IMAGEN
            --------------------------------------------- */

            cambiarImagenEmpresa(
                card,
                data
            );

        });

    });



    /* =====================================================
       CARGAR TARJETA DE EMPRESA INICIAL
    ===================================================== */

    const initialCompany =
        document.querySelector(
            ".company-card.active"
        );


    if (
        initialCompany &&
        initialCompany.dataset.company
    ) {

        const initialKey =
            initialCompany.dataset.company;


        const initialData =
            companyData[initialKey];


        if (initialData) {


            if (companyNumber) {

                companyNumber.textContent =
                    initialData.number;

            }


            if (companyLabel) {

                companyLabel.textContent =
                    initialData.label;

            }


            if (companyTitle) {

                companyTitle.textContent =
                    initialData.title;

            }


            if (companyDescription) {

                companyDescription.textContent =
                    initialData.description;

            }


            if (companyImageText) {

                companyImageText.textContent =
                    initialData.imageText;

            }


            cambiarImagenEmpresa(
                initialCompany,
                initialData
            );

        }

    }



    /* =====================================================
       VALORES CORPORATIVOS
    ===================================================== */


    const valueButtons =
        document.querySelectorAll(".value-button");


    const valueNumber =
        document.getElementById("value-number");


    const valueTitle =
        document.getElementById("value-title");


    const valueDescription =
        document.getElementById("value-description");


    const valueImage =
        document.getElementById("value-image");


    const valueImageLabel =
        document.getElementById(
            "value-image-label"
        );



    const valuesData = {


        calidad: {

            number: "01",

            title:
                "Calidad",

            description:
                "Ofrecer productos de calidad y buena presentación."

        },


        responsabilidad: {

            number: "02",

            title:
                "Responsabilidad",

            description:
                "Cumplir con nuestros clientes y utilizar responsablemente los recursos."

        },


        respeto: {

            number: "03",

            title:
                "Respeto",

            description:
                "Tratar de manera cordial a clientes y trabajadores."

        },


        compromiso: {

            number: "04",

            title:
                "Compromiso",

            description:
                "Buscar mejorar continuamente el servicio."

        }

    };



    /* =====================================================
       CLICK EN VALORES
    ===================================================== */

    valueButtons.forEach(button => {

        button.addEventListener("click", () => {


            const key =
                button.dataset.value;


            const data =
                valuesData[key];


            if (!data) {
                return;
            }



            /* ---------------------------------------------
               BOTÓN ACTIVO
            --------------------------------------------- */

            valueButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );



            /* ---------------------------------------------
               TEXTO
            --------------------------------------------- */

            if (valueNumber) {

                valueNumber.textContent =
                    data.number;

            }


            if (valueTitle) {

                valueTitle.textContent =
                    data.title;

            }


            if (valueDescription) {

                valueDescription.textContent =
                    data.description;

            }


            if (valueImageLabel) {

                valueImageLabel.textContent =
                    data.title.toUpperCase();

            }



            /* ---------------------------------------------
               IMAGEN

               IMPORTANTE:

               Primero toma data-image del HTML.

               Si no existe, busca data.image.
            --------------------------------------------- */

            if (valueImage) {

                const imagenDelHTML =
                    button.dataset.image;


                const imagenFinal =
                    imagenDelHTML || null;


                const altFinal =
                    button.dataset.alt ||
                    data.title;


                if (imagenFinal) {

                    cargarImagen(
                        valueImage,
                        imagenFinal,
                        altFinal
                    );

                }

            }

        });

    });



    /* =====================================================
       PERSONALIDAD
    ===================================================== */


    const personalityCards =
        document.querySelectorAll(
            ".personality-card"
        );


    const personalityImage =
        document.getElementById(
            "personality-image"
        );


    const personalityImageLabel =
        document.getElementById(
            "personality-image-label"
        );


    const personalityNumber =
        document.getElementById(
            "personality-number"
        );


    const personalityTitle =
        document.getElementById(
            "personality-title"
        );


    const personalityDescription =
        document.getElementById(
            "personality-description"
        );



    const personalityData = {


        moderna: {

            number: "01",

            title:
                "Moderna",

            description:
                "Instalaciones y equipos modernos de última generación, con espacios amplios, limpios y un diseño actual.",

            image:
                "img/moderna.png"

        },


        responsable: {

            number: "02",

            title:
                "Responsable",

            description:
                "Uso responsable de los recursos, cuidado de los trabajadores y compromiso con los clientes.",

            image:
                "img/responsable.png"

        },


        sostenible: {

            number: "03",

            title:
                "Sostenible",

            description:
                "Uso de materiales reciclables, reducción de residuos y aprovechamiento responsable de los recursos naturales.",

            image:
                "img/sostenible.png"

        },


        innovadora: {

            number: "04",

            title:
                "Innovadora",

            description:
                "Desarrollo de nuevos productos derivados de la miel, sabores diferentes y empaques creativos.",

            image:
                "img/innovadora.png"

        }

    };



    /* =====================================================
       CLICK EN PERSONALIDAD
    ===================================================== */

    personalityCards.forEach(card => {

        card.addEventListener("click", () => {


            const key =
                card.dataset.personality;


            const data =
                personalityData[key];


            if (!data) {
                return;
            }



            /* ---------------------------------------------
               TARJETA ACTIVA
            --------------------------------------------- */

            personalityCards.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            card.classList.add(
                "active"
            );



            /* ---------------------------------------------
               INFORMACIÓN
            --------------------------------------------- */

            if (personalityNumber) {

                personalityNumber.textContent =
                    data.number;

            }


            if (personalityTitle) {

                personalityTitle.textContent =
                    data.title;

            }


            if (personalityDescription) {

                personalityDescription.textContent =
                    data.description;

            }


            if (personalityImageLabel) {

                personalityImageLabel.textContent =
                    data.title.toUpperCase();

            }



            /* ---------------------------------------------
               IMAGEN

               Primero revisa si el botón tiene
               data-image.

               Si no tiene, utiliza la imagen
               definida en personalityData.
            --------------------------------------------- */

            if (personalityImage) {

                const imagenDelHTML =
                    card.dataset.image;


                const imagenFinal =
                    imagenDelHTML ||
                    data.image;


                const altFinal =
                    card.dataset.alt ||
                    data.title;


                cargarImagen(
                    personalityImage,
                    imagenFinal,
                    altFinal
                );

            }

        });

    });



    /* =====================================================
       CARGAR PERSONALIDAD INICIAL
    ===================================================== */

    const initialPersonality =
        document.querySelector(
            ".personality-card.active"
        );


    if (
        initialPersonality &&
        initialPersonality.dataset.personality
    ) {

        const initialPersonalityKey =
            initialPersonality.dataset.personality;


        const initialPersonalityData =
            personalityData[
                initialPersonalityKey
            ];


        if (initialPersonalityData) {


            if (personalityNumber) {

                personalityNumber.textContent =
                    initialPersonalityData.number;

            }


            if (personalityTitle) {

                personalityTitle.textContent =
                    initialPersonalityData.title;

            }


            if (personalityDescription) {

                personalityDescription.textContent =
                    initialPersonalityData.description;

            }


            if (personalityImageLabel) {

                personalityImageLabel.textContent =
                    initialPersonalityData.title.toUpperCase();

            }


            if (personalityImage) {

                const imagenDelHTML =
                    initialPersonality.dataset.image;


                const imagenFinal =
                    imagenDelHTML ||
                    initialPersonalityData.image;


                cargarImagen(
                    personalityImage,
                    imagenFinal,
                    initialPersonalityData.title
                );

            }

        }

    }



    /* =====================================================
       ANIMACIÓN AL HACER SCROLL
    ===================================================== */


    const animatedElements =
        document.querySelectorAll(
            ".company-detail, " +
            ".purpose-card, " +
            ".value-display, " +
            ".personality-display"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

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
                    threshold: 0.15
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    }



    /* =====================================================
       CARGA
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );



    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "SAMILU — JavaScript de Empresa cargado correctamente."
    );

});