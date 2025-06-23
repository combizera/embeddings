import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { cos_sim } from '@xenova/transformers';

const genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

async function embedWithGoogle(text) {
  return genai.models.embedContent({
    model: "models/text-embedding-004",
    contents: [text]
  }).then(r => r.embeddings[0].values);
}

console.log(cos_sim(await embedWithGoogle("Olá, tudo bem?"), await embedWithGoogle("Olá, tudo sim")));
console.log(cos_sim(await embedWithGoogle("Olá, tudo bem?"), await embedWithGoogle("Olá, me chamo Ygor")));
