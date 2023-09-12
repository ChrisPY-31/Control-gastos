import React from "react";
import NuevoGasto from "./NuevoGasto";

const  ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length === 0 ? "No tienes Gastos Filtrados" : " gastos"}</h2>

          {gastosFiltrados.map((gasto) => (
            <NuevoGasto
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length === 0 ? "No tienes Gastos aun" : " gastos"}</h2>

          {gastos.map((gasto) => {
            return (
              <NuevoGasto
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
