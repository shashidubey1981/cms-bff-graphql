/**
 * Contentstack Configuration
 * This file contains the configuration for Contentstack SDK
 */

import contentstack from '@contentstack/delivery-sdk';

// Validate environment variables
const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
const regionEnv = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error(
    'Missing required Contentstack environment variables. Please check your .env.local file.'
  );
}

// Initialize Contentstack SDK
// Note: Region is optional and will default to 'us' if not provided
export const contentstackClient = contentstack.stack({
  apiKey,
  deliveryToken,
  environment,
  ...(regionEnv && { region: regionEnv as any }),
});

// Export configuration for GraphQL
export const contentstackConfig = {
  apiKey,
  deliveryToken,
  environment,
  region: regionEnv || 'us',
  graphqlUrl: `${process.env.NEXT_PUBLIC_CONTENTSTACK_GRAPHQL_URL}/${apiKey}?environment=${environment}`,
};

