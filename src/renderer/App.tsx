/* eslint-disable @typescript-eslint/promise-function-async */
import React, { Suspense } from 'react';

import { CssBaseline } from '@mui/material';

const MainWindow = React.lazy(() =>
  import('@/renderer/components/main-window').then((module) => ({
    default: module.MainWindow,
  }))
);

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<div />}>
        <MainWindow />
      </Suspense>
    </>
  );
};
