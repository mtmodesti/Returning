import * as yup from "yup";

const criarEnderecosSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        cidade: yup.string().required("É necessário informar o nome"),

        estado: yup.string().required("É necessário informar o estado"),
        cep: yup
          .string()
          .required("É necessário informar o cep")
          .matches(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/),
        rua: yup.string().required("É necessária informar a rua"),

        numero: yup
          .number()
          .transform((value, originalValue) => {
            return originalValue === "" ? undefined : value;
          })
          .required("É necessário informar o número da residência")
          .typeError("Precisa ser número"),

        bairro: yup
          .string()
          .required("É necessário informar o bairro da residência"),
      }),

      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default criarEnderecosSchema;
