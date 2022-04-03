const testSites = [
  "https://www.seriouseats.com/reverse-seared-pork-shoulder-chashu-recipe",
];

async function scrapeRecipe(url = "") {
  if (!url || !url.length) return null;

  try {
    console.log(url);
    let page = await getPage(url);

    console.log(page.replace(/(\n+\s+)/g, ""));

    let shadow = document.createElement("div");
    shadow.innerHTML = page;
    let content = shadow.textContent.replace(/(\n+\s+)/g, "");

    console.log({ content });
  } catch (err) {
    console.error(err);
  }
}

function getPage(url) {
  return fetch(url).then((res) => res.text());
  // return new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("GET", `${url}`);

  //   xhr.onload = function () {
  //     resolve(xhr.responseText);
  //   };
  //   xhr.onerror = () => reject(xhr.statusText);
  //   xhr.send();
  // });
}

export default scrapeRecipe;
