const formIds = ["#form1", "#form2", "#form3", "#form4", "#form5","#form6"];
const iconIds = ["#icon1", "#icon2", "#icon3", "#icon4", "#icon5","#icon6"];
const SEMANAS_MES = 4;
let viewId = 1;
const forms = formIds.map((id) => document.querySelector(id));
const icons = iconIds.map((id) => document.querySelector(id));

window.onload = init;
window.addEventListener("resize", onResize);

/**EVENTOS */
const tenenedo_promedio_2 = document.getElementById("tenedor_promedio2");
tenenedo_promedio_2.addEventListener("input", event_tenedor_promedio);
const rentabilidad = document.querySelector("#rentabilidad");
const costoPromedioInput = document.getElementById("costo_promedio");
rentabilidad.addEventListener("change", (event) => {
  const valor_ganancia = document.querySelector(".valor_ganancia");
  const valor_venta = document.querySelector(".valor_venta");

  document.querySelector("#objetivo_mensual").value = Math.round(
    event.target.value * 5
  );
  document.querySelector(".valor_ganancia2").innerHTML = event.target.value;
  document.querySelector(".valor_ganancia3").innerHTML = event.target.value;
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
        total += Math.round(parseFloat(campos[j].value));
      }
    }

    // Establecemos la suma total en el campo de entrada con el id "clienttotal"
    document.querySelector("#clienttotal").value = total;
    document.querySelector("#clienttotal2").value = total;
  });
}

// Obtener los campos de entrada
const camposRange = document.getElementsByClassName("tick-slider-input");
const camposRangeClientes = document.getElementsByClassName("tick-slider-input-2");
const camposRange2 = document.getElementsByClassName("tick-slider-pag-3");
const camposRangeClientes2 = document.getElementsByClassName("tick-slider-pag-4");

// Convertir el objeto NodeList en un array
const camposRangeArrayClientes = Array.from(camposRangeClientes);
const camposRangeArray2 = Array.from(camposRange2);
const camposRangeArrayClientes2 = Array.from(camposRangeClientes2);
const camposRangeArray = Array.from(camposRange);


///Obtener todos los input de clientes y porcentaje
const clientes = document.querySelectorAll('input[id^="clientes_l"]');
const porcentajes = document.querySelectorAll('input[id^="porcentaje_m"]');

///Obtener todos los input de clientes y porcentaje
const clientes2 = document.querySelectorAll('input[id^="clientes_c"]');
const porcentajes2 = document.querySelectorAll('input[id^="porcentaje_c"]');
// Obtener el input de total de clientes y asignar evento de cambio
const totalClientes = document.querySelector("#clienttotal");
const totalClientes2 = document.querySelector("#clienttotal2");
totalClientes.addEventListener("change", actualizarPorcentajes);
totalClientes2.addEventListener("change", actualizarPorcentajeTabla_2);
// Asignar evento de cambio para cada input de clientes y porcentaje
for (let i = 0; i < clientes.length; i++) {
  clientes[i].addEventListener("change", actualizarPorcentaje);
  clientes2[i].addEventListener("change", actualizarPorcentajeTabla_2);
  if (porcentajes[i]) {
    porcentajes[i].addEventListener("change", actualizarCliente);
    porcentajes2[i].addEventListener("change", actualizarClienteTabla2);
  }
}

// Asignar el evento "input" a cada campo de entrada

for (let campo of camposRangeArray) {
  campo.addEventListener("input", actualizarSumaCampos);
}

for (let campo of camposRangeArrayClientes) {
  campo.addEventListener("input", actualizarSumaCamposClientes);
}


costoPromedioInput.addEventListener("input", () => {
  const nuevoCostoPromedio = parseFloat(costoPromedioInput.value);
  actualizarGraficoCosto(nuevoCostoPromedio);
});


/**GRAFICOS */

