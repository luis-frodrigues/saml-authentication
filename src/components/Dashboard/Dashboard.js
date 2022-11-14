import React from "react";
import logo from "./logo.svg";
//import '../Auth/App.css';
import BGImage from "../Auth/images/mypic.png";

export default function Dashboard() {
  return (
    <div className='App'>
      <h2>Dashboard</h2>
      <link
        href='https://fonts.googleapis.com/css2?family=Catamaran:wght@700&disp lay=swap'
        rel='stylesheet'
      ></link>
      <header className='App-header'>
        <img src={BGImage} className='App-logo' alt='logo' />
      </header>
    </div>
  );
}
