const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');
const form3 = document.querySelector('#form3');
const form4 = document.querySelector('#form4');
const form5 = document.querySelector('#form5');


const icon1 = document.querySelector('#icon1');
const icon2 = document.querySelector('#icon2');
const icon3 = document.querySelector('#icon3');
const icon4 = document.querySelector('#icon4');
const icon5 = document.querySelector('#icon5');


var viewId = 1;
function nextForm() {
  console.log("hellonext");
  viewId = viewId + 1;
  progressBar();
  displayForms();

  console.log(viewId);

}

function prevForm() {
  console.log("helloprev");
  viewId = viewId - 1;
  console.log(viewId);
  progressBar1();
  displayForms();
}
function progressBar1() {
  if (viewId === 1) {
    icon2.classList.add('active');
    icon2.classList.remove('active');
    icon3.classList.remove('active');
    icon4.classList.remove('active');
    icon5.classList.remove('active');
  }
  if (viewId === 2) {
    icon2.classList.add('active');
    icon3.classList.remove('active');
    icon4.classList.remove('active');
    icon5.classList.remove('active');
  }
  if (viewId === 3) {
    icon3.classList.add('active');
    icon4.classList.remove('active');
    icon5.classList.remove('active');
  }
  if (viewId === 4) {
    icon4.classList.add('active');
    icon5.classList.remove('active');
  }
  if (viewId === 5) {
    icon5.classList.add('active');
    nxtBtn.innerHTML = "Submit"
  }
  if (viewId > 5) {
    icon2.classList.remove('active');
    icon3.classList.remove('active');
    icon4.classList.remove('active');
    icon5.classList.remove('active');

  }
}

function progressBar() {
  if (viewId === 2) {
    icon2.classList.add('active');
  }
  if (viewId === 3) {
    icon3.classList.add('active');
  }
  if (viewId === 4) {
    icon4.classList.add('active');
  }
  if (viewId === 5) {
    icon5.classList.add('active');
    nxtBtn.innerHTML = "Submit"
  }
  if (viewId > 5) {
    icon2.classList.remove('active');
    icon3.classList.remove('active');
    icon4.classList.remove('active');
    icon5.classList.remove('active');

  }
}

function displayForms() {

  if (viewId > 5) {
    viewId = 1;
  }

  if (viewId === 1) {
    form1.style.display = 'block';
    form2.style.display = 'none';
    form3.style.display = 'none';
    form4.style.display = 'none';
    form5.style.display = 'none';


  } else if (viewId === 2) {
    form1.style.display = 'none';
    form2.style.display = 'block';
    form3.style.display = 'none';
    form4.style.display = 'none';
    form5.style.display = 'none';

  } else if (viewId === 3) {
    form1.style.display = 'none';
    form2.style.display = 'none';
    form3.style.display = 'block';
    form4.style.display = 'none';
    form5.style.display = 'none';
  } else if (viewId === 4) {
    form1.style.display = 'none';
    form2.style.display = 'none';
    form3.style.display = 'none';
    form4.style.display = 'block';
    form5.style.display = 'none';

  } else if (viewId === 5) {
    form1.style.display = 'none';
    form2.style.display = 'none';
    form3.style.display = 'none';
    form4.style.display = 'none';
    form5.style.display = 'block';

  }
}



function init() {
  const sliders = document.getElementsByClassName("tick-slider-input");
  const sliders2 = document.getElementsByClassName("tick-slider-input-2");

  for (let slider of sliders) {
    slider.oninput = onSliderInput;

    updateValue(slider);
    updateValuePosition(slider);
    updateLabels(slider);
    updateProgress(slider);

    setTicks(slider);
  }

  for (let slider of sliders2) {
    slider.oninput = onSliderInput;

    updateValue(slider);
    updateValuePosition(slider);
    updateLabels(slider);
    updateProgress(slider);

    setTicks(slider);
  }


}

function onSliderInput(event) {
  updateValue(event.target);
  updateValuePosition(event.target);
  updateLabels(event.target);
  updateProgress(event.target);
}

function updateValue(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  value.innerHTML = "<div>" + slider.value + "</div>";
}

function updateValuePosition(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  const percent = getSliderPercent(slider);

  const sliderWidth = slider.getBoundingClientRect().width;
  const valueWidth = value.getBoundingClientRect().width;
  const handleSize = slider.dataset.handleSize;

  let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

  left = Math.min(left, sliderWidth - valueWidth);
  left = slider.value === slider.min ? 0 : left;

  value.style.left = left + "px";
}

