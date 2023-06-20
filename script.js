let cotiza = [] 
let seleccionMenu = 0 

let serviciosPosibles = [
  { id: 1, cant: 0, nombre:  `Visita a domicilio `, precio: 3000 },
  { id: 2, cant: 0, nombre:  `Adicional por distancia `, precio: 1500 },
  { id: 3, cant: 0, nombre:  `Configuración modem / router / mikrotik / unifi) `, precio: 3500 },
  { id: 4, cant: 0, nombre:  `Cableado estructurado con materiales x 20mts `, precio: 3000 },
  { id: 5, cant: 0, nombre:  `Cableado estructurado sin materiales x 20mts `, precio: 3000 },
  { id: 6, cant: 0, nombre:  `Trabajos sobre CCTV / Controles de acceso `, precio: 4000 },
  { id: 7, cant: 0, nombre:  `Instalación sistemas operativos w10 / OSX `, precio: 8000 },
  { id: 8, cant: 0, nombre:  `Instalación puesto de trabajo `, precio: 3000 },
  { id: 9, cant: 0, nombre:  `Acceso remoto simple `, precio: 200 },
  { id: 10, cant: 0, nombre:  `Acceso remoto complejo `, precio: 3500 },
  { id: 11, cant: 0, nombre:  `Relevamientos eléctricos, de red, de CCTV `, precio: 2500 },
  { id: 12, cant: 0, nombre:  `Cambios en página web, dominios, hosting, integraciones de pago `, precio: 3000 }
] 

do {
  seleccionMenu = parseInt(prompt( `Bienvenido al cotizador de servicios, ingrese operación:\n------------------------------\n1. Ver servicios posibles y su valor actual.\n2. Agregar un nuevo tipo de servicio. \n3. AGREGAR unidades de servicio a la cotiza. \n4. LISTAR unidades de los servicios agregados.\n5. QUITAR unidades de servicio de cotiza. \n6. SUBTOTAL $$$$  \n7. Salir de cotizador `)) 

  if (seleccionMenu === 1) {
    mostrarServicios() 
  } else if (seleccionMenu === 2) {
    nuevoServicio()  
  } else if (seleccionMenu === 3) {
    agregarServicios() 
} else if (seleccionMenu === 4) {
    mostrarServiciosAgregados()
  } else if (seleccionMenu === 5) {
    quitarServicios()
  } else if (seleccionMenu === 6) {
    subtotalCotiza ()
  } else if (seleccionMenu === 7) {
  break 
  } else {
    alert( `Opción inválida. Por favor, seleccione una opción válida. `) 
  }

  function mostrarServicios() {
    let listaServicios = `Estos son los servicios disponibles y sus valores actuales:\n` 
    serviciosPosibles.forEach((servicio) => {
      listaServicios += `${servicio.id} - ${servicio.nombre} - $${servicio.precio}\n` 
    }) 
    alert(listaServicios) 
  }

  function agregarServicios() {
    let servicioBuscado = parseInt(prompt(`Ingrese el ID del servicio que desea AGREGAR a la cotización:`)) 
    let servicioAgregado = serviciosPosibles.find((servicio) => servicio.id === servicioBuscado) 
    if (servicioAgregado) {
      let servicioExistente = cotiza.find((servicio) => servicio.id === servicioBuscado) 
      if (servicioExistente) {
        servicioExistente.cant += 1 
      } else {
        let servicioNuevo = servicioAgregado
        servicioNuevo.cant = 1 
        cotiza.push(servicioNuevo) 
      }
      alert(`Se agregó una unidad del servicio ${servicioAgregado.nombre} a la cotización.`) 
      console.log(cotiza) 
    } else {
      alert(`No hay servicios con ese ID.`) 
    }
  }

  function quitarServicios() {
    let servicioBuscado = parseInt(prompt(`Ingrese el ID del servicio que desea QUITAR de la cotización:`));
    let servicioQuitado = cotiza.findIndex((servicio) => servicio.id === servicioBuscado);
    
    if (servicioQuitado !== -1) {
      cotiza[servicioQuitado].cant = cotiza[servicioQuitado].cant - 1;
      hayNoHay(servicioQuitado);
  
      if (cotiza[servicioQuitado].cant === 0) {
        cotiza.splice(servicioQuitado, 1);
      }
    } else {
      alert(`No hay servicios con ese ID.`);
    }
  
    function hayNoHay(servicio) {
      if (cotiza[servicio].cant === 0) {
        alert(`Se quitó una unidad del servicio ${cotiza[servicio].nombre} de la cotización.\nNo quedan unidades de ese servicio.`);
      } else {
        alert(`Se quitó una unidad del servicio ${cotiza[servicio].nombre} de la cotización.\nAhora quedan ${cotiza[servicio].cant} unidades de ese servicio.`);
      }
    }
  }

  function mostrarServiciosAgregados() {
    let listaServiciosAgregados = `Cotiza\n(CANT) ID - CONCEPTO  \n`
    cotiza.forEach((coti) => {
      listaServiciosAgregados +=`(${coti.cant}) - ${coti.id} - ${coti.nombre}\n` 
    }) 
    alert(listaServiciosAgregados) 
  }
  function subtotalCotiza() {
    let subtotal = 0 
    cotiza.forEach((coti) => {
    subtotal += coti.precio * coti.cant
    })
    alert(`El subtotal hasta acá es: $`+subtotal) 
  }


  function nuevoServicio() {
    let ultimoIDutilizado = obtenerUltimoID()
    let nuevoNombre = prompt(`Ingrese nombre del nuevo servicio`)
    let nuevoPrecio = parseFloat(prompt(`ingrese el precio del servicio nuevo`))

     let nuevoServicio = {
      id: ultimoIDutilizado + 1,
      cant: 0,
      nombre: nuevoNombre,
      precio: nuevoPrecio,
     }
     serviciosPosibles.push(nuevoServicio)

     alert(`El servicio ${nuevoNombre} se agregó a los servicios posibles con el ID: ${nuevoServicio.id} y el valor $${nuevoPrecio}`)
  }

function obtenerUltimoID() {
  let ultimoID = 0
  for (let i = 0; i < serviciosPosibles.length;i++) {
    if (serviciosPosibles[i].id > ultimoID) {
      ultimoID = serviciosPosibles[i].id
    }
  }
  return ultimoID 
}

} while (true);
