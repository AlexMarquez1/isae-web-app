import React from 'react'
import { useParams } from 'react-router-dom'
import {URL_SERVICES} from "../constants/contants.js";

/*Obtiene datos del inventario, por id del equipo alamcenado*/
const Inventario = () => {

    //console.log(useParams())
    const {id} = useParams()
    console.log(id);

    const [inventariosid, setInventarioId] = React.useState([])

  React.useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    let url = URL_SERVICES + `inventario/${id}`;
    const data = await fetch (url)
    const inventario = await data.json()
    console.log(inventario)
    setInventarioId(inventario)
  }

    return(
        <div>
            <h3>{inventariosid.proyecto}</h3>
        </div>
    )
}

export default Inventario