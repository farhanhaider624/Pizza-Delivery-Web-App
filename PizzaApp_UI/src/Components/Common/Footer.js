import React from "react";

const Footer = () => {
  return (
    <>
      <div style={footer}>
        <ul className="nav-ul " style={text_footer}>
          <li>
            <a href="farhanhaider624@gmail.com" style={{ color: "darkblue" }}>
              {" "}
              farhanhaider624@gmail.com
            </a>
          </li>
          <li>8390569860</li>
          <li>
            <a
              href=" https://github.com/farhanhaider624"
              style={{ color: "darkblue" }}
            >
              https://github.com/farhanhaider624
            </a>
          </li>
          <li>
            {" "}
            <a
              href=" https://www.linkedin.com/in/farhan-haider-1268a222a"
              style={{ color: "darkblue" }}
            >
              www.linkedin.com/in/farhan-haider-1268a222a
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;

let footer = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  height: "40px",
  backgroundColor: "skyblue",
  padding: "0px",
  textAlign: "center",
};

let text_footer = {
  textAlign: "left",
  fontFamily: "cursive",
  fontSize: "small",
  marginLeft: "25px",
  marginTop: "0px",
  marginBottom: "5px",
  color: "darkblue",
  fontWeight: "bolder",
  opacity: "inherit",
  paddingLeft: "55px",
};
