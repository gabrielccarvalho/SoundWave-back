# Requisitos do app:

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de pesquisa;
- [ ] Deve ser possível o usuário realizar uma busca de um vídeo;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário free não pode fazer mais de 3 buscas no mesmo dia;
- [ ] O usuário free deverá ter seus tokens de busca 'recarregados' ao final de cada dia.

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
