import React from "react";
import './Footer.css'
export default function Footer() {
 return (
  <footer className="footer">
   <div>
    <a className="footer-logo" href="https://rs.school/js/"> </a>
   </div>
   <time className="datetime" dateTime="2022">2022</time>
   <div className="footer-team">
    <a className="alina-link" href="https://github.com/spadarynjaALINA"> </a>
    <a className="vika-link" href="https://github.com/vikklex"> </a>
    <a className="anton-link" href="https://github.com/alivar391"> </a>
   </div>
  </footer>
 )
}