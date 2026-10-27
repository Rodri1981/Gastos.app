import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function TarjetaGasto({ gasto, onEliminar }) {
  const formatearMonto = (valor) =>
    '$' + valor.toLocaleString('es-AR', { minimumFractionDigits: 0 });

  return (
    <View style={styles.tarjeta}>
      <View style={styles.info}>
        <Text style={styles.descripcion}>{gasto.descripcion}</Text>
        <Text style={styles.monto}>
          {formatearMonto(gasto.monto)} — {gasto.categoria}
        </Text>
      </View>
      <Pressable style={styles.btnEliminar} onPress={() => onEliminar(gasto.id)}>
        <Text style={styles.btnEliminarTexto}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  info: { flex: 1 },
  descripcion: { fontSize: 16, fontWeight: '600', color: '#333' },
  monto: { fontSize: 14, color: '#666', marginTop: 2 },
  btnEliminar: {
    backgroundColor: '#f44336',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEliminarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});