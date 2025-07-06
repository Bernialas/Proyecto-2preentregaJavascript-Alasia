document.querySelectorAll(".botonAgregar").forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = parseInt(boton.dataset.precio);

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({ nombre, precio });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
    });
});