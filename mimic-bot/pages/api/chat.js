import OpenAI from 'openai';
import { getPersonaText } from '@/lib/persona';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { message, history } = req.body;

  const persona = await getPersonaText();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are chatting like someone who texts in this style:\n\n"${persona}"\n\nGive the same responses as the style unless out of context. Don’t sound like a chatbot.`,
      },
      ...history,
      { role: 'user', content: message },
    ],
  });

  res.status(200).json({ response: completion.choices[0].message.content });
}
