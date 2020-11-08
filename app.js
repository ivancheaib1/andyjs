document.getElementById('formTask').addEventListener('submit', saveTask); /*desde el documento vamos a seleccionar los elementos por Id entonces se llama el "id formtask"
y el addeventlistener llamamos el evento llamado submit osea se ejecuta la funcion de abajo por separado con una funcion*/

/*aca obtenemos la informacion del formulario por id de la tarjeta que esta en html*/

function saveTask(e) {
  let title = document.getElementById('title').value; /*el .value es el valor que esta dentro de la caja del input de ese id, osea lo que vos le escribas como titulo*/ 
  let description = document.getElementById('description').value;/*y lo mismo pero para description osea la caja de abajo el otro input*/
  console.log(description)/*aca podes ver en la consola de de chrome los valores de las tarjetas con el "console.log"*/


  /*esto es en vez de escribir title: title: o description: description: en versiones anteriores de js ahora se escribe asi*/
  let task = {
    title,
    description
  };


  /*aca en el navegador lee la funcionalidad de guardar los datos localmente con localStorage que permite almacenar los datos en la memoria aunque se 
  cierre el navegador y se abra va a estar ahi*/

  /*para obtener los elementos llamamos con getItem con el nombre del item que queremos obtener por ej "task" y para no obtener en formato String llamamos con el metodo
   JSON.parse y ahi se convierte en objeto js y no string*/

   /*si ya tenemos datos almacenados desde localstorage y es igual a nulo o null entonces vamos a empezar a crear tareas y si 
   ya hay valores entonces vamos actualizar los datos */

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); /*aca volvemos a actualizar y almacenar nuevamente las tareas o los datos*/
  }


 /*aca se vuelve a ejecutar el metodo getTaskseste entonces cada vez que se guarde una tarea se vuelve a ejectura la tarea y se muestra lo que 
 escribis en el formulario y se muestra al lado en tarjetas sin necesidad de refrescar la pagina */
  getTasks(); 
  document.getElementById('formTask').reset(); /*aca se termina de procesar los datos y se limpia el formulario para agregar nuevos datos */
  e.preventDefault();
}

/*esta funcion se encarga de obtener un titulo buscar y eliminar, todos los botones deben llevar con "onclick="deleteTask"
 el valor ('${title} le damos el valor de la variable title*/
function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));/*aca vamos a buscar si coincide el titulo que queremos eliminar con alguna tarea que esta almacenada en localstorage y si coindide entonces eliminamos*/
 
  /*aca empezamos a recorrer la variable i que empieza en 0 entonces i
  es menor que la longitud de las tareas vamos  empezar a incrementar 
  1 a 1 con i++*/ 
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  /*aca obtuvimos los datos, quitamos los datos y volvemos almacenar para mostrar en la interfaz, lo unico que hace es volver a almacenar el item en las tareas*/
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

 /*aca mostramos los datos en pantalla o las tareas que estan en localstorage*/
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';  
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title; /*aca obtenemos una variable individual*/
    let description = tasks[i].description; /*aca tambien cada vez que se recorre*/


    /*aca mostramos por interfaz llamando el div del html y la clase en otra tarjeta al lado, el += es para agregar cada tarea cuando se recorra el elemento tasksview, el 
    mb-3 es margen botom para darle espaciado a las tarjetas*/
    tasksView.innerHTML += `<div class="card mb-3"> 
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