const ctx = document.getElementById("myChart");
const objetivoInput = document.getElementById("sumaTotal2");
const planInput = document.getElementById("clienttotal2");
const ctx_costo_promedio = document.getElementById("chart_costo_promedio").getContext("2d");
const objetivo = 65; // valor del objetivo
const costo = 35; // valor del costo
const porcentajeObjetivo = Math.round((objetivo / total) * 100);
const porcentajeCosto = Math.round((costo / total) * 100);

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Objetivo", "Plan actual"],
    datasets: [
      {
        label: "Plan",
        data: [0, 0],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(75, 192, 192, 0.5)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});






const chartDatactcosto_promedio = {
  labels: ["Objetivo y Costo"],
  datasets: [
    {
      label: "Objetivo",
      data: [porcentajeObjetivo],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      label: "Costo",
      data: [porcentajeCosto],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const chartOptionsCosto = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        min: 0,
        max: 100,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";

          if (label) {
            return label + ": " + context.formattedValue + "%";
          } else {
            return context.formattedValue + "%";
          }
        },
      },
    },
  },
};

const chartCosto = new Chart(ctx_costo_promedio, {
  type: "bar",
  data: chartDatactcosto_promedio,
  options: chartOptionsCosto,
});






/***GEFIC */
function nextForm() {
  console.log("hellonext");
  viewId++;
  progressBar();
  displayForms();

  console.log(viewId);

  if (viewId === 2) {
    actualizar_rentabilidad();
  } else if (viewId === 3) {
    // calcular promedio semanal
    const objetivoMensual = document.querySelector("#objetivo_mensual").value;
    const consumoPromedio = document.querySelector("#tenedor_promedio").value;
    calcularClientesPorDia(consumoPromedio, objetivoMensual);
  } else if (viewId === 4) {
    actualizar_tabla_paso_4();
    const metaVentasMensual = document.querySelector("#objetivo_mensual").value;
    const consumoPromedio = document.querySelector("#tenedor_promedio").value;
    const clienttotal = document.querySelector("#clienttotal").value;
    const meta_alcanzada = clienttotal * consumoPromedio * SEMANAS_MES;
    actualizarGrafico(metaVentasMensual, meta_alcanzada);
  }
}

$(document).on("click", ".number-spinner button", function () {
  var btn = $(this),
    oldValue = btn.closest(".number-spinner").find("input").val().trim(),
    newVal = 0;

  if (btn.attr("data-dir") == "up") {
    newVal = parseInt(oldValue) + 1;
  } else {
    if (oldValue > 1) {
      newVal = parseInt(oldValue) - 1;
    } else {
      newVal = 1;
    }
  }
  btn.closest(".number-spinner").find("input").val(newVal);
});


/**FUCIONES */
function click_tenedor_promedio() {
  const tenenedo_promedio_2 =
    document.getElementById("tenedor_promedio2").value;
  const clienttotal = document.querySelector("#clienttotal2").value;
  const metaVentasMensual = document.querySelector("#objetivo_mensual").value;
  const consumoPromedio = tenenedo_promedio_2;
  const meta_alcanzada = clienttotal * consumoPromedio * SEMANAS_MES;
  actualizarGrafico(metaVentasMensual, meta_alcanzada);
}

function event_tenedor_promedio(event) {
  const clienttotal = document.querySelector("#clienttotal2").value;
  const metaVentasMensual = document.querySelector("#objetivo_mensual").value;
  const consumoPromedio = event.target.value;
  const meta_alcanzada = clienttotal * consumoPromedio * SEMANAS_MES;
  actualizarGrafico(metaVentasMensual, meta_alcanzada);
}

function prevForm() {
  console.log("helloprev");
  viewId--;
  console.log(viewId);
  progressBar();
  displayForms();
}

function progressBar() {
  for (let i = 0; i < icons.length; i++) {
    if (i < viewId - 1) {
      icons[i].classList.add("active");
    } else {
      icons[i].classList.remove("active");
    }
  }
}

