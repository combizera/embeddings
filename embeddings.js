import { pipeline, cos_sim } from '@xenova/transformers';

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

async function embedText(text) {
  return embedder(text, { pooling: "mean", normalize: true }).then(tensor => tensor.tolist()[0]);
}

console.log('Test Text')
console.log(cos_sim(await embedText("Hello"), await embedText("Hi")));
console.log('---')
console.log(cos_sim(await embedText("King"), await embedText("Queen")));
console.log(cos_sim(await embedText("King"), await embedText("Woman")));
console.log(cos_sim(await embedText("King"), await embedText("Men")));
console.log('---')

const imgEmbedder = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch32", { dtype: "q8" })

async function embedImg(img) {
  return imgEmbedder(img, { pooling: "cls", normalize: true }).then(tensor => tensor.tolist()[0])
};

const babyHippo = "https://s.yimg.com/ny/api/res/1.2/PFMC1CtDJbLk2Iu5Mqcmuw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04MjU-/https://media.zenfs.com/en/pethelpful_915/0da3b4aac5c371a5a94ca15021cb570d";
const babyHippo2 = "https://i.natgeofe.com/n/74c229e3-4ff7-49d5-bcfd-75e0033816f0/NationalGeographic_1148167.jpg";
const oldCat = "https://images.squarespace-cdn.com/content/v1/5aa0bf73af2096458586fb17/8018d2d4-81f9-4679-883a-c12e1ce12421/old-tabby-cat-sitting-couch.jpg"


console.log('Test Image')
console.log(cos_sim(await embedImg(babyHippo), await embedImg(babyHippo2)))
console.log('---')
console.log('Comparando Gato com Hipo')
console.log(cos_sim(await embedImg(babyHippo), await embedImg(oldCat)))
console.log('---')