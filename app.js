
// =====================================
// VELVET SMOKE - FUNCIONES PRINCIPALES
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Velvet Smoke App initialized successfully.");

    // Elementos del formulario
    const contactForm = document.getElementById("contactForm");
    const contactSection = document.getElementById("contacto");

    // Crear mensaje de respuesta
    const feedback = document.createElement("p");
    feedback.id = "formFeedback";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");

    contactForm.appendChild(feedback);

    // =====================================
    // REGISTRO VISUAL DE CONSULTAS
    // =====================================

    const activitySection = document.createElement("section");
    activitySection.className = "activity-section";

    activitySection.innerHTML = `
        <div class="section-heading">
            <p class="subtitle">PANEL DE DEMOSTRACIÓN</p>
            <h2>REGISTRO DE ACTIVIDAD</h2>
        </div>

        <div class="table-container">
            <table class="activity-table">
                <thead>
                    <tr>
                        <th>Tipo de consulta</th>
                        <th>Elemento</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="activityTable">
                </tbody>
            </table>
        </div>
    `;

    contactSection.appendChild(activitySection);

    const activityTable = document.getElementById("activityTable");

    // =====================================
    // FUNCIÓN PARA REGISTRAR ACTIVIDADES
    // =====================================

    function registerActivity(type, element, status) {

        const row = document.createElement("tr");

        [type, element, status].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        activityTable.prepend(row);
    }

    // =====================================
    // VALIDACIÓN DEL FORMULARIO
    // =====================================

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            feedback.textContent = "Por favor, completa todos los campos.";
            return;
        }

        feedback.textContent =
            "¡Gracias! Tu consulta fue registrada correctamente.";

        registerActivity(
            "Contacto",
            "Nueva consulta",
            "Registrada"
        );

        contactForm.reset();

    });

    // =====================================
    // BOTONES DE CONSULTA DE PRODUCTOS
    // =====================================

    const productButtons = document.querySelectorAll(".product-button");

    productButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;

            registerActivity(
                "Producto",
                productName,
                "Consulta registrada"
            );

            button.textContent = "Consulta registrada";

            setTimeout(() => {
                button.textContent = "Consultar producto";
            }, 2000);

        });

    });

});
