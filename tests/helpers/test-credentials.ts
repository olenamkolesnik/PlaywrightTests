import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// For ES modules: get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Test Credentials Manager
 * Retrieves credentials from environment variables with fallbacks
 */
export const testCredentials = {
  /**
   * Valid test user credentials
   */
  validUser: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD
  }
};

/**
 * Get credentials safely for logging (masks password)
 */
export function getCredentialsForLogging(
  username: string,
  password: string
): string {
  return `username: ${username}, password: ${'*'.repeat(password.length)}`;
}
