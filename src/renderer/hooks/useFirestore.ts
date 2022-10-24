import { useState, useEffect } from 'react';
import {
  collection as collectionFirestore,
  DocumentData,
  onSnapshot,
  Query,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/renderer/firebase/config';
import create from 'zustand';
interface IUseFirestoreProps {
  collection: string;
  condition?: ICondition;
}

interface IFirestoreState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useFirestoreState = create<IFirestoreState>((set) => ({
  loading: true,
  setLoading: (val) => set(() => ({ loading: val })),
}));

const useFirestore = ({ collection, condition }: IUseFirestoreProps) => {
  const [document, setDocument] = useState<any>([]);

  const setLoading = useFirestoreState((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);

    const collectionRef = collectionFirestore(db, collection);

    let q: Query<DocumentData> = query(collectionRef);

    if (collectionRef) {
      if (condition?.compareValue) {
        q = query(
          collectionRef,
          where(condition.fieldName, condition.operator, condition.compareValue)
        );
      }
    }

    // new realtime setup
    const unsubcribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.data().id || doc.id,
      }));

      setDocument(list);
      setLoading(false);
    });

    return () => {
      unsubcribe();
    };
  }, [collection, condition]);

  return document;
};

export default useFirestore;
