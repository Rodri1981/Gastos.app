import { crearGasto, validarGasto } from '../models/Gasto';
import { obtenerGastos, guardarGastos } from '../repositories/GastosRepository';

export async function cargarGastos() {
  return await obtenerGastos();
}

export async function agregarGasto(descripcion, monto, categoria) {
  const error = validarGasto(descripcion, monto, categoria);
  if (error) return { error };

  const gastos = await obtenerGastos();
  const nuevoGasto = crearGasto(descripcion, monto, categoria);
  const nuevosGastos = [...gastos, nuevoGasto];
  
  await guardarGastos(nuevosGastos);
  return { gasto: nuevoGasto, gastos: nuevosGastos };
}

export async function eliminarGasto(id) {
  const gastos = await obtenerGastos();
  const nuevosGastos = gastos.filter((g) => g.id !== id);
  await guardarGastos(nuevosGastos);
  return nuevosGastos;
}

export function calcularTotal(gastos) {
  return gastos.reduce((total, gasto) => total + gasto.monto, 0);
}

export function obtenerGastoMasAlto(gastos) {
  if (gastos.length === 0) return null;
  return gastos.reduce((max, gasto) => 
    gasto.monto > max.monto ? gasto : max
  );
}

export function obtenerTotalesPorCategoria(gastos) {
  const categorias = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Otros'];
  return categorias.map((cat) => ({
    categoria: cat,
    total: gastos
      .filter((g) => g.categoria === cat)
      .reduce((acc, g) => acc + g.monto, 0),
  })).filter((c) => c.total > 0);
}