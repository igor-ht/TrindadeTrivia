/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery GetAllCategories {\n\t\tcategories {\n\t\t\tid\n\t\t\tname\n\t\t\tquestions {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.GetAllCategoriesDocument,
    "\n\tquery GetCurrentQuestion($categoryId: ID!, $questionId: ID!) {\n\t\tcategory(id: $categoryId) {\n\t\t\tid\n\t\t\tname\n\t\t\tquestion (id: $questionId) {\n\t\t\t\tid\n\t\t\t\tquestion\n\t\t\t\tanswers\n\t\t\t}\n\t\t}\n\t}\n": types.GetCurrentQuestionDocument,
    "\n\tquery GetAllQuestionsFromCategory($id: ID!) {\n\t\tcategory(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tquestions {\n\t\t\t\tid\n\t\t\t\tquestion\n\t\t\t\tanswers\n\t\t\t}\n\t\t}\n\t}\n": types.GetAllQuestionsFromCategoryDocument,
    "\n\tquery GetCorrectAnswer($categoryId: ID!, $questionId: ID!) {\n\t\tcategory(id: $categoryId) {\n\t\t\tid\n\t\t\tquestion(id: $questionId) {\n\t\t\t\tid\n\t\t\t\tcorrectAnswer\n\t\t\t}\n\t\t}\n\t}\n": types.GetCorrectAnswerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetAllCategories {\n\t\tcategories {\n\t\t\tid\n\t\t\tname\n\t\t\tquestions {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAllCategories {\n\t\tcategories {\n\t\t\tid\n\t\t\tname\n\t\t\tquestions {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCurrentQuestion($categoryId: ID!, $questionId: ID!) {\n\t\tcategory(id: $categoryId) {\n\t\t\tid\n\t\t\tname\n\t\t\tquestion (id: $questionId) {\n\t\t\t\tid\n\t\t\t\tquestion\n\t\t\t\tanswers\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCurrentQuestion($categoryId: ID!, $questionId: ID!) {\n\t\tcategory(id: $categoryId) {\n\t\t\tid\n\t\t\tname\n\t\t\tquestion (id: $questionId) {\n\t\t\t\tid\n\t\t\t\tquestion\n\t\t\t\tanswers\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetAllQuestionsFromCategory($id: ID!) {\n\t\tcategory(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tquestions {\n\t\t\t\tid\n\t\t\t\tquestion\n\t\t\t\tanswers\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAllQuestionsFromCategory($id: ID!) {\n\t\tcategory(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tquestions {\n\t\t\t\tid\n\t\t\t\tquestion\n\t\t\t\tanswers\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCorrectAnswer($categoryId: ID!, $questionId: ID!) {\n\t\tcategory(id: $categoryId) {\n\t\t\tid\n\t\t\tquestion(id: $questionId) {\n\t\t\t\tid\n\t\t\t\tcorrectAnswer\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCorrectAnswer($categoryId: ID!, $questionId: ID!) {\n\t\tcategory(id: $categoryId) {\n\t\t\tid\n\t\t\tquestion(id: $questionId) {\n\t\t\t\tid\n\t\t\t\tcorrectAnswer\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;