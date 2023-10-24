const fs = require("fs/promises")
const puppeteer = require('puppeteer');


const links = [
    "/766/good/NEO_high_style_lux/",
    "/766/good/high_style_neo/",
    "/941/good/10_11_12_futov_temnye/",
    "/941/good/10_11_12_futov_svetlye/",
    "/941/good/6_7_8_9_futov_temnye/",
    "/941/good/6_7_8_9_futov_svetlye/",
    "/745/good/evolution_derevo_6_8_futov/",
    "/745/good/evolution_pvkh_6_8_futov/",
    "/745/good/evolution_derevo_11_12_futov/",
    "/745/good/ekzotik/",
    "/745/good/high_tech_evolution/",
    "/745/good/evolution_pvkh_11_12_futov/",
    "/745/good/Evolution_prezident/",
    "/745/good/svetilnik_prezidentiii_2/",
    "/745/good/evolution_prezident_ekzotik/",
    "/745/good/svetilnik_grossmeyster/",
    "/745/good/okhota_evolution/",
    "/1041/good/loft_6_7_8_9_futov_/",
    "/449/good/startbilliards_6_plafonov_khrom_khrom/",
    "/449/good/startbilliards_6_plafonov_zoloto_khrom/",
    "/449/good/startbilliards_6_plafonov_zelenyy_zoloto/",
    "/449/good/startbilliards_6_plafonov/",
    "/449/good/startbilliards_5_plafonov_khrom_khrom/",
    "/449/good/startbilliards_5_plafonov_zoloto_khrom/",
    "/449/good/startbilliards_5_plafonov_zelenyy_zoloto/",
    "/449/good/startbilliards_5_plafonov/",
    "/449/good/startbilliards_4_plafona_khrom_khrom/",
    "/449/good/startbilliards_4_plafona_zoloto_khrom/",
    "/449/good/startbilliards_4_plafona_zelenyy_zoloto/",
    "/449/good/startbilliards_4_plafona/",
    "/449/good/startbilliards_3_plafona_khrom_khrom/",
    "/449/good/startbilliards_3_plafona_zoloto_khrom/",
    "/449/good/startbilliards_3_plafona_zelenyy_zoloto/",
    "/449/good/startbilliards_3_plafona/",
    "/449/good/2_plafona_khrom_khrom/",
    "/449/good/2_plafona_zoloto_khrom/",
    "/449/good/startbilliards_2_plafona_zelenyy_zoloto/",
    "/449/good/startbilliards_2_plafona/",
    "/449/good/startbilliards_1_plafon_khrom/",
    "/449/good/startbilliards_1_plafon_zoloto/",
    "/449/good/startbilliards_1_plafon/",
    "/442/good/aristokrat_lyuks_3_plafona/",
    "/442/good/aristokrat_lyuks_4_plafona/",
    "/442/good/aristokrat_lyuks_5_plafonov/",
    "/443/good/aristokrat_3_plafona/",
    "/443/good/aristokrat_4_plafona/",
    "/443/good/aristokrat_5_plafonov/",
    "/444/good/klassika_i_6_plafonov/",
    "/444/good/klassika_i_4_plafona/",
    "/444/good/klassika_i_3_plafona/",
    "/444/good/klassika_6_plafonov/",
    "/444/good/klassika_4_plafona/",
    "/444/good/klassika_3_plafona/",
    "/766/good/svetilnik_renessans_granzh/",
    "/766/good/svetilnik_morskoy/",
    "/766/good/lamp_renessans_gold/",
    "/766/good/svetilnik_imperator_lyuks/",
    "/766/good/lamp_imperator_gold/",
    "/766/good/svetilnik_renessans/",
    "/766/good/leo_ii_evolution/",
    "/766/good/svetilnik_leo_ii1/",
    "/766/good/svetilnik_leo_ii/",
    "/766/good/svetilnik_drakon_2/",
    "/766/good/motsart_/",
    "/766/good/andaluz/",
    "/766/good/svetilnik_drakon_granzh/",
    "/766/good/svetilnik_premer/",
    "/766/good/svetilnik_imperator/",
    "/766/good/lamp_veneciya/",
    "/766/good/svetilnik_ampir/",
    "/766/good/lamp_prezident_silver/",
    "/766/good/lamp_prezident/",
    "/766/good/liverpul_lyuks/",
    "/766/good/svetilnik_liverpul/",
    "/766/good/svetilnik_baron_lyuks/",
    "/1067/good/bra/",
    "/1069/good/nastolnyy_svetilnik/",
    "/1068/good/torsher/",
    "/1067/good/bra_imperator_gold/",
    "/1067/good/bra_prezident_silver/",
    "/1067/good/bra_liverpul_lyuks/",
    "/1067/good/bra_renessans/",
    "/1067/good/bra_imperator/",
    "/1067/good/bra_baron_lyuks/",
    "/1067/good/bra_ampir/",
    "/1067/good/bra_venetsiya/",
    "/1067/good/bra_prezident/",
    "/1067/good/bra_prezident_iii/",
    "/1067/good/bra_renessans_granzh/",
    "/1067/good/bra_imperator_lyuks/",
    "/1067/good/bra_renessans_gold/",
    "/1067/good/bra_leo_ii/",
    "/1067/good/bra_leo/",
    "/1069/good/nastolnyy_svetilnik_imperator_lyuks/",
    "/1069/good/nastolnyy_svetilnik_renessans_gold/",
    "/1069/good/nastolnyy_svetilnik_leo/",
    "/1069/good/nastolnyy_svetilnik_leo_ii/",
    "/1068/good/torsher_liverpul_lyuks/",
    "/1068/good/torsher_imperator_lyuks/",
    "/1068/good/torsher_renessans/",
    "/1068/good/torsher_baron_lyuks/",
    "/1068/good/torsher_prezident/",
    "/1068/good/torsher_prezident_iii/",
    "/1068/good/torsher_imperator/",
    "/1068/good/torsher_prezident_silver/",
    "/1068/good/torsher_leo_ii/",
    "/1068/good/torsher_leo/"
]


let fileName = "svetilnik.json"

// const linksJson = Array.from(new Set(links))

// fs.writeFile(fileName, JSON.stringify(linksJson), (err) => {
//     if (err) throw err;
//     console.log('Data has been written to output.json');
// });

let bigArray = []

let index =50



const download = () => {
    let main = document.querySelector(".with-breadcrumbs")
    var data = {}
    let len = window.location.pathname.split("/").length
    data["name"] = main.children[2].textContent.replace("Коллекция ", "")
    if (main.children[5].children.thumbnails) {

        data["images"] = Array.from(main.children[5].children.thumbnails.children[0].children).map(item => item.children[0].attributes.rel.textContent.split("/")[4])
    } else {
        data["image"] = [document.querySelector(".zoom").children[0].href.split("/")[6]]

    }
    if (main.children[6].children[1].children[0]?.children) {
        data["dopolniniye"] = Array.from(main.children[6].children[1].children[0].children).map(item => item.textContent.replace("ф", ""))

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
                vkraskiImage: item.children[0].attributes["src"].nodeValue.split("/").pop()
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




async function purpeter(index) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.fabrika-start.ru/catalog/sect${links[index]}`, { timeout: 600000 });

    await page.evaluate(download).then(data => {
        bigArray.push(data)
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

    if (index <= links.length) {
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