function displayForms() {
  for (let i = 0; i < forms.length; i++) {
    if (i === viewId - 1) {
      forms[i].style.display = "block";
    } else {
      forms[i].style.display = "none";
    }
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

  let left =
    percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

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

  const minLabelDelta = valueRect.left - minLabelRect.left;
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

function actualizarSumaCampos() {
  // Sumar los valores de los campos de entrada
  const sumaValores = camposRangeArray.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );
  const sumaValoresClientes = camposRangeArrayClientes.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );
  // Actualizar el elemento HTML que muestra la suma
  const sumaCamposElement = document.getElementById("sumaTotal");
  const sumaCamposElementCliente = document.getElementById("clienttotal");

  sumaCamposElement.value = Math.round(sumaValores);
  sumaCamposElementCliente.value = Math.round(sumaValoresClientes);

  // Verificar si la suma es mayor a 100
  if (sumaValores > 100) {
    mostrarEmoji(
      false,
      "La suma de los campos  de porcentaje no puede ser mayor a 100% <br> Puedes ajustar el porcetaje segun se requiera"
    );
    //alert('La suma de los campos no puede ser mayor a 100');
  } else {
    mostrarEmoji(true);
  }
}

function actualizarTotalesSumaCampos(id_campo_actual) {
  // Sumar los valores de los campos de entrada
  const clienttotal = document.querySelector("#clienttotal");

  for (let campo of camposRangeClientes) {
    if (id_campo_actual !== campo.dataset.id) {
      const porcentaje = Math.round((campo.value * 100) / clienttotal.value);

      const porcentajeInput = document.querySelector(
        "#porcentaje_m" + campo.dataset.id
      );
      const porcentajeInputc = document.querySelector(
        "#porcentaje_c" + campo.dataset.id
      );
      porcentajeInput.value = porcentaje;
      porcentajeInput.oninput = onSliderInput;

      porcentajeInputc.value = porcentaje;
      porcentajeInputc.oninput = onSliderInput;

      updateValue(porcentajeInput);
      updateValuePosition(porcentajeInput);
      updateLabels(porcentajeInput);
      updateProgress(porcentajeInput);
      setTicks(porcentajeInput);
      porcentajeInput.oninput = onSliderInput;

      updateValue(porcentajeInputc);
      updateValuePosition(porcentajeInputc);
      updateLabels(porcentajeInputc);
      updateProgress(porcentajeInputc);
      setTicks(porcentajeInputc);
      porcentajeInputc.oninput = onSliderInput;
    }
    actualizarSumaCampos();
  }

  // Actualizar el elemento HTML que muestra la suma
}

function actualizar_tabla_paso_4() {
  for (let index = 1; index < 8; index++) {
    var valor_cliente_1 = document.getElementById("clientes_l" + index).value;
    var porcentaje_cliente_1 = document.getElementById(
      "porcentaje_m" + index
    ).value;

    document.getElementById("clientes_c" + index).value = valor_cliente_1;
    document.getElementById("porcentaje_c" + index).value =
      porcentaje_cliente_1;
  }
  var sumaTotal = document.getElementById("sumaTotal").value;
  document.getElementById("sumaTotal2").value = sumaTotal;

  var clienttotal = document.getElementById("clienttotal").value;
  document.getElementById("clienttotal2").value = clienttotal;
  const consumoPromedio = document.querySelector("#tenedor_promedio").value;

  document.querySelector("#tenedor_promedio2").value = consumoPromedio;
}

function actualizarTotalesSumaClientes(id_campo_actual) {
  // Sumar los valores de los campos de entrada
  const clienttotal = document.querySelector("#clienttotal");

  for (let campo of camposRange) {
    if (id_campo_actual !== campo.dataset.id) {
      const porcentaje = Math.round((campo.value * clienttotal.value) / 100);
      console.log(campo.value + "x" + clienttotal.value);
      console.info(porcentaje);

      const porcentajeInput = document.querySelector(
        "#clientes_l" + campo.dataset.id
      );

      const porcentajeInput_c = document.querySelector(
        "#clientes_c" + campo.dataset.id
      );
      porcentajeInput.value = porcentaje.toFixed(2);
      porcentajeInput.oninput = onSliderInput;

      porcentajeInput_c.value = porcentaje.toFixed(2);
      porcentajeInput_c.oninput = onSliderInput;

      updateValue(porcentajeInput);
      updateValuePosition(porcentajeInput);
      updateLabels(porcentajeInput);
      updateProgress(porcentajeInput);
      setTicks(porcentajeInput);
      porcentajeInput.oninput = onSliderInput;

      updateValue(porcentajeInput_c);
      updateValuePosition(porcentajeInput_c);
      updateLabels(porcentajeInput_c);
      updateProgress(porcentajeInput_c);
      setTicks(porcentajeInput_c);
      porcentajeInput_c.oninput = onSliderInput;
    }
  }

  // Actualizar el elemento HTML que muestra la suma
}

