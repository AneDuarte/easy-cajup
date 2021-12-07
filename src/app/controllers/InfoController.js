class InfoController {
    index(req, res) {
        return res.json({ 
            sistema: "Projeto EasyCajup", 
            version: "1.0.0", 
            equipe: {
                backend: [
                    {
                        nome: "Ane Duarte",
                        linkedin: "in/anebduarte"
                    },
                    {
                        nome: "Carolina Cigerza",
                        linkedin: "in/cigerza"
                    },
                    {
                        nome: "Emerson Bezerra",
                        linkedin: "in/emersondevelops"
                    },
                    {
                        nome: "Ianko Cavalcante",
                        linkedin: "in/iankocalvacante"
                    }  
                ],
                frontend: [
                    {
                        nome: "Guilherme Marques",
                        linkedin: "in/guilherme-marques-9693ab18a/"
                    },
                    {
                        nome: "João Marcos Lucena",
                        linkedin: "in/joaomarcos11"
                    },
                    {
                        nome: "Péricles Oliveira Júnior",
                        linkedin: "in/pericles-junior-3a68a3152/"
                    }
                ],                 
                analista: [
                    {
                        nome: "Daniel Sorrentino",
                        linkedin: "in/daniel-marques-a5118a18b/"
                    }
                ],
                gerente: [
                    {
                        nome:"Ryan Nóbrega",
                        linkedin: "in/ryantech23"
                    }
                ],
                squadleader: [
                    {
                        nome: "Enoque Belmiro",
                        linkedin: "in/enoquebsf"
                    }
                ]
            }
        })
    }
}
module.exports = new InfoController();
