import fs from 'fs/promises';
import path from 'path';

export async function getPersonaText(limit = 200) {
  const filePath = path.resolve('data/messages.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(raw);

  const messages = data
    .filter(msg => msg.is_from_me === 0 && msg.text?.trim()) // only style messages
    .map(msg => msg.text.trim());

  // Take most recent (or all if fewer than limit)
  const lastMessages = messages.slice(-limit);

  return lastMessages.join('\n');
}
