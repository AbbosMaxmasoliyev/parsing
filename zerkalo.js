const fs = require("fs/promises")
const puppeteer = require('puppeteer');


const links = [
    "/sect/240/good/zerkalo_high_style_lux/",
    "/sect/240/good/zerkalo_high_tech/",
    "/sect/239/good/zerkalo_baron_lyuks/",
    "/sect/240/good/mirror_liverpool_lux/",
    "/sect/240/good/mirror_prezident/",
    "/sect/240/good/mirror_prezident_silver/",
    "/sect/240/good/mirror_veneciya/",
    "/sect/240/good/mirror_imperator/",
    "/sect/240/good/zerkalo_ampir/",
    "/sect/240/good/zerkalo_leo/",
    "/sect/240/good/zerkalo_leo_ii/",
    "/sect/240/good/mirror_imperator_gold/",
    "/sect/240/good/zerkalo_renessans_azhurnoe/",
    "/sect/240/good/zerkalo_imperator_lyuks/",
    "/sect/240/good/zerkalo_renessans_gold_/",
    "/sect/240/good/zerkalo_renessans_granzh_azhurnoe/",
    "/sect/240/good/zerkalo_renessans_gold_azhurnoe/",
    "/sect/240/good/zerkalo_renessans_granzh_/",
    "/sect/240/good/zerkalo_drakon_granzh/",
    "/sect/240/good/zerkalo_drakon/",
    "/sect/240/good/zerkalo_kvadratnoe_baget_vinchentso/",
    "/sect/240/good/zerkalo_kvadratnoe_baget_fodzhi/",
    "/sect/240/good/zerkalo_kvadratnoe_baget_toskana/",
    "/sect/240/good/zerkalo_pryamougolnoe_baget_vinchentso/",
    "/sect/240/good/zerkalo_pryamougolnoe_baget_fodzhi/",
    "/sect/240/good/zerkalo_pryamougolnoe_baget_toskana/"
]

let bigArray = []

let index = 0



const download = () => {
    let main = document.querySelector(".with-breadcrumbs")
    var data = {}
    let len = window.location.pathname.split("/").length
    data["name"] = main.children[2].textContent.replace("Коллекция ", "")
    if (main.children[5].children.thumbnails) {

        data["images"] = Array.from(main.children[5].children.thumbnails.children[0].children).map(item => item.children[0].attributes.rel.textContent.split("/")[4])
    }
    if (document.querySelector(".zoom")) {
        data["images"] = [document.querySelector(".zoom").children[0].href.split("/")[6]]

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
        data["description"] = description.innerText
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
    }
    if (document.querySelector(".click-color-sukno") || document.querySelector(".click-color-table")) {

        let paragraphs = document.querySelectorAll("#tab-color p span ")
        let setVkraskiUl = document.querySelectorAll("#tab-color ul")
        data["coloursMaterial"] = Array.from(setVkraskiUl).map((item, index) => {
            return {
                name: paragraphs[index].innerText,
                item: Array.from(item.children).map(item => {
                    if (item.children[0].attributes.class.nodeValue.includes("click-color-table")) {
                        return {
                            image: item.children[0].attributes.href.nodeValue.split("/").pop(),
                            nodeValueRel: item.children[0].attributes.href.nodeValue.split("/").pop(),
                            type: "table",
                        }
                    } else if (item.children[0].attributes.class.nodeValue.includes("click-color-sukno")) {
                        return {
                            image: item.children[0].attributes.href.nodeValue.split("/").pop(),
                            nodeValueRel: item.children[0].attributes.href.nodeValue.split("/").pop(),
                            type: "sukno",
                        }
                    }
                })
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
}


let fileName = "zerkalo.json"

async function purpeter(index) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.fabrika-start.ru/catalog${links[index]}`, { timeout: 600000 });

    await page.evaluate(download).then(data => {
        bigArray.push(data)

        fs.writeFile(fileName, JSON.stringify(bigArray), (err) => {
            if (err) throw err;
            console.log('Data has been written to output.json');
        });
        if (bigArray[0]) {
            console.log("ishlayapti");
        }
    }).catch(err => {
        if (err) {
            fs.writeFile(fileName, JSON.stringify(bigArray), (err) => {
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
        console.log(links[index], `Index=> ${index}/${links.length}, Percent=> ${index / links.length}%; `);
        await purpeter(index).catch(err => {
            if (err) {
                fs.writeFile(fileName, JSON.stringify(bigArray), (err) => {
                    if (err) throw err;
                    console.log('Data has been written to output.json');
                });
            }
        })

        index++

        Run()
    } else {
        fs.writeFile(fileName, JSON.stringify(bigArray), (err) => {
            if (err) throw err;
            console.log('Data has been written to output.json');
        });
    }







}

(async () => {
    await Run()
    fs.writeFile(fileName, JSON.stringify(bigArray), (err) => {
        if (err) throw err;
        console.log('Data has been written to output.json');
    });
})()

