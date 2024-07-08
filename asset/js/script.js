const inputTarea = document.querySelector("#nuevo");
const buttonAgregar = document.querySelector("#agregar");
const listaTareas = document.querySelector("#lista");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#Realizadas");

/*arreglo, se dejan 2 id y tarea de base muestra*/
const tareas = [
    {id: creadorId(),
    nombre: "Implementar FTP",
    confirmado: false,
  },
  {
    id: creadorId(),
    nombre: "Enviar Desafio",
    confirmado: false,
  },
];

/* creador de ID */
function creadorId(min, max) {
  min = Math.ceil(1);
  max = Math.floor(100);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*crea tarea*/
buttonAgregar.addEventListener("click", () => {
  const nuevaTarea = {
    id: creadorId(),
    nombre: inputTarea.value,
    confirmado: false,
  };
  tareas.push(nuevaTarea);
  inputTarea.value = "";
  renderizarTareas();
});

const renderizarTareas = function () {
  let html = "";

  for (const tarea of tareas) {
    if (tarea.confirmado) {
      chequeado = "checked";
    } else {
      chequeado = "";
    }

    html += `
    <tr>
    <td >${
      tarea.confirmado
        ? "<span style='black'> <del>" + tarea.id + "</del></span>"
        : "<span style='color:black'> " + tarea.id + "</span>"
    } </td>

    <td >
        ${
          tarea.confirmado
            ? "<span style='color:black'> <del>" + tarea.nombre + "</del></span>"
            : "<span style='color:black'>" + tarea.nombre + "</span>"
        } </td>
    <td><input onclick="actualizar(${
      tarea.id
    })" type="checkbox" ${chequeado}  ></td>
    <td><button class="buttonEliminar" onclick="borrar (${
      tarea.id
    })"><strong>X</strong> </button></td>
  </tr> `;
  }

  listaTareas.innerHTML = `  <tr>
 <td> <strong>ID</strong></td>
  <td><strong>Tarea</strong></td>
</tr> ${html}`;

  finales();
};

/*borrar tarea y id*/
const borrar = (id) => {
  const index = tareas.findIndex((e) => e.id === id);
  tareas.splice(index, 1);
  renderizarTareas();
};

/*revisa tarea*/
const actualizar = function (id) {
  const index = tareas.findIndex((e) => e.id === id);
  tareas[index].confirmado = !tareas[index].confirmado;
  renderizarTareas();
};

const finales = () => {
  total.innerHTML = tareas.length;
  realizadas.innerHTML = tareas.filter((e) => e.confirmado === true).length;
  
};

renderizarTareas();