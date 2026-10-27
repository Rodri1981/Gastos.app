import { ScrollView, Text, StyleSheet } from 'react-native';
import TarjetaGasto from './TarjetaGasto';

export default function ListaGastos({ gastos, onEliminar }) {
  if (gastos.length === 0) {
    return <Text style={styles.vacio}>No hay gastos registrados</Text>;
  }

  return (
    <ScrollView>
      {gastos.map((gasto) => (
        <TarjetaGasto key={gasto.id} gasto={gasto} onEliminar={onEliminar} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vacio: { textAlign: 'center', color: '#999', marginTop: 20, fontSize: 14 },
});