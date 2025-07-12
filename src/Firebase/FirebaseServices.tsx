import {
  CollectionReference,
  FieldValue,
  Firestore,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  setDoc,
  getFirestore,
  OrderByDirection,
  query,
  orderBy,
} from 'firebase/firestore';
import {db} from './firebase.config';
import moment from 'moment';

interface UpdateFields {
  [fieldName: string]: any;
}
interface IncrementFields {
  [fieldName: string]: number;
}
interface DecrementFields {
  [fieldName: string]: number;
}
interface DocumentData {
  [fieldName: string]: any;
}
export async function getSpecificDocumentData(
  collectionName: string,
  documentName: string,
): Promise<DocumentData | null> {
  const docRef = doc(db, collectionName, documentName);
  const docs = await getDoc(docRef);

  if (docs.exists()) {
    return docs.data();
  } else {
    console.error(`Document ${collectionName}/${documentName} does not exist`);
    return null;
  }
}

export async function getDocumentDataInsideDocument(
  collectionName: string,
  documentName: string,
  collectionName1: string,
  documentName1: string,
): Promise<DocumentData | null> {
  const docRef = doc(
    db,
    collectionName,
    documentName,
    collectionName1,
    documentName1,
  );
  const docs = await getDoc(docRef);

  if (docs.exists()) {
    `${collectionName}/${documentName} data:`, docs.data();
    return docs.data();
  } else {
    console.error(`Document ${collectionName}/${documentName} does not exist`);
    return null;
  }
}

export async function getAllDocuments(
  collectionName: string,
): Promise<DocumentData[] | null> {
  const firestoreInstance = db as Firestore;

  let collectionRef: CollectionReference<DocumentData> | null = null;

  if (firestoreInstance instanceof CollectionReference) {
    collectionRef = firestoreInstance;
  } else {
    collectionRef = collection(
      firestoreInstance,
      collectionName,
    ) as CollectionReference<DocumentData>;
  }

  if (collectionRef) {
    const querySnapshot = await getDocs(collectionRef);
    const documents: DocumentData[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      documents.push(doc.data());
    });

    return documents;
  } else {
    console.error('Invalid Firestore instance or collection reference.');
    return null;
  }
}
export async function getAllDocumentsmar(
  collectionName: string,
  orderByField: string,
  orderByDirection: OrderByDirection = 'asc', // Default order direction is ascending
): Promise<DocumentData[] | null> {
  const firestoreInstance = db;

  let collectionRef: CollectionReference<DocumentData> | null = null;

  if (firestoreInstance instanceof CollectionReference) {
    collectionRef = firestoreInstance;
  } else {
    collectionRef = collection(
      firestoreInstance,
      collectionName,
    ) as CollectionReference<DocumentData>;
  }

  if (collectionRef) {
    const querySnapshot = await getDocs(
      query(collectionRef, orderBy(orderByField, orderByDirection)),
    );
    const documents: DocumentData[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      documents.push(doc.data());
    });

    return documents;
  } else {
    console.error('Invalid Firestore instance or collection reference.');
    return null;
  }
}

