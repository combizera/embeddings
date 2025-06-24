import { ChromaClient } from "chromadb";

const client = new ChromaClient();

const collection = await client.getOrCreateCollection({
  name: "test",
  embeddingFunction: {
    generate: async (texts) => {
      return texts.map(() => Array(10).fill(Math.random())); // vetores aleatórios de tamanho 10
    },
  },
});

await collection.add({
  ids: ["1", "2", "3"],
  documents: ["olá mundo", "oi", "bão?"],
  metadatas: [
    {
      "title": "my movie"
    },
    {
      "nome": "Ygor"
    },
    { "placeholder": true }
  ]
});

console.log("Documento adicionado!");
