import React from "react";
import "./landing.css";

const LandingPage = () => {
  return (
    <>
      <div className="row head">
        <div className="col-6">
          <h1>
            We Design,
            <br /> We Create
          </h1>
        </div>
        <div className="col-6">
          <p>
            Integer posuere leo non erat ornare dictum id vitae magna. Proin
            consectetur iaculis nisi, ut convallis tortor tempor congue.
            Curabitur sit amet tempus felis. Duis tellus eros, pellentesque at
            rhoncus eu, maximus ut diam.
          </p>
        </div>
      </div>
      {/* </he ader> */}

      {/* <main>
        <section className="intro"> */}
      <div className="row main">
        <div className="col-12">
          <h2>About Us</h2>
        </div>
        <div className="col-8 offset-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
            gravida nisi. Vestibulum ac consequat lorem. In in mi massa. Donec
            ut tellus sit amet sem ornare fermentum at et nunc. Pellentesque ac
            elementum metus. Praesent non venenatis lacus. In sagittis urna in
            nulla sagittis mattis.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