// Función para actualizar la suma de los campos de entrada
function actualizarSumaCamposClientes() {
  // Sumar los valores de los campos de entrada
  const sumaValores = camposRangeArrayClientes.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );

  // Actualizar el elemento HTML que muestra la suma
  const sumaCamposElement = document.querySelector("#clienttotal");
  const sumaCamposElement2 = document.querySelector("#clienttotal2");

  sumaCamposElement.value = sumaValores;
  sumaCamposElement2.value = sumaValores;
}

function mostrarEmoji(respuesta, msj = "") {
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

function actualizar_rentabilidad() {
  const rentabilidad = document.querySelector("#rentabilidad").value;
  const valor_ganancia = document.querySelector(".valor_ganancia");
  const valor_venta = document.querySelector(".valor_venta");

  document.querySelector("#objetivo_mensual").value = Math.round(
    rentabilidad * 5
  );
  document.querySelector(".valor_ganancia2").innerHTML = rentabilidad;
  document.querySelector(".valor_ganancia3").innerHTML = rentabilidad;
  valor_ganancia.innerHTML = `${rentabilidad}`;
  valor_venta.innerHTML = ` ${rentabilidad * 5}`;
}

function actualizarClienteTabla2(event) {
  const porcentaje = Math.round(event.target.value);
  console.log(" function actualizarClienteTabla2");

  const valorCliente = Math.round((porcentaje * totalClientes2.value) / 100);
  const clienteInput = document.querySelector(
    "#clientes_l" + event.target.dataset.id
  );
  const clienteInput_2 = document.querySelector(
    "#clientes_c" + event.target.dataset.id
  );
  const sumaCamposElement = document.getElementById("sumaTotal2");
  clienteInput.value = valorCliente;
  clienteInput_2.value = valorCliente;
  const sumaValoresClientes = camposRangeArrayClientes2.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );
  const sumaCamposElementCliente = document.getElementById("clienttotal2");
  sumaCamposElementCliente.value = Math.round(sumaValoresClientes);

  const sumaValores = camposRangeArray2.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );
  sumaCamposElement.value = Math.round(sumaValores);

  const consumoPromedio = document.getElementById("tenedor_promedio2");
  const SEMANAS_MES = 4;
  const metaVentasMensual = document.querySelector("#objetivo_mensual").value;
  const meta_alcanzada = totalClientes2.value * consumoPromedio * SEMANAS_MES;
  actualizarGrafico(metaVentasMensual, meta_alcanzada);
  // Verificar si la suma es mayor a 100
  if (sumaValores > 100) {
    mostrarEmoji(
      false,
      "La suma de los campos  de porcentaje no puede ser mayor a 100% <br> Puedes ajustar el porcetaje segun se requiera"
    );
    //alert('La suma de los campos no puede ser mayor a 100');
  } else {
    mostrarEmoji(true);
  }
  for (let campo of camposRange2) {
    if (event.target.dataset.id !== campo.dataset.id) {
      const porcentaje = Math.round((campo.value * clienttotal2.value) / 100);
      const porcentajeInput = document.querySelector(
        "#clientes_l" + campo.dataset.id
      );
      const porcentajeInput_c = document.querySelector(
        "#clientes_c" + campo.dataset.id
      );
      porcentajeInput.value = porcentaje;
      porcentajeInput_c.value = porcentaje;
    }
  }
}

