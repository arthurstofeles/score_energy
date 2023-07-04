<template>
  <div class="quem-somos se_blue_dark pt-8 pb-4">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" class="mb-10">
          <h2 class="se_green_light--text mb-4">Quem somos</h2>
          <p class="se_green_light--text caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque lacinia id elit eget viverra. Praesent maximus ex
            varius eros tempor, id aliquet augue bibendum.
          </p>
        </v-col>
        <div class="colunas">
          <div class="perfil">
            <img
              src="@/assets/circle.png"
              alt="Chief Technology Officer (CTO)"
            />
            <div>
              <h3>
                <a href="" target="_blank">Fulano de Tal</a>
              </h3>
              <p>Função Profissional da pessoal</p>
            </div>
          </div>
          <div class="perfil left">
            <img src="@/assets/circle.png" alt="Daniel Alves Lara Fernandes" />
            <div>
              <h3>
                <a href="" target="_blank">Fulano de Tal</a>
              </h3>
              <p>Função Profissional da pessoal</p>
            </div>
          </div>
          <div class="perfil">
            <img src="@/assets/circle.png" alt="Fausto Pereira Neto" />
            <div>
              <h3>
                <a href="" target="_blank">Fulano de Tal</a>
              </h3>
              <p>Função Profissional da pessoal</p>
            </div>
          </div>
          <div class="perfil left">
            <img src="@/assets/circle.png" alt="Jesus Carlos da Silva" />
            <div>
              <h3>
                <a href="" target="_blank">Fulano de Tal</a>
              </h3>
              <p>Função Profissional da pessoal</p>
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
          font-size: 14px;
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
