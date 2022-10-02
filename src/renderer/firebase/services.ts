import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './config';

export const getListWorkspace = async () => {
  const listWorkspaceCol = collection(db, 'list-workspace');
  const listWorkspaceSnapshot = await getDocs(listWorkspaceCol);
  const listWorkspace = listWorkspaceSnapshot.docs.map((doc) => doc.data());

  await addNewWorkspace();

  return listWorkspace;
};

export const getTaskWithWorkspaceId = () => {
  const taskCol = collection(db, 'task');
  const q = query(taskCol, where('id', '==', 'TOD-1'));
  onSnapshot(q, (snapshot) => {
    const listTask: any[] = [];
    snapshot.docs.forEach((doc) => {
      listTask.push({ ...doc.data() });
    });
    // eslint-disable-next-line no-console
    console.log(listTask);
  });
};

export const addNewWorkspace = async () => {
  await setDoc(doc(db, 'list-workspace', 'workspace-2'), {
    name: 'workspace-2',
    imgUrl: '',
  });

  // eslint-disable-next-line no-console
  console.log('add successful');
};

export const updateNewWorkspace = async () => {
  await setDoc(doc(db, 'list-workspace', 'workspace-2'), {
    name: 'workspace-22222',
    imgUrl: '123',
  });

  // eslint-disable-next-line no-console
  console.log('update successful');
};

export const deleteWorkspace = async () => {
  await deleteDoc(doc(db, 'list-workspace', 'workspace-2'));

  // eslint-disable-next-line no-console
  console.log('delete successful');
};
