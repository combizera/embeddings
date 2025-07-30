import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient({
  host: "localhost",
  port: 8010,
  ssl: false,
});


const collection = await chromaClient.getOrCreateCollection({
  name: "movies",
});

console.log(await collection.query({ queryTexts: ["A movie about animals"] }));
