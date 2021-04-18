let testa1 = document.getElementsByName("Testa1");
let testa2 = document.getElementsByName("Testa2");
let testa3 = document.getElementsByName("Testa3");
let testa4 = document.getElementsByName("Testa4");
let testa5 = document.getElementsByName("Testa5");
let testa6 = document.getElementsByName("Testa6");
let testa7 = document.getElementsByName("Testa7");
let testa8 = document.getElementsByName("Testa8");
let testa = new Array(
  testa1,
  testa2,
  testa3,
  testa4,
  testa5,
  testa6,
  testa7,
  testa8
);
let teste1 = document.getElementsByName("Teste1");
let teste2 = document.getElementsByName("Teste2");
let teste3 = document.getElementsByName("Teste3");
let teste4 = document.getElementsByName("Teste4");
let teste5 = document.getElementsByName("Teste5");
let teste6 = document.getElementsByName("Teste6");
let teste7 = document.getElementsByName("Teste7");
let teste8 = document.getElementsByName("Teste8");
let teste = new Array(
  teste1,
  teste2,
  teste3,
  teste4,
  teste5,
  teste6,
  teste7,
  teste8
);
let ce = document.getElementsByName("Casee");
let c = document.getElementsByName("Case");
let but = document.getElementById("ValBut");
let result = document.getElementById("Result");
let ES = document.getElementById("ErrorSection");
let ErrorTab = new Array();
let a = 0;
let e = 0;
let Calcul1=document.getElementById('Res1');
let Calcul2=document.getElementById('Res2');
let btns1 = document.getElementById("btn1");
let btns2 = document.getElementById("btn2");

function isValid() {
  let flag = 0;

  for (i = 0; i < c.length; i++) {
    if (
      testa[i][0].checked == true ||
      testa[i][1].checked == true ||
      testa[i][2].checked == true
    ) {
      flag++;
    } else if (
      testa[i][0].checked == false &&
      testa[i][1].checked == false &&
      testa[i][2].checked == false
    ) {
      ErrorTab.push(i);
    }
  }
  for (i = 0; i < ce.length; i++) {
    if (
      teste[i][0].checked == true ||
      teste[i][1].checked == true ||
      teste[i][2].checked == true
    ) {
      flag++;
    } else if (
      teste[i][0].checked == false &&
      teste[i][1].checked == false &&
      teste[i][2].checked == false
    ) {
      ErrorTab.push(i + ce.length);
    }
  }

  if (flag == 2 * c.length) {
    return true;
  } else {
    return false;
  }
}
function DrawGraphics(p1, p2) {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart("myChart", {
    type: "scatter",
    plugins: [
      {
        beforeDraw: (chart) => {
          let xAxis = chart.scales["x-axis-1"];
          let yAxis = chart.scales["y-axis-1"];
          const scales = chart.chart.config.options.scales;
          scales.xAxes[0].ticks.padding =
            yAxis.top - yAxis.getPixelForValue(16) - 16;
          scales.yAxes[0].ticks.padding =
            xAxis.getPixelForValue(16) - xAxis.right - 16;
        },
      },
    ],
    data: {
      datasets: [
        {
          label: "Scatter Dataset",
          data: [{ x: p1, y: p2 }],
          borderColor: "red",
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              min: 8,
              max: 24,
              stepSize: 1,
              callback: (v) => (v == 16 ? "" : v),
            },scaleLabel: {
              display: true,
              labelString: 'Activite'
            },

            gridLines: {
              drawTicks: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 8,
              max: 24,
              stepSize: 1,
              callback: (v) => (v == 16 ? "" : v),
            },scaleLabel: {
              display: true,
              labelString: 'Emotivite'
            },

            gridLines: {
              drawTicks: false,
            },
          },
        ],
      },
    },
  });
 /* let myLineExtend = Chart.controllers.line.prototype.draw;
  Chart.helpers.extend(Chart.controllers.line.prototype, {
    draw: function () {
      myLineExtend.apply(this, arguments);
      this.chart.chart.ctx.textAlign = "center";
      this.chart.chart.ctx.font = "1rem Arial black";
      this.chart.chart.ctx.fillText("Emotif/Re-actif", 500, 90);
    },
  });*/
}
function Results(p1, p2) {
  if (p1 > 16 && p2 > 16)
    Calcul2.innerHTML = "Vous Etes Promoteur: Actif/Emotif " + "<br>";
  else if (p1 > 16 && p2 < 16) {
    Calcul2.innerHTML = "Vous Etes Chef d'orchestre:Actif/Non Emotif " + "<br>";
  } else if (p1 < 16 && b > 16) {
    Calcul2.innerHTML = "Vous Etes Empathique:Re-actif/Emotif " + "<br>";
  } else {
    Calcul2.innerHTML = "Vous Etes Analyste:Re-actif/Non Emotif " + "<br>";
  }
}

function DisplayError() {
  text = "<ul>";
  for (k = 0; k < ErrorTab.length; k++) {
    text += "<li>" + "Please Fill Line : " + (ErrorTab[k] + 1) + "</li>";
  }
  text += "</ul>  ";
  ES.innerHTML = text;
  setTimeout(function () {
    ES.innerHTML="";
  }, 10000);
}
function CalculResults(){
  for (i = 0; i < c.length; i++) {
    for (j = 0; j < 3; j++) {
      if (testa[i][j].checked == true) {
        a += parseInt(testa[i][j].value);
      }
    }
  }
  for (i = 0; i < ce.length; i++) {
    for (j = 0; j < 3; j++) {
      if (teste[i][j].checked == true) {
        e += parseInt(teste[i][j].value);
      }
    }
  }
  Calcul1.innerHTML = "J'ai obtenu le resultat  a=  " + a + " et e= " + e;
}

function MyFunc() {

  if (isValid() == false) {
    DisplayError();
  } else {
    debugger;

   CalculResults();
    DrawGraphics(a, e);
    Results(a, e);
    btns1.style.display = "block";
    btns2.style.display = "block";
    setTimeout(function () {
      location.reload();
    }, 50000);
  }
}

function saveHtmlToPdf() {
  let element = document.getElementById("Test-form");
  html2pdf(element);
}

function PrintF() {
  window.print();
}
