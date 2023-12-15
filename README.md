# Front-end Rachai

Bem-vindo ao repositório do Front-end da plataforma Rachai! Este repositório abriga o código-fonte e os recursos relacionados à interface do usuário da plataforma Rachai, onde tornamos mais fácil a conexão entre aqueles que podem dar carona e os que precisam de carona.

## Sobre a Plataforma Rachai

O "Rachai" é uma plataforma de caronas criada por estudantes para resolver problemas de transporte na faculdade, tornando o acesso ao campus mais fácil através de um aplicativo e plataforma web intuitivos. A equipe está trabalhando em entrevistas, desenvolvimento de software, integração de dados, interfaces amigáveis, feedback dos usuários e custos para garantir o sucesso e manutenção do sistema.

## Tecnologias Utilizadas

- Linguagem de Programação: TypeScript
- Framework: Next.js
- Estilização: CSS Modules
- Padronização de Código: EsLint
  
## Como rodar e utilizar a plataforma

Se você deseja rodar o projeto localmente na sua máquina, rode esse docker-compose.yaml:
```
version: "3"
services:
  backend:
    image: kevinmamar/rachaibackend:latest
    ports:
      - 8080:8080
  frontend:
    image: kevinmamar/rachaifrontend:latest
    ports:
      - 3000:3000
    links:
      - backend

networks:
  rachai_network:
    driver: bridge
```

## Colaboradores

- [Allan Santos - Dev Back-end](https://github.com/AllanSantos-DV)
- [Lucas Christian - Dev Front-end](https://github.com/Lucas-Christian)

Agradecemos por ser parte da comunidade Rachai e por contribuir para a construção de projetos de jogos emocionantes!

---

© 2023 Rachai. Todos os direitos reservados.