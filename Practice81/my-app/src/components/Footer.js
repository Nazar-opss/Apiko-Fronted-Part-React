import React from "react";
import { Link, NavLink } from "react-router-dom";
const Footer = () => {
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

  const LinkTo = (props) => (
    <>
      <Link to={`/catalog/${props.symbol}`} href="#">
        {props.symbol}
      </Link>
      <span className="slash">&nbsp;/&nbsp;</span>
    </>
  );
  
  return (
    <div className="footer" key={alphabet}>
      {alphabet.map((symbol, i, alphabet) => {
        if (i + 1 === alphabet.length) {
          return (
            /* <Link key={symbol} to={`/catalog/:letter`} href="#">
              {symbol}
            </Link> */

            <NavLink key={symbol} to={`/catalog/${symbol}`}>{symbol}</NavLink>
          );
        } else {
          return <LinkTo key={symbol} symbol={symbol} />;
        }
      })}
    </div>
  );
};

export default Footer;
