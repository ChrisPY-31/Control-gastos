import { useEffect, useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ?JSON.parse(localStorage.getItem('gastos')):[]
  );

  const [gastoEditar , setGastoEditar] = useState({})

  const [filtro , setFiltro] = useState('')
  const [ gastosFiltrados , setGastosFiltrados ] = useState([])

  useEffect(() =>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  },[gastoEditar])

  useEffect(() =>{
    localStorage.setItem('presupuesto' , presupuesto ?? 0)
  },[presupuesto])

  useEffect(() =>{
    //no puedes mandar arreglo en localStorange por eso lo mandamos en un json
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

 useEffect(() =>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto'))?? 0
  
  if(presupuestoLS > 0 ){
    setIsValidPresupuesto(true)
  }
 },[])

 useEffect(() =>{
  if(filtro){
    //filtrar gastos por categoria
    const filtrarGastos = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(filtrarGastos)
  }
 },[filtro])

  const handleNuevoGasto = () => {
    setModal(true);

    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  
  const guardarGasto = (gasto) => { 
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  
  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    
    setGastos(gastosActualizados)
  }
  return (
    <div className={modal ?'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos 
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            gastosFiltrados={gastosFiltrados}
            filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
        />
      )}
    </div>
  );
}

export default App;
