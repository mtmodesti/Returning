import * as yup from "yup";

const criarConsolesSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        nome: yup.string().required("É necessário informar o nome"),
        dono: yup.string().required("É necessário informar o dono"),
        estado: yup
          .string()
          .required("É necessário informar o estado do console"),

        valor: yup
          .number()
          .transform((value, originalValue) => {
            return originalValue === "" ? undefined : value;
          })
          .required("É necessário informar o valor do console")
          .typeError("Precisa ser número"),

        disponivel: yup
          .boolean()
          .required("É necessário informar a disponibilidade do console"),
      }),

      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default criarConsolesSchema;
