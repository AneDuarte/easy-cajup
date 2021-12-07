module.exports = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      //Email e senha da empresa
      user: "someone@gmail.com", 
      pass: "!s0m3PaSSw0rD#", 
    },
    default: {
        from: "Empresa Tal <someone@gmail.com>",
    }
}