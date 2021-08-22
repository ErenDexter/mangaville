const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

const mv = express();
const port = 5000;

mv.use(cors());
mv.use(express.json());

/*const MANGA_TYPE_1 = [
  "ONE PUNCH MAN",
  "TOKYO GHOUL",
  "ONE PIECE",
  "JUJUTSU KAISEN",
  "BORUTO",
  "DR. STONE",
]; */

//

// Fetch A Manga with All The Chapters' Name & Link

//

mv.get('/manga/:source/:manga/:link', (req, res) => {
	console.log(`hello from the other side -> ${new Date()} `);
	const { link, source } = req.params;
	const newLink = link.replace(/,/g, '/');
	let resData = {
		title: '',
		chapters: []
	};
	fetch(newLink)
		.then((response) => {
			console.log('body', response.body);
			console.log('headers', response.headers);
			console.log('status', response.status);
			console.log('statusText', response.statusText);
			return response.text();
		})
		.then((html) => {
			const $ = cheerio.load(html);
			if (source === 'idkmanga') {
				resData.title = $('.entry-title').text();
				$('#Chapters_List')
					.children('ul')
					.children('li')
					.children('ul')
					.children('li')
					.each((i, chapter) => {
						const arr = $(chapter).children('a').text().split(' ');
						const data = {
							chapterName: $(chapter).children('a').text(),
							chapterLink: $(chapter).children('a').attr('href'),
							chapterId: arr.includes('Chapter')
								? arr[arr.indexOf('Chapter') + 1]
								: arr.includes('Redraw')
								? arr[arr.indexOf('Redraw') + 1]
								: arr.includes('Number')
								? arr[arr.indexOf('Number') + 1]
								: arr[arr.indexOf('CHAPTER') + 1]
						};
						resData.chapters.push(data);
					});
			}

			res.status(200).json(resData);
		})
		.catch((error) => {
			console.log('error', error);
			res.status(200).json({ wasif: 'putki' });
		});

	// request(newLink, (err, response, html) => {
	//   console.log("error", err);
	//   console.log("response", response.statusCode);
	//   console.log("newLink", newLink);
	//   if (!err && response.statusCode === 200) {
	//     console.log("yayy no error");
	//     const $ = cheerio.load(html);
	//     // ................................... idkmanga archi .......................................//
	//     if (source === "idkmanga") {
	//       // Title
	//       resData.title = $(".entry-title").text();

	//       // Chapters
	//       $("#Chapters_List")
	//         .children("ul")
	//         .children("li")
	//         .children("ul")
	//         .children("li")
	//         .each((i, chapter) => {
	//           const arr = $(chapter).children("a").text().split(" ");
	//           const data = {
	//             chapterName: $(chapter).children("a").text(),
	//             chapterLink: $(chapter).children("a").attr("href"),
	//             chapterId: arr.includes("Chapter")
	//               ? arr[arr.indexOf("Chapter") + 1]
	//               : arr.includes("Redraw")
	//               ? arr[arr.indexOf("Redraw") + 1]
	//               : arr.includes("Number")
	//               ? arr[arr.indexOf("Number") + 1]
	//               : arr[arr.indexOf("CHAPTER") + 1],
	//           };

	//           resData.chapters.push(data);
	//         });
	//     }

	//     res.status(200).json(resData);
	//     //
	//   } else {
	//     res.status(response.statusCode).send(err);
	//   }
	// });
});

//

// Fetch An Individual Chpater

//

//const CHAPTER_TYPE_1 = ["ONE PUNCH MAN", "BORUTO", "JUJUTSU KAISEN"];

mv.get('/chapter/:source/:manga/:link', (req, res) => {
	const { manga, link, source } = req.params;
	const chapterLink = link.replace(/,/g, '/');
	let resData = {
		title: '',
		images: []
	};

	request(chapterLink, (err, response, html) => {
		if (!err && response.statusCode == 200) {
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
			res.status(200).json(resData);
		} else {
			res.status(404).send(err);
		}
	});
});

//

//

//

mv.listen(process.env.PORT || port, () => {
	console.log(`MV is listening at http://localhost:${port}`);
});
