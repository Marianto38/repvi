import React from 'react'
import './error404.scss'

const Error404 = () => {
  return (
    <section class="page__404">
            <div>
              <div class="page__404Bg">
                <h1>404</h1>
              </div>
              <div class="page__404BBox">
                <h3 class="h2">
                  Oops...
                </h3>
                <p>La pagina que buscas no existe!</p>
                <a href="/home" class="page__404Link">Ir al home</a>
              </div>
      </div>
    </section>
  )
}

export default Error404