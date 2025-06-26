import React from "react";
import { useParams } from "react-router-dom";
import HistorialCliente from "../pages/HistorialCliente";

const HistorialClienteRoute = () => {
  const { clienteId } = useParams();

  return <HistorialCliente clienteId={clienteId} />;
};

export default HistorialClienteRoute;