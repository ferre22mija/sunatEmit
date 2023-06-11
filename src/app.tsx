import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './index.tsx';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
    <Index />
    </ChakraProvider>
    
  </React.StrictMode>
);