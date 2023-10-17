import firestore from '@react-native-firebase/firestore';

export const addNewDocument = async (collection: string, data: any) => {
  const response = await firestore().collection(collection).add(data);
  return response;
};

export const getAllDocuments = async (collection: string) => {
  const snapshot = await firestore().collection(collection).get();
  const data = [] as any;
  snapshot.forEach(doc => {
    data.push({id: doc.id, ...doc.data()});
  });
  console.log('Data fetched successfully:', data);
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
  return await firestore().collection(collection).doc(id).update(newData);
};

export const deleteData = async (collection: string, id: string) => {
  return await firestore().collection(collection).doc(id).delete();
};
