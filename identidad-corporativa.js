
/* ==========================================================
   SAMILU — IDENTIDAD CORPORATIVA
   Navegación, tipos de identidad y personalidad interactiva
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       1. MARCAR EL MENÚ ACTIVO
    ====================================================== */

    const currentPage = document.body.dataset.page;

    document.querySelectorAll(".nav-item[data-page]").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.page === currentPage
        );
    });


    /* ======================================================
       2. ANIMACIONES AL HACER SCROLL
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealElements.length) {

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* ======================================================
       3. TIPOS DE IDENTIDAD
       Cada tipo tiene su propia imagen
    ====================================================== */

    const typeButtons = document.querySelectorAll(".type-btn");

    const typeImage = document.getElementById("typeImage");
    const typeNumber = document.getElementById("typeNumber");
    const typeMini = document.getElementById("typeMini");
    const typeTitle = document.getElementById("typeTitle");
    const typeDescription = document.getElementById("typeDescription");
    const typeKeywords = document.getElementById("typeKeywords");

    const typeData = {
        visual: {
            number: "01",
            mini: "IDENTIDAD VISUAL",
            title: "Una identidad que se reconoce",
            description:
                "SAMILU utiliza un imagotipo relacionado con la miel y la naturaleza. Sus elementos gráficos ayudan a relacionar la marca con la actividad apícola y con el origen natural de la empresa.",
            image: "img/VISUAL.png",
            keywords: ["Miel", "Naturaleza", "Marca"]
        },

        cultural: {
            number: "02",
            mini: "IDENTIDAD CULTURAL",
            title: "Una marca conectada con sus raíces",
            description:
                "SAMILU refleja la riqueza natural de la Selva Central mediante elementos que transmiten origen, tradición y conexión con el entorno.",
            image: "img/cult.png",
            keywords: ["Origen", "Selva Central", "Tradición"]
        },

        verbal: {
            number: "03",
            mini: "IDENTIDAD VERBAL",
            title: "Una voz cercana y amigable",
            description:
                "SAMILU utiliza un lenguaje cercano, amigable y sencillo. Su comunicación busca transmitir confianza y calidad, destacando el sabor de la Selva Central.",
            image: "img/VERBAL.png",
            keywords: ["Cercanía", "Confianza", "Sencillez"]
        },

        corporativa: {
            number: "04",
            mini: "IDENTIDAD CORPORATIVA",
            title: "La esencia que organiza la marca",
            description:
                "La identidad corporativa integra el propósito, la visión, los valores y la personalidad de SAMILU para mantener una marca coherente, moderna, responsable, sostenible e innovadora.",
            image: "img/coorpo.png",
            keywords: ["Misión", "Visión", "Valores"]
        }
    };


    function updateType(typeName) {

        const data = typeData[typeName];

        if (!data) return;

        typeButtons.forEach(button => {
            const buttonType =
                button.dataset.type === "corporativo"
                    ? "corporativa"
                    : button.dataset.type;

            const selected = buttonType === typeName;

            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        if (typeNumber) typeNumber.textContent = data.number;
        if (typeMini) typeMini.textContent = data.mini;
        if (typeTitle) typeTitle.textContent = data.title;
        if (typeDescription) typeDescription.textContent = data.description;

        if (typeKeywords) {
            typeKeywords.replaceChildren();

            data.keywords.forEach(word => {
                const tag = document.createElement("span");
                tag.textContent = word;
                typeKeywords.appendChild(tag);
            });
        }

        // Cargar la imagen sin conservar la imagen anterior
        if (typeImage) {
            typeImage.style.opacity = "0";

            const newImage = new Image();

            newImage.onload = () => {
                typeImage.src = data.image;
                typeImage.alt = data.mini;
                typeImage.style.opacity = "1";
            };

            newImage.onerror = () => {
                typeImage.style.opacity = "1";
                console.error(
                    "No se pudo cargar la imagen de " + data.mini + ":",
                    data.image
                );
            };

            newImage.src = data.image;
        }
    }


    typeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const typeName =
                button.dataset.type === "corporativo"
                    ? "corporativa"
                    : button.dataset.type;

            updateType(typeName);
        });
    });

    if (typeButtons.length) {
        const activeType =
            document.querySelector(".type-btn.active") || typeButtons[0];

        const initialType =
            activeType.dataset.type === "corporativo"
                ? "corporativa"
                : activeType.dataset.type;

        updateType(initialType);
    }


    /* ======================================================
       4. PERSONALIDAD DE MARCA
       Moderna, responsable, sostenible e innovadora
       Cada botón usa su propio data-image
    ====================================================== */

    const personalitySection =
        document.getElementById("personalidad-marca");

    if (personalitySection) {

        const personalityButtons =
            personalitySection.querySelectorAll(".personality-option");

        const personalityImage =
            document.getElementById("personalityImage");

        const personalityPlaceholder =
            document.getElementById("personalityImagePlaceholder");

        const personalityPlaceholderTitle =
            document.getElementById("personalityPlaceholderTitle");

        const personalityImagePath =
            document.getElementById("personalityImagePath");

        const personalityNumber =
            document.getElementById("personalityDisplayNumber");

        const personalityKicker =
            document.getElementById("personalityDisplayKicker");

        const personalityTitle =
            document.getElementById("personalityDisplayTitle");

        const personalityDescription =
            document.getElementById("personalityDisplayDescription");


        function updatePersonality(button) {

            if (!button) return;

            personalityButtons.forEach(item => {
                const selected = item === button;

                item.classList.toggle("active", selected);
                item.setAttribute("aria-pressed", String(selected));
            });

            const name = button.dataset.title || "SAMILU";
            const number = button.dataset.number || "";
            const kicker =
                button.dataset.kicker || "PERSONALIDAD DE MARCA";

            const description = button.dataset.description || "";
            const imagePath = button.dataset.image || "";

            const imageAlt =
                button.dataset.alt ||
                ("Personalidad " + name + " de SAMILU");

            if (personalityNumber) {
                personalityNumber.textContent = number;
            }

            if (personalityKicker) {
                personalityKicker.textContent = kicker;
            }

            if (personalityTitle) {
                personalityTitle.textContent = name;
            }

            if (personalityDescription) {
                personalityDescription.textContent = description;
            }

            if (personalityPlaceholderTitle) {
                personalityPlaceholderTitle.textContent =
                    name.toUpperCase();
            }

            if (personalityImagePath) {
                personalityImagePath.textContent =
                    imagePath || "Falta configurar la ruta de la imagen";
            }

            if (!personalityImage) return;

            // Ocultar la imagen anterior mientras carga la nueva
            personalityImage.style.display = "none";

            if (personalityPlaceholder) {
                personalityPlaceholder.style.display = "flex";
            }

            personalityImage.alt = imageAlt;

            if (!imagePath) {
                console.error(
                    "No se ha definido una imagen para:",
                    name
                );
                return;
            }

            const newImage = new Image();

            newImage.onload = () => {
                personalityImage.src = imagePath;
                personalityImage.alt = imageAlt;
                personalityImage.style.display = "block";

                if (personalityPlaceholder) {
                    personalityPlaceholder.style.display = "none";
                }
            };

            newImage.onerror = () => {
                personalityImage.style.display = "none";

                if (personalityPlaceholder) {
                    personalityPlaceholder.style.display = "flex";
                }

                if (personalityImagePath) {
                    personalityImagePath.textContent =
                        "No se encontró: " + imagePath;
                }

                console.error(
                    "No se pudo cargar la imagen de " + name + ":",
                    imagePath
                );
            };

            newImage.src = imagePath;
        }


        personalityButtons.forEach(button => {
            button.addEventListener("click", () => {
                updatePersonality(button);
            });
        });


        // Mostrar la personalidad activa al cargar la página
        if (personalityButtons.length) {
            const initialButton =
                personalitySection.querySelector(
                    ".personality-option.active"
                ) || personalityButtons[0];

            updatePersonality(initialButton);
        }
    }


    /* ======================================================
       5. VISTA AMPLIADA DE LA IMAGEN DEL CHAT VERBAL
       Abre al hacer clic y cierra con X, fondo o Escape
    ====================================================== */

    const verbalImageBox =
        document.getElementById("verbalImageBox");

    const verbalImage =
        document.getElementById("verbalImage");

    if (verbalImageBox && verbalImage) {

        const lightbox = document.createElement("div");

        lightbox.className = "chat-lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute(
            "aria-label",
            "Imagen completa del chat de SAMILU"
        );

        const enlargedImage = document.createElement("img");
        enlargedImage.alt = verbalImage.alt;

        const closeButton = document.createElement("button");
        closeButton.className = "chat-lightbox-close";
        closeButton.type = "button";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Cerrar imagen");

        lightbox.appendChild(enlargedImage);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);


        function openChatImage() {
            if (
                !verbalImage.src ||
                !verbalImage.complete ||
                verbalImage.naturalWidth === 0
            ) {
                return;
            }

            enlargedImage.src = verbalImage.src;
            enlargedImage.alt = verbalImage.alt;

            lightbox.classList.add("is-open");
            document.body.style.overflow = "hidden";

            closeButton.focus();
        }


        function closeChatImage() {
            lightbox.classList.remove("is-open");
            document.body.style.overflow = "";
        }


        verbalImageBox.addEventListener("click", event => {
            if (event.target.closest("button, a")) return;
            openChatImage();
        });

        closeButton.addEventListener("click", closeChatImage);

        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeChatImage();
            }
        });

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                lightbox.classList.contains("is-open")
            ) {
                closeChatImage();
            }
        });
    }


    /* ======================================================
       6. FALLBACK PARA IMÁGENES
    ====================================================== */

    document.querySelectorAll("img[data-fallback]").forEach(image => {
        image.addEventListener("error", () => {
            image.onerror = null;
            image.src = "img/logo samilu.png";
        }, { once: true });
    });


    /* ======================================================
       7. BOTÓN VOLVER ARRIBA
    ====================================================== */

    const backTop = document.getElementById("backTop");

    if (backTop) {

        function updateBackTop() {
            backTop.classList.toggle("show", window.scrollY > 500);
        }

        window.addEventListener("scroll", updateBackTop, {
            passive: true
        });

        updateBackTop();

        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ======================================================
       8. NAVEGACIÓN SUAVE A ANCLAS
    ====================================================== */

    document.querySelectorAll('a[href*="#"]').forEach(link => {

        link.addEventListener("click", event => {

            let url;

            try {
                url = new URL(link.href, window.location.href);
            } catch {
                return;
            }

            if (url.pathname !== window.location.pathname) return;
            if (!url.hash) return;

            const targetId = decodeURIComponent(url.hash.slice(1));
            const target = document.getElementById(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", url.hash);
        });
    });


    /* ======================================================
       9. EFECTO PARALLAX EN EL HERO
    ====================================================== */

    const heroVisual = document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {
        window.addEventListener("mousemove", event => {

            const x = (event.clientX / window.innerWidth) - 0.5;
            const y = (event.clientY / window.innerHeight) - 0.5;

            heroVisual.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;
        });
    }

});