function updateLabels(slider) {
  const value = document.getElementById(slider.dataset.valueId);
  const minLabel = document.getElementById(slider.dataset.minLabelId);
  const maxLabel = document.getElementById(slider.dataset.maxLabelId);

  const valueRect = value.getBoundingClientRect();
  const minLabelRect = minLabel.getBoundingClientRect();
  const maxLabelRect = maxLabel.getBoundingClientRect();

  const minLabelDelta = valueRect.left - (minLabelRect.left);
  const maxLabelDelta = maxLabelRect.left - valueRect.left;

  const deltaThreshold = 32;

  if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
  else minLabel.classList.remove("hidden");

  if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
  else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
  let progress = document.getElementById(slider.dataset.progressId);
  const percent = getSliderPercent(slider);

  progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
  const range = slider.max - slider.min;
  const absValue = slider.value - slider.min;

  return absValue / range;
}

function setTicks(slider) {
  let container = document.getElementById(slider.dataset.tickId);
  const spacing = parseFloat(slider.dataset.tickStep);
  const sliderRange = slider.max - slider.min;
  const tickCount = sliderRange / spacing + 1; // +1 to account for 0

  for (let ii = 0; ii < tickCount; ii++) {
    let tick = document.createElement("span");

    tick.className = "tick-slider-tick";

    container.appendChild(tick);
  }
}

function onResize() {
  const sliders = document.getElementsByClassName("tick-slider-input");
  const sliders2 = document.getElementsByClassName("tick-slider-input-2");
  for (let slider of sliders) {
    updateValuePosition(slider);
  }

  for (let slider of sliders2) {
    updateValuePosition(slider);
  }
}

window.onload = init;
window.addEventListener("resize", onResize);



// Obtener los campos de entrada
const camposRange = document.getElementsByClassName('tick-slider-input');
// Obtener los campos de entrada
const camposRangeClientes = document.getElementsByClassName('tick-slider-input-2');

// Convertir el objeto NodeList en un array
const camposRangeArrayClientes = Array.from(camposRangeClientes);

// Convertir el objeto NodeList en un array
const camposRangeArray = Array.from(camposRange);

// Función para actualizar la suma de los campos de entrada
function actualizarSumaCampos() {
  // Sumar los valores de los campos de entrada
  const sumaValores = camposRangeArray.reduce((acumulador, campo) => acumulador + parseInt(campo.value), 0);

  // Actualizar el elemento HTML que muestra la suma
  const sumaCamposElement = document.getElementById('sumaTotal');
  sumaCamposElement.value = sumaValores;


  // Verificar si la suma es mayor a 100
  if (sumaValores > 100) {
    mostrarEmoji(false, 'La suma de los campos  de porcentaje no puede ser mayor a 100% <br> Puedes ajustar el porcetaje segun se requiera')
    //alert('La suma de los campos no puede ser mayor a 100');
  } else {

    mostrarEmoji(true)
  }





}

function actualizarTotalesSumaCampos(id_campo_actual) {

  // Sumar los valores de los campos de entrada
  const clienttotal = document.getElementById('clienttotal');

  for (let campo of camposRangeClientes) {

    if (id_campo_actual !== campo.dataset.id) {
      const porcentaje = (campo.value * 100) / clienttotal.value;
      console.info('suma' + clienttotal.value)
      console.info('campo' + campo.value)
      console.info(porcentaje.toFixed(2))
      console.log(porcentaje + "campo" + campo.dataset.id)
      const porcentajeInput = document.querySelector('#porcentaje_m' + campo.dataset.id);
      porcentajeInput.value = porcentaje.toFixed(2);
      porcentajeInput.oninput = onSliderInput;

      updateValue(porcentajeInput);
      updateValuePosition(porcentajeInput);
      updateLabels(porcentajeInput);
      updateProgress(porcentajeInput);

      setTicks(porcentajeInput);

      porcentajeInput.oninput = onSliderInput;

    }
    actualizarSumaCampos();

  };

  // Actualizar el elemento HTML que muestra la suma

}


function actualizarTotalesSumaClientes(id_campo_actual) {

  // Sumar los valores de los campos de entrada
  const clienttotal = document.getElementById('clienttotal');

  for (let campo of camposRange) {

    if (id_campo_actual !== campo.dataset.id) {
      const porcentaje = (campo.value * clienttotal.value) / 100;
      console.log(campo.value + "x" + clienttotal.value)
      console.info(porcentaje.toFixed(2))

      const porcentajeInput = document.querySelector('#clientes_l' + campo.dataset.id);
      porcentajeInput.value = porcentaje.toFixed(2);
      porcentajeInput.oninput = onSliderInput;

      updateValue(porcentajeInput);
      updateValuePosition(porcentajeInput);
      updateLabels(porcentajeInput);
      updateProgress(porcentajeInput);

      setTicks(porcentajeInput);

      porcentajeInput.oninput = onSliderInput;

    }


  };

  // Actualizar el elemento HTML que muestra la suma






}




// Función para actualizar la suma de los campos de entrada
function actualizarSumaCamposClientes() {
  // Sumar los valores de los campos de entrada
  const sumaValores = camposRangeArrayClientes.reduce((acumulador, campo) => acumulador + parseInt(campo.value), 0);

  // Actualizar el elemento HTML que muestra la suma
  const sumaCamposElement = document.getElementById('clienttotal');
  sumaCamposElement.value = sumaValores;


}

