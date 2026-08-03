import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

function findSvelteFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findSvelteFiles(filePath, fileList);
    } else if (filePath.endsWith('.svelte')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { search, replace } = await request.json();
    if (!search || !replace) {
      return json({ success: false, error: 'Missing search or replace string' }, { status: 400 });
    }

    const srcDir = path.resolve('src');
    const svelteFiles = findSvelteFiles(srcDir);
    let matchFound = false;

    for (const file of svelteFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(search)) {
        const newContent = content.split(search).join(replace);
        fs.writeFileSync(file, newContent, 'utf-8');
        matchFound = true;
      }
    }

    if (matchFound) {
      return json({ success: true });
    } else {
      return json({ success: false, error: 'Text not found in any source file' });
    }
  } catch (err: any) {
    console.error(err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
