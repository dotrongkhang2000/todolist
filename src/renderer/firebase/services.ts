import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Function use for add and update new workspace
 * @param: workpsace: { name, imgUrl }
 * @return: promise
 */
export const setListWorkspace = async (workpsace: IWorkspace) => {
  await setDoc(doc(db, 'list-workspace', workpsace.id), {
    name: workpsace.name,
    imgUrl: workpsace.imgUrl,
  });
};

export const deleteWorkspaceInData = async (workpsace: IWorkspace) => {
  await deleteDoc(doc(db, 'list-workspace', workpsace.id));
};
