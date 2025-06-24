import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient();
const collection = await chromaClient.getOrCreateCollection({
  name: "movies",
  embeddingFunction: {
    generate: async (texts) => {
      return texts.map(() => Array(10).fill(Math.random()));
    },
  },
});

const results = await collection.query({ 
  queryTexts: ["A movie about animals"],
  nResults: 5,
});

console.log(results)