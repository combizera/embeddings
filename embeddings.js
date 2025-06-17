import { pipeline, cos_sim } from '@xenova/transformers';

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

async function embedText(text) {
  return embedder(text, { pooling: "mean", normalize: true }).then(tensor => tensor.tolist()[0]);
}

console.log(cos_sim(await embedText("Hello"), await embedText("Hi")));
console.log('---')
console.log(cos_sim(await embedText("King"), await embedText("Queen")));
console.log(cos_sim(await embedText("King"), await embedText("Woman")));
console.log(cos_sim(await embedText("King"), await embedText("Men")));