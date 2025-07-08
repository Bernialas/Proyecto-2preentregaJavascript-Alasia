document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("totalCarrito");
    const cantidadProductoElemento = document.getElementById("cantidadCarrito"); 
    const btnVaciar = document.getElementById("vaciarCarrito");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        lista.innerHTML = "<li>No hay productos en el carrito.</li>";
        cantidadProductoElemento.textContent = "Cantidad de productos: 0";
        totalElemento.textContent = "Total de la compra: $0";
        btnVaciar.style.display = "none"; 
        return;
    }

    let totalCompra = 0; 
    let totalItemsEnCarrito = 0; 

    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        
        const subtotalProducto = producto.precio * producto.cantidad;

        item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${subtotalProducto}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("boton-eliminar");
        btnEliminar.dataset.id = producto.id;

        btnEliminar.addEventListener("click", (event) => {
            const idAEliminar = event.target.dataset.id;
            const indiceProducto = carrito.findIndex(p => p.id === idAEliminar);

            if (indiceProducto !== -1) { 
                if (carrito[indiceProducto].cantidad > 1) {
                    carrito[indiceProducto].cantidad--;
                } else {
                    carrito.splice(indiceProducto, 1);
                }
                
                localStorage.setItem("carrito", JSON.stringify(carrito));
                
                location.reload();
            }
        });

        item.appendChild(btnEliminar);
        lista.appendChild(item);

        totalCompra += producto.precio * producto.cantidad;
        
        totalItemsEnCarrito += producto.cantidad;
    });

    cantidadProductoElemento.textContent = `Cantidad de productos en el carrito: ${totalItemsEnCarrito}`;
    totalElemento.textContent = `Total de la compra: $${totalCompra}`;

    btnVaciar.addEventListener("click", () => {
        const respuesta = confirm("¿Estás seguro que deseas vaciar el carrito?");
        if (respuesta) {
            localStorage.removeItem("carrito"); 
            location.reload();
        }
    });
});