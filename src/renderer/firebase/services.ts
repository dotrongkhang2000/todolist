import { doc, setDoc, deleteDoc, collection } from 'firebase/firestore';
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

export const setTask = async (task: ITask) => {
  /** if taskId is null then create ref with collection to auto generate document id */
  const newTaskRef = task.id
    ? doc(db, 'task', task.id)
    : doc(collection(db, 'task'));
  await setDoc(newTaskRef, task);
};

export const deleteWorkspace = async (workpsaceId: string) => {
  await deleteDoc(doc(db, 'list-workspace', workpsaceId));
};

export const deleteTask = async (taskId: string) => {
  await deleteDoc(doc(db, 'task', taskId));
};
