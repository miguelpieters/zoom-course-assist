import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import PrimaryApp from "./app";
import Controller from './api/controller';
import 'antd/dist/antd.css';
import './scss/base.scss';

Controller.setup();

export const UserContext = React.createContext({
  user: "",
  room: -1,
  question: -1,
  identify: (name: string, room: number) => {},
  setQuestion: (question: number) => {}
});

export const AdminContext = React.createContext({
  token: "",
  setToken: (token: string) => {},
});

ReactDOM.render(
  <React.StrictMode>
    <PrimaryApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
