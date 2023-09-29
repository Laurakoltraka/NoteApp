import { db } from "./firebaseConfig";
import { addDoc,getDocs, deleteDoc, query, where,collection,} from "firebase/firestore";
    
const categoriesCollection = collection(db, 'categories');

export const getCategories = async () => {
  try {
    const data = await getDocs(categoriesCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error getting categories', error);
    throw error; 
  }
};

export const addNewCategory = async (category) => {
    await addDoc(categoriesCollection, category);
};

export const deleteCategory = async (id) => {
    await deleteDoc(categoriesCollection, id);
};

export const getCategoriesById = async (uid) => {
    let qry = query(categoriesCollection, where("uid", "==", uid));
    let querySnapshot = await getDocs(qry);
    return querySnapshot.docs.map((doc) => doc.data());
};