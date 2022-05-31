import { GraphQLClient, gql } from 'graphql-request'

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql'

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
})

export const listFood = (color) => {
  console.log({color});
  const query = gql`
    query Food($size: Int) {
      food(_size: $size) {
        data {
          _id
          _ts
          name
          color
          photoUrl
          createdAt
        }
      }
    }
  `

  return graphQLClient
    .request(query, { size: 999 })
    .then(({ food: { data } }) => data)
}

export const createFood = (food) => {
  const mutation = gql`
    mutation CreateFood($input: FoodInput!) {
      createFood(data: $input) {
        _id
        _ts
        name
        color
        photoUrl
        createdAt
      }
    }
  `

  return graphQLClient.request(mutation, { input: food })
}


