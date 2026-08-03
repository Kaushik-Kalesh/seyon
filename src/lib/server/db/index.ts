import { Redis } from '@upstash/redis';

// Initialize the Redis client using environment variables
// It automatically picks up UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

export async function getData(): Promise<{ industries: any[], valves: any[] }> {
  // During local development without Redis configured, return empty arrays
  if (!redis) {
    return { industries: [], valves: [] };
  }

  try {
    const data = await redis.get<{ industries: any[], valves: any[] }>('seyon_data');
    if (data) {
      return data;
    }
  } catch (e) {
    console.error("Failed to read from Redis:", e);
  }
  
  // If no data exists yet, initialize it empty
  const initialData = { industries: [], valves: [] };
  await saveData(initialData);
  return initialData;
}

export async function saveData(data: any) {
  if (!redis) {
    return;
  }
  
  try {
    await redis.set('seyon_data', data);
  } catch (e) {
    console.error("Failed to write to Redis:", e);
    throw e;
  }
}
