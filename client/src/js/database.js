import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');

  const store = transaction.objectStore('jate');

  const request = store.put({ id: 1, value: content });
}

export const getDb = async () => {
  const db = await openDB('jate', 1);

  const transcation = db.transaction('jate', 'readonly');

  const store = transcation.objectStore('jate');

  const request = store.getAll();
};

initdb();
