export default async function useScraperAPI(url) {
  try {
    console.log("scraping recipe from: ", url);
    let req = await fetch(
      `https://recipe-parser.azurewebsites.net/api/parse?url=${encodeURI(url)}`
    );
    if (req.status !== 200) throw `ERROR scraping recipe from: ${url}`;
    let res = await req.json();
    console.log({ res });
    return res;
  } catch (err) {
    console.error(err);
  }
}
