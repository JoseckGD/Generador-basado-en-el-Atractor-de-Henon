import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import { saveAs } from "file-saver";

const x_min = -1.33;
const x_max = 1.32;
const y_min = -0.5;
const y_max = 0.42;

function App() {
  const [X0, setX0] = useState("");
  const [Y0, setY0] = useState("");
  const [coordenadas, setCoordenadas] = useState(null);
  const [text, setText] = useState(null);
  const [tableHannon, setTableHannon] = useState(null);
  const [tableHannon01, setTableHannon01] = useState(null);

  const guardarDatosEnArchivo = (txt) => {
    const datos = txt;
    const blob = new Blob([datos], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `datos ${new Date()}.txt`);
  };

  const Generar = () => {
    const Hennon = [];
    const Hennon01 = [];
    Hennon.push([parseFloat(X0), parseFloat(Y0)]);
    Hennon01.push([
      parseFloat(X0) <= 0.39912 ? 0 : 1,
      parseFloat(Y0) < 0.11977 ? 0 : 1,
    ]);

    let Yi_1 = 0;
    let Xi_1 = 0;
    let txt = "";
    console.log(Hennon01);
    txt += `${Hennon01[0][0]}${Hennon01[0][1]}`;

    for (let i = 0; i < 1000; i++) {
      Yi_1 = 0.3 * Hennon[i][0];
      Xi_1 = Hennon[i][1] + 1 - 1.4 * Math.pow(Hennon[i][0], 2);
      Hennon.push([Xi_1, Yi_1]);
      Hennon01.push([Xi_1 <= 0.39912 ? 0 : 1, Yi_1 < 0.11977 ? 0 : 1]);
      // txt += `${Hennon01[i][0]}, ${Hennon01[i][1]}, `;
      txt += `${Hennon01[i][0]}${Hennon01[i][1]}`;
    }
    setText(txt);
    setTableHannon(Hennon);
    setTableHannon01(Hennon01);
    console.log(Hennon01.length);
    console.log(txt.split(", ").length);
  };

  const validarCoordenadas = () => {
    const parsedX = parseFloat(X0);
    const parsedY = parseFloat(Y0);
    if (
      !isNaN(parsedX) &&
      !isNaN(parsedY) &&
      parsedX >= x_min &&
      parsedX <= x_max &&
      parsedY >= y_min &&
      parsedY <= y_max
    ) {
      setCoordenadas([parsedX, parsedY]);
      Generar();
    } else {
      confirm(
        "Las coordenadas están fuera del rango permitido. ¿Desea obtener unas cordendas?"
      ) && generarCoordenadas();
    }
  };

  const generarCoordenadas = () => {
    const randomX = Math.random() * (x_max - x_min) + x_min;
    const randomY = Math.random() * (y_max - y_min) + y_min;

    setX0(randomX.toFixed(3));
    setY0(randomY.toFixed(3));

    setCoordenadas([randomX, randomY]);
  };

  const handleReset = () => {
    setX0("");
    setY0("");
    setCoordenadas(null);
    setText(null);
    setTableHannon(null);
    setTableHannon01(null);
  };

  return (
    <>
      <h1>Generador basado en el atractor de Hennon</h1>

      <section className="container inputs">
        <div className="input-container">
          <label htmlFor="X0" className="input-X0">
            X<sub>0</sub>
          </label>
          <input
            type="text"
            id="X0"
            placeholder="Ingresa el valor de X0"
            value={X0}
            onChange={(e) => setX0(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="Y0" className="input-Y0">
            Y<sub>0</sub>
          </label>
          <input
            type="text"
            id="Y0"
            placeholder="Ingresa el valor de Y0"
            value={Y0}
            onChange={(e) => setY0(e.target.value)}
          />
        </div>
      </section>

      <section className="container buttons">
        <button className="button" onClick={validarCoordenadas}>
          Validar
        </button>
        <button className="button" onClick={generarCoordenadas}>
          Generar
        </button>
        <button className="button-reiniciar" onClick={handleReset}>
          Reiniciar
        </button>
      </section>

      <section className="container semillas">
        <h2>A (-1.33, 0.42)</h2>
        <h2>B (1.32, 0.133)</h2>
        <h2>C (1.245, -0.14)</h2>
        <h2>D (-1.O6, -0.5)</h2>
      </section>

      {coordenadas && (
        <section className="container">
          <Graph coordenadas={coordenadas} />
        </section>
      )}

      {tableHannon && (
        <section className="container table">
          <table>
            <thead>
              <tr>
                <th colSpan="100%">Hannon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                {tableHannon.map((row, i) => (
                  <td key={i}>
                    X<sub>{i}</sub>
                  </td>
                ))}
              </tr>

              <tr>
                <td>
                  X<sub>i</sub>
                </td>
                {tableHannon.map((row, i) => (
                  <td key={i}>{row[0].toFixed(3)}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="1000%">&nbsp;</td>
              </tr>

              <tr>
                <td>
                  Y<sub>i</sub>
                </td>
                {tableHannon.map((row, i) => (
                  <td key={i}>{row[1].toFixed(3)}</td>
                ))}
              </tr>

              <tr>
                <td></td>
                {tableHannon.map((row, i) => (
                  <td key={i}>
                    y<sub>{i}</sub>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {tableHannon && (
        <section className="container semillas">
          <h2>
            0 si X<sub>i</sub> {`<= 0.39912`}
          </h2>
          <h2>
            1 si X<sub>i</sub> {`> 0.39912`}
          </h2>
          <h2>
            0 si Y<sub>i</sub> {`< 0.11977`}
          </h2>
          <h2>
            1 si Y<sub>i</sub> {`>= 0.11977`}
          </h2>
        </section>
      )}

      {tableHannon01 && (
        <section className="container table">
          <table>
            <thead>
              <tr>
                <th colSpan="100%">Hannon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                {tableHannon01.map((row, i) => (
                  <td key={i}>
                    X<sub>{i}</sub>
                  </td>
                ))}
              </tr>

              <tr>
                <td>
                  X<sub>i</sub>
                </td>
                {tableHannon01.map((row, i) => (
                  <td key={i}>{row[0]}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="1000%">&nbsp;</td>
              </tr>

              <tr>
                <td>
                  Y<sub>i</sub>
                </td>
                {tableHannon01.map((row, i) => (
                  <td key={i}>{row[1]}</td>
                ))}
              </tr>

              <tr>
                <td></td>
                {tableHannon01.map((row, i) => (
                  <td key={i}>
                    y<sub>{i}</sub>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {text && (
        <section className="container">
          <p className="text">{text}</p>
          <button
            className="button"
            onClick={() => guardarDatosEnArchivo(text)}
          >
            Guardar
          </button>
        </section>
      )}
    </>
  );
}

export default App;
