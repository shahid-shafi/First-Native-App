import firestore from '@react-native-firebase/firestore';

export const addNewDocument = async (collection: string, data: any) => {
  try {
    await firestore().collection(collection).add(data);
    return {status: true, message: 'Data Added successfully'};
  } catch (error) {
    throw error;
  }
};

// function onResult(QuerySnapshot: any) {
//   const data = [] as any;
//   QuerySnapshot.forEach((doc: any) => {
//     data.push({id: doc.id, ...doc.data()});
//   });
// }

function onError(error: any) {
  throw error;
}

export const getAllFirestoreDocs = (collection: string, callback: any) => {
  firestore()
    .collection(collection)
    .onSnapshot((QuerySnapshot: any) => {
      const data = [] as any;
      QuerySnapshot.forEach((doc: any) => {
        data.push({id: doc.id, ...doc.data()});
      });
      callback(data);
    }, onError);
};

export const getAllDocuments = async (collection: string) => {
  const snapshot = await firestore().collection(collection).get();
  const data = [] as any;
  snapshot.forEach(doc => {
    data.push({id: doc.id, ...doc.data()});
  });
  return data;
};

export const getSingleDocument = async (documentId: string) => {
  try {
    const documentSnapshot = await firestore()
      .collection('yourCollection')
      .doc(documentId)
      .get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      console.log('Document data:', data);
      return data;
    } else {
      console.log('Document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

export const updateData = async (
  collection: string,
  id: string,
  newData: any,
) => {
  try {
    await firestore().collection(collection).doc(id).update(newData);
    return {status: true, message: 'Data updated successfully'};
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (collection: string, id: string) => {
  return await firestore().collection(collection).doc(id).delete();
};
