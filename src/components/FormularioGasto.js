import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const CATEGORIAS = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Otros'];

export default function FormularioGasto({ onAgregar }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleAgregar = () => {
    onAgregar(descripcion, monto, categoria);
    setDescripcion('');
    setMonto('');
    setCategoria('');
  };

  return (
    <View style={styles.formulario}>
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Supermercado"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Monto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 15000"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categoriasRow}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.categoriaBtn, categoria === cat && styles.categoriaActiva]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={[styles.categoriaTexto, categoria === cat && styles.categoriaTextoActivo]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.btnAgregar} onPress={handleAgregar}>
        <Text style={styles.btnTexto}>Agregar Gasto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10, backgroundColor: '#fafafa' },
  categoriasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  categoriaBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#e0e0e0' },
  categoriaActiva: { backgroundColor: '#4CAF50' },
  categoriaTexto: { fontSize: 12, color: '#333' },
  categoriaTextoActivo: { color: '#fff', fontWeight: 'bold' },
  btnAgregar: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 4 },
  btnTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});