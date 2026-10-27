import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_ALMACENAMIENTO = 'gastos';

export async function obtenerGastos() {
  try {
    const datos = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.log('Error al obtener gastos:', error);
    return [];
  }
}

export async function guardarGastos(gastos) {
  try {
    await AsyncStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(gastos));
  } catch (error) {
    console.log('Error al guardar gastos:', error);
  }
}