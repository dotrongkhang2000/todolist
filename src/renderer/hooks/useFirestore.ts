import { useState, useEffect } from 'react';
import {
  collection as collectionFirestore,
  DocumentData,
  onSnapshot,
  Query,
  query,
  where,
  WhereFilterOp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
interface IUseFirestoreProps {
  collection: string;
  condition?: {
    fieldName: string;
    operator: WhereFilterOp;
    compareValue: string;
  };
}

const useFirestore = ({ collection, condition }: IUseFirestoreProps) => {
  const [document, setDocument] = useState<any>([]);

  useEffect(() => {
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
        id: doc.id,
      }));

      setDocument(list);
    });

    return () => {
      unsubcribe();
    };
  }, [collection, collection]);

  return document;
};

export default useFirestore;