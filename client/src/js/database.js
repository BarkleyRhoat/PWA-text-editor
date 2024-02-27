import { request } from 'express';
import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        // const store =
         db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        // Add any additional logic for upgrading the schema if needed
        console.log('jate database created');
      }
    },
  });
  // return db;
};

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

 export const putDb = async (content) => {
    try{

   const db = await openDB('jate', 1);
   const transaction = db.transaction('jate', 'readwrite');
   const store = transaction.objectStore('jate');
   const request = store.put({ id:1, value: content});
   const result = await request;
   console.log('dada saved to the database', result);
  //  await store.add(content);
  // await transaction.done;
  // return db;
    }catch (err) {
      console.error('no putDb');
    }
  };




// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  try{

  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = await store.getAll();
  const result = await request;

  return result?.value;
  // await transaction.done;
  // return content;
} catch (err) {
  console.error('not getDb')
}
};


const db = await initdb();
