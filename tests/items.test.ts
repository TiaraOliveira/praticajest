import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/database';


describe('Testa POST /items ', () => {
  const user = {
    title: 'Titulo legal',
    url: 'https://mail.google.com/mail/u/0/#inbox/FMfcgzGqQckJBFVXjCVJsjJldlMFsRQd',
    description: 'aoooooooooooooo ca,bado doida',
    amount: 10
    
  };

  
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
     await prisma.items.create({ data: user })
    const result = await supertest(app).post(`/items`).send(user);
    expect(result.status).toBe(201);
  
    
  });

  it('Deve retornar status 409 caso já exista um item com referente titulo', async () => {
    await supertest(app).post(`/items`).send(user);
    const result = await supertest(app).post(`/items`).send(user);

    expect(result.status).toBe(409);
  });
});

describe('Testa GET /items ', () => {
  it.todo('Deve retornar status 200 e o body no formato de Array');
});

describe('Testa GET /items/:id ', () => {
  it.todo('Deve retornar status 200 e um objeto igual a o item cadastrado');
  it.todo('Deve retornar status 404 caso não exista um item com esse id');
});
