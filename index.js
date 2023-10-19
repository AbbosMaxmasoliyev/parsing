const fs = require("fs/promises")
const puppeteer = require('puppeteer');
const links = require("./array")
const productJson = require("./output.json")

let DATE = new Date();
var OldMin = DATE.getMinutes();

let bigArray = []

let index = 0





async function purpeter(index) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.fabrika-start.ru/catalog${links[index]}`, { timeout: 600000 });

    await page.evaluate(() => {
        let main = document.querySelector(".with-breadcrumbs")
        var data = {}
        let len = window.location.pathname.split("/").length
        data["name"] = main.children[2].textContent.replace("Коллекция ", "")
        if (main.children[5].children.thumbnails) {

            data["images"] = Array.from(main.children[5].children.thumbnails.children[0].children).map(item => item.children[0].attributes.rel.textContent.split("/")[4])
        } else {
            data["images"] = Array.from(document.querySelector(".zoom").children[0].href.split("/")[6])

        }
        if (main.children[6].children[1].children[0]?.children) {
            data["sizes"] = Array.from(main.children[6].children[1].children[0].children).map(item => item.textContent.replace("ф", ""))

        }
        if (document.querySelector(".main.float-right.width772 table tr")) {
            data["table"] = Array.from(document.querySelectorAll(".main.float-right.width772 table tr")).map(item => item.textContent.split("\n").filter(item => {
                if (!item.includes("Размер")) {
                    return item
                }
            }).map(item => item.trim())).map(item => {
                if (item[0] == "") {
                    return {
                        type: item[1],
                        size: parseInt(item[2]),
                        material_stol: item[3],
                        plita_type: item[4],
                        ves: item[6],
                        leg: item[5],
                        price: item[10]
                    }
                } else {
                    return item
                }
            })

        }

        if (document.querySelector(".parameters")) {

            let parametres = document.querySelector(".parameters")




            data["parametres"] = Array.from(parametres.children).map((item, index, array) => {
                if (item.tagName == "DT") {
                    return "br"
                } else if (item.tagName == "DD") {
                    return [item.textContent, array[index + 1]?.textContent]
                }
            }).filter(item => item != undefined)
        }

        if (document.getElementById("tab-description")) {
            let description = document.getElementById("tab-description")
            data["description"] = Array.from(description.children[0].children).map(item => item.textContent)
        }



        if (document.getElementById("slider-module-color")) {
            let collection = document.getElementById("slider-module-color")
            data["collection"] = Array.from(collection.children[0].children).map(item => {
                return {
                    "data-sukno": item.children[0].dataset["sukno"].split("/")[4],
                    table: item.children[0].dataset["table"].split("/")[4]

                }
            })
        }


        if (document.querySelector(".set-color-sukno")) {

            let suknoSet = document.querySelectorAll(".set-color-sukno")
            data["sukno-color"] = Array.from(suknoSet).map(item => {
                return {
                    name: item.parentElement.textContent,
                    suknoImage: item.children[0].attributes["src"].nodeValue.split("/")[4]
                }
            })
        } else if (document.querySelector(".click-color-sukno")) {
            let suknoSet = document.querySelectorAll(".click-color-sukno")
            data["sukno-color"] = Array.from(suknoSet).map(item => {
                return {
                    name: item.parentElement.textContent,
                    suknoImage: item.children[0].attributes["src"].nodeValue.split("/")[4]
                }
            })
        }

        if (document.querySelector(".set-color-table")) {
            let setVkraski = document.querySelectorAll(".set-color-table")


            data["vkraski-color"] = Array.from(setVkraski).map(item => {
                return {
                    name: item.parentElement.textContent,
                    vkraskiImage: item.children[0].attributes["src"].nodeValue.split("/")[4]
                }
            })
        }
        if (document.querySelector(".click-color-table")) {
            let setVkraski = document.querySelectorAll(".click-color-table")


            data["vkraski-color"] = Array.from(setVkraski).map(item => {
                return {
                    name: item.parentElement.textContent,
                    vkraskiImage: item.children[0].attributes["src"].nodeValue.split("/")[4]
                }
            })
        }






        if (document.querySelector("table.spec-com")) {
            data["specification"] = {}

            data["specification"]["complectation"] = Array.from(document.querySelector("table.spec-com").children[0].children).map(item => {
                return {
                    info: item.children[0].children[0].src
                }
            })

            data["specification"]["material"] = Array.from(document.querySelector("table.spec-mat").children[0].children).map(item => {
                return {
                    info: item.children[0].children[0].src
                }
            })
        }




        var name = window.location.pathname.split("/")[len - 2]

        return ({
            [name]: data
        })
    }).then(data => {
        bigArray.push(data)
        if (bigArray[0]) {
            console.log("ishlayapti");
        }
    }).catch(err => {
        if (err) {
            fs.writeFile('output.json', JSON.stringify(bigArray), (err) => {
                if (err) throw err;
                console.log('Data has been written to output.json');
            });
        }
    })
    // bigArray.push(format)
    // fs.writeFile('output.json', JSON.stringify(format), (err) => {
    //     if (err) throw err;
    //     console.log('Data has been written to output.json');
    // });
}


async function Run() {

    if (index < links.length) {
        console.log(links[index], `Index=> ${index}`);
        await purpeter(index).catch(err => {
            if (err) {
                fs.writeFile('output.json', JSON.stringify(bigArray), (err) => {
                    if (err) throw err;
                    console.log('Data has been written to output.json');
                });
            }
        })

        index++

        Run()
    }







}

(async() => {
    await Run()
    fs.writeFile('output.json', JSON.stringify(bigArray), (err) => {
        if (err) throw err;
        console.log('Data has been written to output.json');
    });
})()


// (async function () {
//     await Run()
//     fs.writeFile('output.json', JSON.stringify(bigArray), (err) => {
//         if (err) throw err;
//         console.log('Data has been written to output.json');
//     });
// })()

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let numbers = [];

// const askQuestion = async () => {
//     rl.question('Lütfen bir sayı girin (çıkmak için "exit" yazın): ', async (answer) => {
//         if (answer.toLowerCase() === 'exit') {
//             console.log('Giriş işlemi sonlandırıldı.');
//             fs.writeFile('output.json', JSON.stringify(bigArray), (err) => {
//                 if (err) throw err;
//                 console.log('Data has been written to output.json');
//             });
//             rl.close();
//         } else {
//             await Run(answer, bigArray)
//             askQuestion();
//         }
//     });
// };

// askQuestion();


[
    '/sect/178/good/omega/',
    '/sect/178/good/domashniy_lyuk',
    '/sect/180/good/kompakt_layt/',
    '/sect/176/good/baron/',
    '/sect/180/good/kadet_kombi/',
    '/sect/180/good/yunker/',
    '/sect/177/good/renessans_gold/',
    '/sect/177/good/bilyardnyy_stol_leo/',
    '/sect/180/good/domashniy/',
    '/sect/178/good/sibir/',
    '/sect/180/good/kompakt_layt_shpon/', "",
    '/sect/178/good/modern_pro/',
    '/sect/177/good/imperator/',
    '/sect/177/good/liverpul_ekzotik/',
    '/sect/176/good/liverpul/',
    '/sect/176/good/liverpul_eko/',
    '/sect/176/good/versal/',
    '/sect/176/good/high_style/',
    '/sect/180/good/kadet/',
    '/sect/178/good/loft/',
    '/sect/176/good/high_tech/',
    '/sect/176/good/bristol/',
    '/sect/176/good/victory/',
    '/sect/176/good/fusion/',
    '/sect/176/good/techno_/',
    '/sect/176/good/high_style_lux/',
    '/sect/177/good/renessans_granzh_/',
    '/sect/177/good/ampir/',
    '/sect/177/good/drakon_granzh/',
    '/sect/177/good/morskoy/',
    '/sect/177/good/neapol/',
    '/sect/177/good/premer/',
    '/sect/177/good/dragon/',
    '/sect/177/good/renessans/',
    '/sect/177/good/grossmeyster/',
    '/sect/177/good/motsart/',
    '/sect/177/good/leo_ii/',
    '/sect/177/good/imperator_gold/',
    '/sect/177/good/okhota/',
    '/sect/177/good/venetsiya_lyuks/',
    '/sect/177/good/renessans_layt_gold/',
    '/sect/177/good/imperator_lyuks/',
    '/sect/177/good/prezident_silver/',
    '/sect/177/good/veneciya/',
    '/sect/177/good/liverpool_lux/',
    '/sect/177/good/liverpul_krakle/',
    '/sect/177/good/baron_lyuks/',
    '/sect/174/good/chempion_klab/',
    '/sect/174/good/liverpul_praym_snuker/',
    '/sect/174/good/liverpul_klab_praym/',
    '/sect/174/good/prezident/',
    '/sect/174/good/prezident_praym/',
    '/sect/174/good/prezident3/',
    '/sect/174/good/prezident_iii_praym/',
    '/sect/176/good/klassik/',
    '/sect/176/good/arsenal/',
    '/sect/176/good/arsenal_ii/',
    '/sect/176/good/baron_ii/',
    '/sect/176/good/liverpul_iii/',
    '/sect/176/good/oksford/',
    '/sect/176/good/turnirnii2/',
    '/sect/176/good/turnirnii/',
    '/sect/176/good/liverpoolclub/',
    '/sect/176/good/prezident_layt/',
    '/sect/176/good/ricar/',
    '/sect/176/good/worldmasters/',
    '/sect/178/good/loft_shpon/',
    '/sect/178/good/dilerskiy_iii/',
    '/sect/178/good/modernlux/',
    '/sect/178/good/domashniy_lyuks_iii/',
    '/sect/178/good/praga/',
    '/sect/178/good/olimp/',
    '/sect/178/good/olimp_lyuks/',
    '/sect/178/good/gollivud/',
    '/sect/178/good/shervud/',
    '/sect/178/good/elefant/',
    '/sect/180/good/nastolnyy/',
    '/sect/180/good/nastolniy/',
    '/sect/180/good/trainer-2/',
    '/sect/180/good/modern_/',
    '/sect/180/good/virtuoz/'
]