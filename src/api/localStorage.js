export function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return null;
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
}

export function save(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Игнорировать ошибки записи.
  }
}
