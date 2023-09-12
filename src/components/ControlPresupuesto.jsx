import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    //calular el porcentaje gastado
    const nuevoPordentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPordentaje);
    }, 1500);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    Swal.fire({
      title: "advertencia",
      text: "Esta seguro que desea eliminar el registro",
      icon: "info",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "si",
    }).then((response) => {
      if (response.isConfirmed) {
        Swal.fire("Exito", "los datos se borraron", "success" , '500')  ;

        setTimeout(() => {
          setGastos([]);
          setPresupuesto(0);
          setIsValidPresupuesto(false);
        }, 500);
      }
      else if (response.isDenied){
        Swal.fire('Informacion' , 'No paso nada' ,'error')
      }
    });
    // if(resultado){
    // }
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <div>
          <CircularProgressbar
            value={porcentaje}
            styles={buildStyles({
              pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
              trailColor: "#F5F5F5",
              textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
            })}
            text={`${porcentaje}% Gastado`}
          />
        </div>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto :</span> {formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible :</span> {formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado :</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
