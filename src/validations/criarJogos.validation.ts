import * as yup from "yup";

const criarJogosSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        nome: yup.string().required("É necessário informar o nome"),
        dono: yup.string().required("É necessário informar o dono"),
        estado: yup.string().required("É necessário informar o estado do jogo"),

        valor: yup
          .number()
          .transform((value, originalValue) => {
            return originalValue === "" ? undefined : value;
          })
          .required("É necessário informar o valor do jogo")
          .typeError("Precisa ser número"),

        disponivel: yup
          .boolean()
          .required("É necessário informar a disponibilidade do jogo"),
      }),

      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default criarJogosSchema;
