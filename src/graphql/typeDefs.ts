import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: String!
    name: String
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
    moneyMovements: [MoneyMovement!]!
  }

  type MoneyMovement {
    id: String!
    userId: String
    amount: Float!
    concept: String!
    date: String!
    createdAt: String!
    updatedAt: String!
    user: User
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    moneyMovements(
      email: String
      startDate: String # Filtro de fecha de inicio
      endDate: String # Filtro de fecha de fin
      limit: Int # Limitar el número de registros
      offset: Int # Paginación por desplazamiento
    ): [MoneyMovement!]!
    moneyMovement(id: String!): MoneyMovement
  }

  type Mutation {
    updateUser(id: String!, name: String, role: String): User!
    deleteUser(id: String!): Boolean

    createMoneyMovement(
      amount: Float!
      concept: String!
      date: String
    ): MoneyMovement!

    updateMoneyMovement(
      id: String!
      amount: Float
      concept: String
      date: String
    ): MoneyMovement!

    deleteMoneyMovement(id: String!): Boolean!
  }
`;
