# Documentação

### 📋 Descrição

Documentação de rotas dos controllers para integração entre back-end e front-end.
Falta conferir alguns exemplos de json

<br>

### 📜 PATH's


<br>

### /info

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
|   /  |  GET  | Index  |     Não     |


<br>

### /session

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
|   /session   |  POST  | Store  |     Não     |

<br>

```json
Body do POST e PUT

{
	"email": "Unipe@gmail.com",
	"senha": "unipeadminmaster"
}
```

<br>

### /usuario

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
|   /usuario   |  POST  | Store  |     Não     |
|   /cadastro-admin   |  POST  | Store  |     Sim     |
|   /usuario   |  GET   | Index  |     Sim     |
| /usuario/:id |  GET   |  Show  |     Sim     |
| /usuario/:id |  PUT   | Update |     Sim     |
| /usuarioadmin|  GET   | Index |     Sim     |
| /usuarioativado |  GET   | Index |     Sim     |
| /usuariodesativado |  GET   | Index |     Sim     |
<br>

```json
Body do POST e PUT

{
    "nome": "azul",
    "cpf": "12345678900",
    "email": "algum@caju.com",
    "senha": "alguma ai",
    "data_inicio": "10/04/2002",
    "matricula": "12345678",
    "periodo": 3,
    "genero_id": 1,

    "num_obrigatorio": "999999999",
    "num_opcional": "99999999",

    "rua": "rua das flores",
    "numero": "820",
    "bairro": "sla",
    "cidade": "alguma ai",
    "cep": "373228753",
    "complemento": "blablabla",
    "uf_id": 1
}
```

<br>

### /endereço

|    PATH    | Verbo HTTP | Método |  Autenticada |
| :--------: | :--------: | :----: |  :---------: |
| /endereco | GET    | Index  |        Sim     |
| /endereco/:id | PUT  | Update  |        Sim     |
| /endereco/:id | GET    | Show  |        Sim     |

<btelr>

```json
Body do POST e PUT

{
	"rua": "Enoque Tá Castigando Nois",
	"numero": "505",
	"bairro": "Inferninho",
	"cidade": "Submundo",
	"cep": "15975346685",
	"complemento": "Toca",
	"uf_id": 20
}
```

<br>

### /estadocivil

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /estadocivil |  POST  | Store  |     Sim     |
| /estadocivil | GET    | Index  |     Sim     |
| /estadocivil/:id | PUT  | Update  |     Sim     |

<br>

```json
Body do POST e PUT
{
    "estado_civil": "Solteiro(a)"
}
```

<br>

### /genero

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /genero |  POST  | Store  |     Sim     |
| /genero | GET    | Index  |     Sim     |
| /genero/:id | PUT    | Update  |     Sim     |

<br>

```json
Body do POST e PUT
{
	"nome": "Feminino"
}
```

<br>

### /registro

|    PATH    | Verbo HTTP | Método   | Autenticada |
| :--------: | :--------: | :----: |  :---------: |
| /registro |  POST  | Store  |     Sim     |
| /registro | GET    | Index  |      Sim     |
| /registro/:id | PUT  | Update  |     Sim     |
| /registro/:id | GET    | Show  |     Sim     |

<br>

```json
Body do POST e PUT
{
    "rua": "Enoque Tá Castigando Nois",
    "numero": "505",
    "bairro": "Inferninho",
    "cidade": "Submundo",
    "cep": "15975346685",
    "complemento": "Toca",
    "uf_id": 1,

    "num_obrigatorio": "12345678",
    "num_opcional": "",

    "nome": "Trem da Aaalegria",
    "rg": "",
    "cpf": "88888088",
    "email": "xxxx@gmail.com",
    "genero_id": 1,
    "estado_civil_id": 1,

    "historico": "O Uber me deixou no lugar errado",
    "observacoes": "Eu pensei que a mulher dele fosse a mãe",
    "data": "03/10/2020",
    "tiposcausa": 9
}
```

<br>

### /telefone

|    PATH    | Verbo HTTP | Método |  Autenticada |
| :--------: | :--------: | :----: |  :---------: |
| /telefone | GET    | Index  |       Sim     |
| /telefone/:id | GET    | Show  |       Sim     |

<br>

```json
Body do POST e PUT
{
    "num_obrigatorio": "12345678",
    "num_opcional": ""
}
```

<br>

### /tipocausa

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /tipocausa |  POST  | Store  |     Sim     |
| /tipocausa | GET    | Index  |     Sim     |
| /tipocausa/:id | PUT    | Update  |     Sim     |

<br>

```json
Body do POST e PUT
{
    "nome": "Outras",
    "classe_causa_id": 6
}
```

<br>

### /uf

|    PATH    | Verbo HTTP | Método |  Autenticada |
| :--------: | :--------: | :----: |  :---------: |
| /uf |  POST  | Store  |      Sim       |
| /uf | GET    | Index  |      Sim       |

<br>

```json
Body do POST e PUT

{
	"estado": "Tocantins",
	"sigla": "TO"
}
```

<br>

### /classecausa

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
|   /classecausa   |  POST  | Store  |    Sim     |
|   /classecausa   |  GET   | Index  |   Sim     |
|   /classecausa/:id   |  PUT   | Update  |   Sim     |

<br>

```json
Body do POST e PUT

{
	"nome": "Guarda"
}
```

<br>

### /constituinte

|    PATH    | Verbo HTTP | Método |  Autenticada |
| :--------: | :--------: | :----: |  :---------: |
| /constituinte | GET    | Index  |        Sim     |
| /constituinte/:id | PUT  | Update  |      Sim     |
| /constituinte/:id | GET    | Show  |      Sim     |

<br>

```json
Body do POST e PUT

{
    "nome": "Moço Bunito",
    "rg": "000000",
    "cpf": "00000000",
    "email": "moçobonito@maravilha.com",
    "genero_id": 2,
    "estado_civil_id": 5,
    "endereco_id": 4,
    "telefone_id": 13
}
```

<br>


### /pdf

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /pdf/:id |  POST  | -  |     Sim     |

<br>

```json
Body do GET

{
    "receptor_nome": "Resolverdor das paradas",
    "receptor_email": "iankofcr@gmail.com"
}
```

<br>

### /tipocausaregistro

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /tipocausaregistro |  POST  | Store  |     Sim     |

<br>

```json
Body do POST e PUT

{
	"tipo_causa_id": 1,
	"registro_id": 1
}
```

<br>

### /reset

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /reset |  POST  | Store  |     Não     |
| /reset/token/:token |  Patch  | Update  |     Não     |

<br>

```json
Body do POST

{
    "email": "cigerza@gmail.com"
}

Body do PUT

{
    "senha": "password"
}
```

<br>

### /primeiroacesso

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /primeiroacesso |  POST  | Store  |     Não     |
| /primeiroacesso |  GET  | Index  |     Não     |

<br>

OBS.: Essa rota não tem body, os dados do banco estão no código

<br>

### /status

|    PATH    | Verbo HTTP | Método | Autenticada |
| :--------: | :--------: | :----: | :---------: |
| /statususuario/:id |  Patch  | Update  |     Sim     |
| /adminusuario/:id |  Patch  | Update  |     Sim     |
| /statusregistro/:id |  Patch  | Update  |     Sim     |

<br>

OBS.: Essa rota não tem body, os dados do banco estão no código

<br>
