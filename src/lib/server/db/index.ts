import { kv } from '@vercel/kv';

export async function getData(): Promise<{ industries: any[], valves: any[] }> {
  // During local development without KV configured, return empty arrays
  if (!process.env.KV_REST_API_URL) {
    return { industries: [], valves: [] };
  }

  try {
    const data = await kv.get<{ industries: any[], valves: any[] }>('seyon_data');
    if (data) {
      return data;
    }
  } catch (e) {
    console.error("Failed to read from KV:", e);
  }
  
  // If no data exists yet, initialize it empty
  const initialData = { industries: [], valves: [] };
  await saveData(initialData);
  return initialData;
}

export async function saveData(data: any) {
  if (!process.env.KV_REST_API_URL) {
    return;
  }
  
  try {
    await kv.set('seyon_data', data);
  } catch (e) {
    console.error("Failed to write to KV:", e);
    throw e;
  }
}
