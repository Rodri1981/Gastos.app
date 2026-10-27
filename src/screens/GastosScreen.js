import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import FormularioGasto from '../components/FormularioGasto';
import ListaGastos from '../components/ListaGastos';
import {
  cargarGastos,
  agregarGasto,
  eliminarGasto,
  calcularTotal,
  obtenerGastoMasAlto,
  obtenerTotalesPorCategoria,
} from '../controllers/GastosController';

export default function GastosScreen() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    cargarGastos().then(setGastos);
  }, []);

  const handleAgregar = async (descripcion, monto, categoria) => {
    const resultado = await agregarGasto(descripcion, monto, categoria);
    if (resultado.error) {
      Alert.alert('Atención', resultado.error);
    } else {
      setGastos(resultado.gastos);
    }
  };

  const handleEliminar = async (id) => {
    const nuevosGastos = await eliminarGasto(id);
    setGastos(nuevosGastos);
  };

  const total = calcularTotal(gastos);
  const gastoMasAlto = obtenerGastoMasAlto(gastos);
  const totalesPorCategoria = obtenerTotalesPorCategoria(gastos);

  const formatearMonto = (valor) =>
    '$' + valor.toLocaleString('es-AR', { minimumFractionDigits: 0 });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Gestor de Gastos</Text>

      <FormularioGasto onAgregar={handleAgregar} />

      <View style={styles.resumen}>
        <Text style={styles.resumenTitulo}>Resumen</Text>
        <Text style={styles.totalTexto}>
          Total gastado: {formatearMonto(total)}
        </Text>
        <Text style={styles.infoTexto}>
          Cantidad de gastos: {gastos.length}
        </Text>
        {gastoMasAlto && (
          <Text style={styles.infoTexto}>
            Gasto más alto: {gastoMasAlto.descripcion} — {formatearMonto(gastoMasAlto.monto)}
          </Text>
        )}
      </View>

      {totalesPorCategoria.length > 0 && (
        <View style={styles.resumen}>
          <Text style={styles.resumenTitulo}>Gasto por categoría</Text>
          {totalesPorCategoria.map((c) => (
            <Text key={c.categoria} style={styles.infoTexto}>
              {c.categoria}: {formatearMonto(c.total)}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.resumenTitulo}>Gastos</Text>
      <ListaGastos gastos={gastos} onEliminar={handleEliminar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50, paddingHorizontal: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#333' },
  resumen: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  resumenTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  totalTexto: { fontSize: 20, fontWeight: 'bold', color: '#d32f2f', marginBottom: 4 },
  infoTexto: { fontSize: 14, color: '#555', marginBottom: 2 },
});