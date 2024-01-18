import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:3000/graphql',
	documents: ['src/**/*.{ts,tsx}'],
	generates: {
		'./src/__generated__/': {
			preset: 'client',
			plugins: ['typescript'],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
