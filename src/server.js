const app = require("./app");

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log(`(●'◡'●)| o servidor está [ON] na porta: ${porta}`);
});