function actualizarPorcentajeTabla_2(event) {
  console.log(" function actualizarPorcentajeTabla_2");

  const valorporcentaje = parseInt(event.target.value);
  const sumaValoresClientes = camposRangeArrayClientes2.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );
  const sumaCamposElementCliente = document.getElementById("clienttotal2");
  sumaCamposElementCliente.value = Math.round(sumaValoresClientes);

  const sumaCamposElement = document.getElementById("sumaTotal2");
  const consumoPromedio = document.getElementById("tenedor_promedio2");
  const SEMANAS_MES = 4;
  const metaVentasMensual = document.querySelector("#objetivo_mensual").value;
  const meta_alcanzada =
    sumaCamposElementCliente.value * consumoPromedio.value * SEMANAS_MES;

  actualizarGrafico(metaVentasMensual, meta_alcanzada);
  for (let campo of camposRangeArrayClientes2) {
    const porcentaje = Math.round(
      (valorporcentaje / totalClientes2.value) * 100
    );
    console.log("porcentaje", porcentaje);
    const porcentajeInput = document.querySelector(
      "#porcentaje_m" + event.target.dataset.id
    );
    const porcentajeInput_2 = document.querySelector(
      "#porcentaje_c" + event.target.dataset.id
    );
    porcentajeInput.value = porcentaje;
    porcentajeInput_2.value = porcentaje;

    // Actualizar el elemento HTML que muestra la suma

    if (event.target.dataset.id !== campo.dataset.id) {
      const porcentaje = Math.round((campo.value * 100) / totalClientes2.value);
      const porcentajeInput = document.querySelector(
        "#porcentaje_m" + campo.dataset.id
      );
      const porcentajeInputc = document.querySelector(
        "#porcentaje_c" + campo.dataset.id
      );
      porcentajeInput.value = porcentaje;
      porcentajeInputc.value = porcentaje;
    }
  }

  const sumaValores = camposRangeArray2.reduce(
    (acumulador, campo) => acumulador + parseInt(campo.value),
    0
  );
  sumaCamposElement.value = Math.round(sumaValores);

  // Verificar si la suma es mayor a 100
  if (sumaValores > 100) {
    mostrarEmoji(
      false,
      "La suma de los campos  de porcentaje no puede ser mayor a 100% <br> Puedes ajustar el porcetaje segun se requiera"
    );
    //alert('La suma de los campos no puede ser mayor a 100');
  } else if (meta_alcanzada < metaVentasMensual) {
    mostrarEmoji(
      false,
      "Incrementa el numerero de clientes  por dia para alcanzar tu objetivo"
    );
  } else {
    mostrarEmoji(true);
  }
}
// Función para actualizar el porcentaje correspondiente al input de clientes
function actualizarPorcentaje(event) {
  const valorCliente = parseInt(event.target.value);

  const porcentaje = Math.round((valorCliente / totalClientes.value) * 100);
  const porcentajeInput = document.querySelector(
    "#porcentaje_m" + event.target.dataset.id
  );
  const porcentajeInput_2 = document.querySelector(
    "#porcentaje_c" + event.target.dataset.id
  );
  porcentajeInput.value = porcentaje;
  porcentajeInput_2.value = porcentaje;

  porcentajeInput.oninput = onSliderInput;
  updateValue(porcentajeInput);
  updateValuePosition(porcentajeInput);
  updateLabels(porcentajeInput);
  updateProgress(porcentajeInput);
  setTicks(porcentajeInput);
  porcentajeInput.oninput = onSliderInput;
  actualizarSumaCampos();
  actualizarTotalesSumaCampos(event.target.dataset.id);
}

