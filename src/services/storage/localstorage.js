export class LocalStorage {
  static getData(storage, key) {
    const data = storage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }

  static setData(storage, key, data) {
    storage.setItem(
      key,
      typeof data === "string" ? data : JSON.stringify(data)
    );
  }

  static removeData(storage, key) {
    storage.removeItem(key);
  }
}
