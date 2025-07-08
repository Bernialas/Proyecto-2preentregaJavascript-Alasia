document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".botonAgregar").forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.dataset.nombre;
            const precio = parseInt(boton.dataset.precio);
            const id = boton.dataset.id;

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            
            const productoExistente = carrito.find(producto => producto.id === id);
            
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            const textoOriginal = boton.textContent;

            boton.textContent = "¡Agregado!";
            boton.disable = true;

            boton.style.backgroundColor = "#28a745";
            boton.style.color = "#fff";
            boton.style.borderColor = "#28a745";
            boton.style.transition = "all 1s ease";

            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.disable = false;

                boton.style.backgroundColor = "";
                boton.style.color = "";
                boton.style.borderColor = "";
            }, 1500);

        })
    })
})

