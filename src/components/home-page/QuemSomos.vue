<template>
  <div class="quem-somos se_blue_dark pt-8 pb-4">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" class="mb-10">
          <h2 class="se_green_light--text mb-4">Quem somos</h2>
          <p class="se_green_light--text caption">
            Um time de especialistas em energia que quer ajudar pequenas e
            médias empresas a diminuirem seus gastos com a conta de energia
            através de conhecimento e acesso a oportunidades disponiveis no
            mercado.
          </p>
        </v-col>
        <div class="colunas">
          <div class="perfil">
            <img src="@/assets/luiz-miranda.png" alt="Luiz Miranda" />
            <div>
              <h3>
                <a
                  href="https://www.linkedin.com/in/luiz-miranda/"
                  target="_blank"
                  >Luiz Miranda</a
                >
              </h3>
              <p>Vice-coordenador do Hub de Inovação UmBUH Eletrobras Chesf</p>
            </div>
          </div>
          <div class="perfil left">
            <img src="@/assets/livia-borges.png" alt="Lívia Calzolari Borges" />
            <div>
              <h3>
                <a
                  href="https://www.linkedin.com/in/l%C3%ADvia-calzolari-borges-aba911239/"
                  target="_blank"
                  >Lívia Calzolari Borges</a
                >
              </h3>
              <p>Administradora na Eletrobras Eletronorte e Advogada</p>
            </div>
          </div>
          <div class="perfil">
            <img
              src="@/assets/cassio-hallmann.png"
              alt="Cássio Hallmann Weyh"
            />
            <div>
              <h3>
                <a
                  href="https://www.linkedin.com/in/cassioweyh/"
                  target="_blank"
                  >Cássio Hallmann Weyh</a
                >
              </h3>
              <p>Engenheiro na Eletrobras Eletrosul</p>
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "QuemSomos",
};
</script>

<style lang="scss" scoped>
.quem-somos {
  .colunas {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    gap: 32px;
    width: 100%;
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 0px;
    }
    .perfil {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      gap: 16px;
      @media screen and (max-width: 768px) {
        flex-direction: row;
        text-align: left;
      }
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 16px;
        @media screen and (max-width: 768px) {
          width: 80px;
          height: 80px;
        }
      }
      div {
        h3 {
          color: #00c693;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.4;
          margin-bottom: 8px;
          @media screen and (max-width: 768px) {
            font-size: 14px;
            margin-bottom: 4px;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        }
        p {
          color: #00c693;
          font-style: italic;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.4;
          @media screen and (max-width: 768px) {
            font-size: 12px;
          }
        }
      }
    }
    .left {
      @media screen and (max-width: 768px) {
        flex-direction: row-reverse;
        text-align: right;
      }
    }
  }
}
</style>
