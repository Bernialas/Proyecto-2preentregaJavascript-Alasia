document.addEventListener("DOMContentLoaded", () => {
    // Definimos el contador del carrito
    const contadorCarrito = document.getElementById("contador-carrito");
    // Definimos el contenedor donde se renderizarán los productos
    const productosContainer = document.getElementById("productos-container");
    // Seleccionamos SOLO los botones con el atributo 'data-categoria'
    const botonesCategoria = document.querySelectorAll(".grid-categorias button[data-categoria]");
    const botonMostrarTodos = document.getElementById("mostrarTodos");
    let productos = [];

    // Función contador del carrito
    const actualizarContador = () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
        contadorCarrito.textContent = totalItems;
    };

    // Función para renderizar los productos en el HTML
    const renderizarProductos = (productosParaMostrar) => {
        productosContainer.innerHTML = '';
        if (productosParaMostrar.length === 0) {
            productosContainer.innerHTML = '<p>No hay productos en esta categoría.</p>';
            return;
        }
        productosParaMostrar.forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.classList.add('producto-card');
            productoCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button 
                    class="botonAgregar" 
                    data-id="${producto.id}" 
                    data-nombre="${producto.nombre}" 
                    data-precio="${producto.precio}">
                    Agregar al Carrito
                </button>
            `;
            productosContainer.appendChild(productoCard);
        });

        agregarEventListenersBotones();
    };

    // Función lógica a los botones "Agregar al Carrito"
    const agregarEventListenersBotones = () => {
        document.querySelectorAll(".botonAgregar").forEach(boton => {
            boton.addEventListener("click", () => {
                const nombre = boton.dataset.nombre;
                const precio = parseInt(boton.dataset.precio);
                const id = boton.dataset.id;

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

                const productoExistente = carrito.find(p => p.id === id);

                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({ id, nombre, precio, cantidad: 1 });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                
                actualizarContador();

                Swal.fire({
                    title: '¡Producto agregado!',
                    text: `${nombre} fue añadido al carrito.`,
                    icon: 'success',
                    timer: 950,
                    showConfirmButton: false
                });
            });
        });
    };

    // Función para obtener los datos de los productos desde el JSON
    const obtenerProductos = async () => {
        try {
            const res = await fetch('./data/productos.json');
            if (!res.ok) {
                throw new Error('Error al cargar los productos');
            }
            productos = await res.json();
            renderizarProductos(productos); // Muestra todos los productos al inicio
        } catch (error) {
            console.error(error);
            productosContainer.innerHTML = '<p>Error al cargar los productos.</p>';
        }
    };

    // Event listeners para los botones de categoría (filtrado)
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const categoriaSeleccionada = e.target.dataset.categoria;
            const productosFiltrados = productos.filter(p => p.categoria === categoriaSeleccionada);
            renderizarProductos(productosFiltrados);
        });
    });

    botonMostrarTodos.addEventListener("click", () => {
        renderizarProductos(productos);
    });

    actualizarContador();

    obtenerProductos();
});