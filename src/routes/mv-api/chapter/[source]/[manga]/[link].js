import fetch from "node-fetch";
import cheerio from "cheerio";

export async function get({ params }) {
  let { manga, link, source } = params;
  link = link.replace(/,/g, '/');
  let resData = {
    title: '',
    images: []
  };

  const response = await fetch(link);
  const html = await response.text();

  const $ = cheerio.load(html);

  // ................................... idkmanga archi .......................................//
  if (source === 'idkmanga') {
    // Title
    resData.title = $('.entry-title').text();
  
    // Images
    if (manga === 'One-Punch-Man' || manga === 'Boruto' || manga === 'Jujutsu-Kaisen') {
      $('.entry-content')
        .children('p')
        .each((i, image) => {
          if ($(image).children('img').attr('src') !== undefined) {
            //
            if ($(image).children('noscript').text() !== '') {
              const url = $(image).children('noscript').text().split('"')[1];
              resData.images.push(url);
            } else {
              const url = $(image).children('img').attr('src');
              resData.images.push(url);
            }
          }
        });
    } else if (manga === 'One-Piece' || manga === 'Dr.-Stone' || manga === 'Tokyo-Ghoul') {
      $('.lazy').each((i, image) => {
        const url = $(image).attr('src');
        resData.images.push(url);
      });
    }
  }
  // ....................................... mangabat archi .....................................//
  else if (source === 'mangabat') {
    //Title
    resData.title = $('.panel-chapter-info-top').children('h1').text();
  }
  return {
    body: resData
  }
}