// Asignar el evento "input" a cada campo de entrada

for (let campo of camposRangeArray) {
  campo.addEventListener('input', actualizarSumaCampos);

}

for (let campo of camposRangeArrayClientes) {

  campo.addEventListener('input', actualizarSumaCamposClientes);
}


function mostrarEmoji(respuesta, msj = '') {
  const emojiElement = document.getElementById("emoji");
  const emojiTextElement = document.getElementById("emoji-text");

  if (respuesta) {
    emojiElement.innerHTML = emojione.toImage("🙂");
    emojiTextElement.innerHTML = msj;
  } else {
    emojiElement.innerHTML = emojione.toImage("😒");
    emojiTextElement.innerHTML = msj + ".";
  }
}


function sumaValoresDeCampos(campos) {
  let total = 0;
  campos.forEach((campo) => (total += parseInt(campo.value)));
  return total;
}

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Objetivo', 'Plan actual'],
    datasets: [{
      label: 'Plan Actual',
      data: [12, 19],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const rentabilidad = document.querySelector('#rentabilidad');

rentabilidad.addEventListener('change', (event) => {
  const valor_ganancia = document.querySelector('.valor_ganancia');
  const valor_venta = document.querySelector('.valor_venta');
  valor_ganancia.innerHTML = `${event.target.value}`;
  valor_venta.innerHTML = ` ${event.target.value * 5}`;
});

// Obtenemos todos los campos de entrada con la clase "calculocliente"
var campos = document.getElementsByClassName("calculocliente");

// Iteramos sobre todos los campos de entrada y agregamos un evento "change"
for (var i = 0; i < campos.length; i++) {
  campos[i].addEventListener("change", function () {
    // Calculamos la suma de los valores de todos los campos de entrada
    var total = 0;
    for (var j = 0; j < campos.length; j++) {
      // Verificamos si el valor del campo es numérico
      if (!isNaN(parseFloat(campos[j].value))) {
        total += parseFloat(campos[j].value);
      }
    }

    // Establecemos la suma total en el campo de entrada con el id "clienttotal"
    document.getElementById("clienttotal").value = total;
  });
}



///Obtener todos los input de clientes y porcentaje
const clientes = document.querySelectorAll('input[id^="clientes_l"]');
const porcentajes = document.querySelectorAll('input[id^="porcentaje_m"]');

// Obtener el input de total de clientes y asignar evento de cambio
const totalClientes = document.querySelector('#clienttotal');
totalClientes.addEventListener('change', actualizarPorcentajes);

// Asignar evento de cambio para cada input de clientes y porcentaje
for (let i = 0; i < clientes.length; i++) {
  clientes[i].addEventListener('change', actualizarPorcentaje);
  porcentajes[i].addEventListener('change', actualizarCliente);
}

// Función para actualizar el porcentaje correspondiente al input de clientes
function actualizarPorcentaje(event) {
  const valorCliente = parseInt(event.target.value);


  const porcentaje = (valorCliente / totalClientes.value) * 100;
  const porcentajeInput = document.querySelector('#porcentaje_m' + event.target.dataset.id);
  porcentajeInput.value = porcentaje.toFixed(2);


  porcentajeInput.oninput = onSliderInput;

  updateValue(porcentajeInput);
  updateValuePosition(porcentajeInput);
  updateLabels(porcentajeInput);
  updateProgress(porcentajeInput);

  setTicks(porcentajeInput);

  porcentajeInput.oninput = onSliderInput;


  actualizarSumaCampos();
  actualizarTotalesSumaCampos(event.target.dataset.id)
}

// Función para actualizar el valor de clientes correspondiente al input de porcentaje
function actualizarCliente(event) {
  const porcentaje = parseFloat(event.target.value);
  const valorCliente = (porcentaje * totalClientes.value) / 100;
  const clienteInput = document.querySelector('#clientes_l' + event.target.dataset.id);;
  clienteInput.value = valorCliente.toFixed(2);
  actualizarTotalesSumaClientes(event.target.dataset.id)
  clienteInput.oninput = onSliderInput;

  updateValue(clienteInput);
  updateValuePosition(clienteInput);
  updateLabels(clienteInput);
  updateProgress(clienteInput);

  setTicks(clienteInput);

  actualizarSumaCampos();
}

// Función para actualizar todos los porcentajes de acuerdo al valor total de clientes
function actualizarPorcentajes() {
  const total = parseInt(totalClientes.value);
  const porcentajeSuma = 0;
  for (let i = 0; i < clientes.length; i++) {
    const valorCliente = parseInt(clientes[i].value);
    const porcentaje = (valorCliente / total) * 100;
    porcentajes[i].value = porcentaje.toFixed(2);
    porcentajeSuma += porcentaje;
  }
  actualizarSumaCampos();
}

