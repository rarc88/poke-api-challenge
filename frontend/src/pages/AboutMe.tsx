import React from "react";
import {
  FaWhatsappSquare,
  FaInstagramSquare,
  FaGithubSquare,
} from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";

export const AboutMe = () => {
  const size = 50;

  return (
    <div className="pt-4">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-6">
          <div className="card text-center">
            <div className="card-header">
              <img src="/profile-photo.png" className="avatar" alt="" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Un poco sobre mi</h5>
              <p className="card-text text-start">
                Me llamo <strong>Roberto Ruiz</strong>, soy ingeniero de
                sistemas de origen Venezolano pero resido actualmente en la
                ciudad de Quito.
              </p>
              <p className="card-text text-start">
                Me caracterizo por ser proactivo, puntual, autodidacta,
                multidisciplinar, organizado, creativo y mantengo un aprendizaje
                continuo.
              </p>
              <p className="card-text text-start">
                Manejo múltiples lenguajes de programación para frontend,
                backend y mobile. También siento una fuerte atracción por todo
                lo relacionado con Docker (entornos de trabajo y deploys).
              </p>
            </div>
            <div className="card-footer text-muted">
              <div>
                <a
                  href="https://platzi.com/p/rarc88"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  Perfil de platzi
                </a>
                <a
                  href="/cv.pdf"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  CV
                </a>
                <a
                  href="https://github.com/rarc88/poke-api-challenge"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  Repositorio
                </a>
              </div>
              <div className="py-2">
                <a
                  href="https://api.whatsapp.com/send?phone=5930983847595&text=Hola%20Roberto"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  <FaWhatsappSquare size={size} color="green" />
                </a>
                <a
                  href="https://www.linkedin.com/in/roberto-ruiz-854114238"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  <AiFillLinkedin size={size} color="#0e76a8" />
                </a>
                <a
                  href="https://www.instagram.com/rarc2288"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  <FaInstagramSquare size={size} color="#C13584" />
                </a>
                <a
                  href="https://github.com/rarc88"
                  rel="noreferrer"
                  target="_blank"
                  className="card-link"
                >
                  <FaGithubSquare size={size} color="black" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
