import { createContext } from 'react';

export const AppCtx = createContext({});

const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isValidEmail = email => email && emailRegEx.test(email);