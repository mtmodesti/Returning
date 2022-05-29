import * as yup from "yup";

const criarUsuariosSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        nome: yup
          .string()
          .required("É necessário informar o nome")
          .min(3, "O nome deve ter mais de 3 letras")
          .matches(
            /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            "O nome deve ter apenas letras"
          ),
        email: yup.string().required("É necessário informar o email"),
        senha: yup
          .string()
          .required("É necessária informar a senha")
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Mínimo de 8 dígitos(Caractere Especial, Número, Maiúscula, Minúscula)"
          ),
        confirmacaoDeSenha: yup
          .string()
          .required("Confirmação obrigatória")
          .oneOf([yup.ref("password"), null], "Senhas diferentes"),

        cpf: yup
          .string()
          .required("É necessário informar o cpf")
          .matches(
            /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/$
          ),
        telefone: yup
          .string()
          .required("É necessário informar o telefone")
          .matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/),
        pendencia: yup.boolean().required("É necessária informar a pendência"),
      }),

      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default criarUsuariosSchema;
