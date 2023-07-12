import { apiInstance } from "@/utils/api-instance";
import { ENDPOINTS } from "@/utils/constants";

export const criaConta = async (payload) => {
  const { data } = await apiInstance.post(ENDPOINTS.CADASTRO_USUARIO, payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await apiInstance.post(ENDPOINTS.LOGIN, payload);
  return data;
};

export const recuperarSenha = async (payload) => {
  const { data } = await apiInstance.post(ENDPOINTS.RECUPERAR_SENHA, payload);
  return data;
};

// export const novaSenha = async (payload) => {
//   const { data } = await apiInstance.post(ENDPOINTS.NOVA_SENHA, payload);
//   return data;
// };

export const perguntasScore = async (payload) => {
  const { data } = await apiInstance.get(ENDPOINTS.QUESTIONS, payload);
  return data;
};

// export const resultadoScore = async (payload) => {
//   const { data } = await apiInstance.post(ENDPOINTS.RESULT, payload);
//   return data;
// };