export async function getCollectionCount(
  collectionName: string,
): Promise<number | null> {
  const firestoreInstance = db as Firestore;

  let collectionRef: CollectionReference<DocumentData> | null = null;

  if (firestoreInstance instanceof CollectionReference) {
    collectionRef = firestoreInstance;
  } else {
    collectionRef = collection(
      firestoreInstance,
      collectionName,
    ) as CollectionReference<DocumentData>;
  }

  if (collectionRef) {
    const querySnapshot = await getDocs(collectionRef);
    const count = querySnapshot.size;

    return count;
  } else {
    console.error('Invalid Firestore instance or collection reference.');
    return null;
  }
}
export async function getNestedDocumentCount(
  collectionName: string,
  documentName: string,
  nestedCollectionName: string,
): Promise<number | null> {
  const firestoreInstance = db as Firestore;

  const docRef = doc(firestoreInstance, collectionName, documentName);
  const nestedCollectionRef: CollectionReference<DocumentData> = collection(
    docRef,
    nestedCollectionName,
  );

  const querySnapshot = await getDocs(nestedCollectionRef);
  const count = querySnapshot.size;

  return count;
}
export async function createOneDocument(
  collectionName: string,
  data: DocumentData,
): Promise<string | null> {
  try {
    const collectionRef = collection(db, collectionName);
    const newDocRef = await addDoc(collectionRef, data);
    return newDocRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    return null;
  }
}
export async function createDocumentForTwoCollection(
  collectionName: string,
  date: string | undefined,
  itemType: number | string,
  data: DocumentData,
): Promise<string | null> {
  try {
    // Construct the document path using the provided parameters
    const documentPath = `History/${date}/${itemType}`;

    // Reference the Firestore collection using the constructed document path
    const docRef = doc(db, documentPath);

    // Add the document with the provided data
    await setDoc(docRef, data);

    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    return null;
  }
}
export async function createCustomOneDocument(
  collectionName: string,
  documentName: string, // Add parameter for custom document name
  data: DocumentData,
): Promise<string | null> {
  try {
    const docRef = doc(collection(db, collectionName), documentName); // Specify the document name
    await setDoc(docRef, data);
    return documentName;
  } catch (error) {
    console.error('Error adding document:', error);
    return null;
  }
}
export async function updateDocumentFields(
  collectionName: string,
  documentId: string,
  fieldsToUpdate: UpdateFields,
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);

    await updateDoc(docRef, fieldsToUpdate);
  } catch (error) {
    console.error(`Error updating document fields: ${error}`);
  }
}

export const decrementPointsInSpecificUser = async (
  MOBILE_NUMBER: string,
  pointsToSubtract: number,
) => {
  try {
    const userDocRef = doc(db, 'Users', MOBILE_NUMBER);

    // Update the 'POINTS' field by decrementing the existing value
    await updateDoc(userDocRef, {POINTS: increment(-pointsToSubtract)});

    // Return a success response or any other value you need
    return {success: true, message: 'Points decremented successfully'};
  } catch (error) {
    console.error('Error decrementing points:', error);

    // Return an error response or any other value you need
    return {success: false, message: 'Error decrementing points', error};
  }
};
export const incrementPointsInSpecificUser = async (
  MOBILE_NUMBER: string,
  pointsToSubtract: number,
) => {
  try {
    const userDocRef = doc(db, 'Users', MOBILE_NUMBER);

    // Update the 'POINTS' field by decrementing the existing value
    await updateDoc(userDocRef, {POINTS: increment(-pointsToSubtract)});

    // Return a success response or any other value you need
    return {success: true, message: 'Points decremented successfully'};
  } catch (error) {
    console.error('Error decrementing points:', error);

    // Return an error response or any other value you need
    return {success: false, message: 'Error decrementing points', error};
  }
};

export const TimeAndDate = async Mobile => {
  try {
    const docRef = doc(getFirestore(), 'Users', Mobile);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const serverTimestamp = docSnapshot.data().serverTimestamp;
      const formattedDate = moment(serverTimestamp).format('DD-MM-YYYY');
      const formattedTime = moment(serverTimestamp).format('HH:mm:ss');
      const dayName = moment(serverTimestamp).format('dddd'); // Get the day name

      // Convert day name to title case (first letter uppercase)
      const capitalizedDayName =
        dayName.charAt(0).toUpperCase() + dayName.slice(1);

      return {
        DATE: formattedDate,
        TIME: formattedTime,
        FilterDATE: new Date(),
        DAY_NAME: capitalizedDayName, // Add the day name to the returned object
        ...docSnapshot.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting server timestamp:', error);
    return null;
  }
};

export const TimeAndDate1 = async Mobile => {
  try {
    const docRef = doc(getFirestore(), 'Users', Mobile);

    const response = await fetch(
      'https://www.timeapi.io/api/Time/current/coordinate?latitude=22.5726&longitude=88.3639',
    );
    const data = await response.json();
    const docSnapshot = await getDoc(docRef);

    const formattedDate = moment(data.date, 'MM/DD/YYYY').format('DD-MM-YYYY');
    const formattedTime = moment(data.time, 'HH:mm').format('HH:mm:ss');

    const capitalizedDayName = data.dayOfWeek.toUpperCase(); // Capitalize all letters in the day name

    return {
      DATE: formattedDate,
      TIME: formattedTime,
      FilterDATE: new Date(),
      DAY_NAME: capitalizedDayName,
      ...docSnapshot.data(),
    };
  } catch (error) {
    console.error('Error getting time from API:', error);
    return null;
  }
};
