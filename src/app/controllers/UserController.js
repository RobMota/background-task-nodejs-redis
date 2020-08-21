import pwdGenerator from "password-generator";
// import Mail from "../lib/Mail";
import Queue from "../lib/Queue";

export default {
  async store(req, res) {
    const { name, email } = req.body;
    const user = {
      name,
      email,
      password: pwdGenerator(15, false),
    };

    await Queue.add("RegistrationMail", { user });

    // sem redis - 7,32 segundos para envio de email e salvar usuario no banco de dados
    // com redis - 7 para envio de email e salvar usuario no banco de dados
    // await Mail.sendMail({
    //   from: "DIO contato@dio.com.br",
    //   to: `${name} <${email}>`,
    //   subject: "Cadastro de usuário",
    //   html: `Olá ${name}, bem vindo a DIO`,
    // });

    res.send(user);
  },
};
