/**
 * Contentstack GraphQL Client
 * This file provides utilities for making GraphQL queries to Contentstack
 */

import {GraphQLClient} from 'graphql-request';
import {contentstackConfig} from './contentstack';

// Create GraphQL client instance
export const graphqlClient = new GraphQLClient(contentstackConfig.graphqlUrl, {
    headers: {
        access_token: contentstackConfig.deliveryToken,
    },
});

/**
 * Execute a GraphQL query
 * @param query - GraphQL query string
 * @param variables - Optional variables for the query
 * @returns Promise with the query result
 */
export async function executeQuery<T = any>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {
    try {
        const data = await graphqlClient.request<T>(query, variables);
        return data;
    } catch (error) {
        console.error('GraphQL Query Error:', error);
        throw error;
    }
}

/**
 * Helper function to create a query for fetching all entries of a content type
 * @param contentType - The content type UID (e.g., 'blog_post', 'page')
 * @param fields - Optional array of fields to fetch
 * @returns GraphQL query string
 */
export function createGetAllEntriesQuery(
    contentTypeUid: string,
    locale: string,
    variants: string[],
    fields: string[] = ['title', 'url', 'uid', '_content_type_uid']
): string {
    const fieldsString = fields.join('\n        ');
    return `
    query GetAllEntries($limit: Int, $skip: Int) {
      all_${contentTypeUid}(limit: $limit, skip: $skip) {
        items {
          ${fieldsString}
        }
      }
    }
  `;
}

export function createGetPersonalizedConfigQuery(): string {
    return `query MyQuery {
  all_personalize_config {
    items {
      title
      taxonomy_path
      audiences {
        group {
          name
          attributes {
            key
            value
          }
        }
      }
      system {
        uid
      }
    }
  }
}
`;
}

