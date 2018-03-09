import { printSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { ModelDirective } from '../src';

const baseTypeDefs = `
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

describe('ModelDirective', () => {
  const typeDefs = `
  type Foo @model {
    name: String
  }
  ${baseTypeDefs}
`;

  it('adds id field to type', () => {
      const schema = makeExecutableSchema({
        typeDefs,
        directives: {
          model: ModelDirective,
        } as any,
      });

      const fields = (schema.getType('Foo') as any).getFields();
      expect(fields.id).toBeDefined();
  });
});
