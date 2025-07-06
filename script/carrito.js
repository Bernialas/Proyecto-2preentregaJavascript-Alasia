document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("totalCarrito");
    const cantidadProducto = document.getElementById("cantidadCarrito");
    const btnVaciar = document.getElementById("vaciarCarrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        lista.innerHTML = "<li>No hay productos en el carrito.</li>";
        cantidadProducto.textContent = "Cantidad de productos: 0";
        totalElemento.textContent = "Total de la compra: $0";
        btnVaciar.style.display = "none";
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("boton-eliminar");

        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            location.reload();
        });

        item.appendChild(btnEliminar);
        lista.appendChild(item);
        total += producto.precio;
    });

    cantidadProducto.textContent = `Cantidad de productos de esta compra: ${carrito.length}`;
    totalElemento.textContent = `Total de la compra: $${total}`;

    btnVaciar.addEventListener("click", () => {
        const respuesta = confirm("¿Estás seguro que deseas vaciar el carrito?");
        if (respuesta) {
            localStorage.removeItem("carrito");
            location.reload();
        }        
    })
});