// Función para actualizar el valor de clientes correspondiente al input de porcentaje
function actualizarCliente(event) {
  const porcentaje = Math.round(parseFloat(event.target.value));
  const valorCliente = Math.round((porcentaje * totalClientes.value) / 100);
  const clienteInput = document.querySelector(
    "#clientes_l" + event.target.dataset.id
  );
  const clienteInput_2 = document.querySelector(
    "#clientes_c" + event.target.dataset.id
  );
  clienteInput.value = valorCliente;
  clienteInput_2.value = valorCliente;
  actualizarTotalesSumaClientes(event.target.dataset.id);
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

function calcularClientesPorDia(consumoPromedio, metaVentasMensual) {
  const DIAS_LABORABLES_SEMANA = 5;
  const SEMANAS_MES = 4;
  const ventasDiarias =
    metaVentasMensual / (DIAS_LABORABLES_SEMANA * SEMANAS_MES);
  const clientesPorDiaRedondeado = Math.ceil(ventasDiarias / consumoPromedio);
  const totalClientesSemana = clientesPorDiaRedondeado * DIAS_LABORABLES_SEMANA;
  const porcentaje = (clientesPorDiaRedondeado * 100) / totalClientesSemana;
  document.querySelector("#clienttotal").value = totalClientesSemana;
  document.querySelector("#clienttotal2").value = totalClientesSemana;

  console.log("porcentaje" + porcentaje);
  console.log("clientesPorDiaRedondeado" + clientesPorDiaRedondeado);
  document.getElementById("clientes_l1").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_l2").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_l3").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_l4").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_l5").value = clientesPorDiaRedondeado;

  document.getElementById("clientes_c1").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_c2").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_c3").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_c4").value = clientesPorDiaRedondeado;
  document.getElementById("clientes_c5").value = clientesPorDiaRedondeado;

  document.getElementById("porcentaje_c1").value = porcentaje;
  document.getElementById("porcentaje_c2").value = porcentaje;
  document.getElementById("porcentaje_c3").value = porcentaje;
  document.getElementById("porcentaje_c4").value = porcentaje;
  document.getElementById("porcentaje_c5").value = porcentaje;

  for (let index = 1; index < 6; index++) {
    var porcentajeInput = document.querySelector("#porcentaje_m" + index);
    var clienteInput = document.querySelector("#clientes_l" + index);

    updateValue(clienteInput);
    updateValuePosition(clienteInput);
    updateLabels(clienteInput);
    updateProgress(clienteInput);

    setTicks(porcentajeInput);
    updateValue(porcentajeInput);
    updateValuePosition(porcentajeInput);
    updateLabels(porcentajeInput);
    updateProgress(porcentajeInput);
    setTicks(porcentajeInput);
  }

  actualizarSumaCampos();
}

function actualizarGrafico(objetivo, plan) {
  let backgroundColor = "rgba(75, 192, 192, 0.5)"; // verde por defecto
  if (plan < objetivo) {
    backgroundColor = "rgba(255, 99, 132, 0.5)"; // rojo si el plan es menor que el objetivo
  }

  chart.data.datasets[0].data = [objetivo, plan];
  chart.data.datasets[0].backgroundColor[1] = backgroundColor;
  chart.options.plugins.tooltip.callbacks.label = function (context) {
    const label = context.dataset.label || "";

    if (label) {
      return label + ": " + context.formattedValue;
    } else {
      return context.formattedValue;
    }
  };

  chart.update();
}




function actualizarGraficoCosto(nuevoCostoPromedio) {
  // Actualizar los datos del gráfico
  const costo = nuevoCostoPromedio >= 0 ? nuevoCostoPromedio : 0;
  const objetivo = 100 - costo;
  const datos = [objetivo, nuevoCostoPromedio];
  chartCosto.data.datasets[0].data = datos;

  // Actualizar el label del dataset "Costo"
  chartCosto.data.datasets[1].label = `Costo (${costo}%)`;
  // Actualizar el color de la barra de costo promedio
  const backgroundColor = [];

  backgroundColor.push("rgba(75, 192, 192, 0.5)"); // Verde
  backgroundColor.push("rgba(255, 99, 132, 0.5)"); // Rojo

  chartCosto.data.datasets[0].backgroundColor = backgroundColor;

  // Refrescar el gráfico
  chartCosto.update();
}
