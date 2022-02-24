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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const callDb = await openDB('jate', 1);
  const newTrans = callDb.transaction('jate', 'readwrite');
  const desStore = newTrans.objectStore('jate');
  const addRequest = desStore.add({
    content: content,
  });
  const finish = await addRequest;
  console.log(finish);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const callDb = await openDB('jate', 1);
  const newTrans = callDb.transaction('jate', 'readwrite');
  const desStore = newTrans.objectStore('jate');
  const getRequest = desStore.getAll();
  const finish = await getRequest;
  return finish;
};

initdb();
