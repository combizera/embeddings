import fs from "fs";
import csv from "csv-parser";
import { ChromaClient } from "chromadb";

const client = new ChromaClient();

const collection = await client.getOrCreateCollection({
  name: "movies",
});

const ids = [];
const documents = [];
const metadatas = [];

fs.createReadStream("mpst_full_data.csv")
.pipe(csv())
.on('data', (row) => {
  const document = { "title": row["title"], "tags": row["tags"], "synopsis": row["synopsis"]}

  ids.push(row["imdb_id"]);
  documents.push(JSON.stringify(document));
  metadatas.push(document)
})
.on('end', async () => {
  let startIndex = 0;
  while(startIndex < ids.length) {
    let endIndex = startIndex + 500;

    console.log(`Adding documents from: ${startIndex} to: ${endIndex}`);

    await collection.add({
      ids: ids.slice(startIndex, endIndex),
      documents: documents.slice(startIndex, endIndex),
      metadatas: metadatas.slice(startIndex, endIndex),
    });
    startIndex = endIndex;
  }

  console.log("Done!");
})
