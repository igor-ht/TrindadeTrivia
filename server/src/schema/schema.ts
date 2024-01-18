import { mockData } from '../model/data';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';

const QuestionType = new GraphQLObjectType({
	name: 'Question',
	description: 'Question Type',
	fields: {
		id: { type: GraphQLNonNull(GraphQLInt) },
		question: { type: GraphQLNonNull(GraphQLString) },
		answers: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
		correctAnswer: { type: GraphQLNonNull(GraphQLString) },
	},
});

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	description: 'Category type',
	fields: {
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		questions: {
			type: GraphQLNonNull(new GraphQLList(QuestionType)),
			resolve: (parent) => parent.questions,
		},
		question: {
			type: GraphQLNonNull(QuestionType),
			args: { id: { type: GraphQLInt } },
			resolve: (parent, args) => parent.questions.find((question: { id: number }) => question.id === args.id),
		},
	},
});

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: {
		categories: {
			type: GraphQLNonNull(new GraphQLList(CategoryType)),
			description: 'List of all categories',
			resolve: () => mockData,
		},
		category: {
			type: GraphQLNonNull(CategoryType),
			description: 'Category by id',
			args: { id: { type: GraphQLInt } },
			resolve: (parent, args) => mockData.find((category) => category.id === args.id),
		},
	},
});

const schema = new GraphQLSchema({
	query: RootQueryType,
});

export default schema;