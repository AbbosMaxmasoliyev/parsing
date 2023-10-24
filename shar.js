const fs = require("fs/promises")
const puppeteer = require('puppeteer');


const links = [
    "/sect/1008/good/start-billiards-403/",
    "/sect/1008/good/start_billiards_snooker_52_4_mm/",
    "/sect/1008/good/start-billiards-prem406/",
    "/sect/1008/good/start-billiards-prem404/",
    "/sect/1008/good/start-billiards-401/",
    "/sect/1008/good/start-billiards-prem402/",
    "/sect/1008/good/kit-acs-2/",
    "/sect/1008/good/komplekt_aksessuarov_38_nbr_3800/",
    "/sect/1008/good/kit-acs-1/",
    "/sect/1009/good/tao_mi_67_mm_bbta67_rc/",
    "/sect/1009/good/tao_mi_67_mm_bbta67_yc/",
    "/sect/1009/good/shar_bitok_tao_mi_67_mm_yc/",
    "/sect/1009/good/shar_bitok_tao_mi_67_mm_rc/",
    "/sect/1009/good/shar_15_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_14_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_13_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_12_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_11_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_10_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_9_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_8_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_7_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_6_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_5_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_4_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_3_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_2_tao_mi_professional_67_mm/",
    "/sect/1009/good/shar_1_tao_mi_professional_67_mm/",
    "/sect/1006/good/dyna_spheres_silver_snooker_next_gen_52_4_mm_bdssnsi524/",
    "/sect/1006/good/dyna_spheres_bronze_pool_next_gen_57_2_mm_bdspobr572us/",
    "/sect/1006/good/dyna_spheres_tungsten_pool_next_gen_57_2_mm_bdspotu572us/",
    "/sect/1006/good/dyna_spheres_prime_pyramid_next_gen_68_mm_bdspybr680y/",
    "/sect/1006/good/dyna_spheres_prime_pyramid_next_gen_68_mm_bdspybr680r/",
    "/sect/1006/good/dyna_spheres_prime_pyramid_next_gen_67_mm_bdspybr670y/",
    "/sect/1006/good/dyna_spheres_prime_pyramid_next_gen_67_mm_bdspybr670r/",
    "/sect/1006/good/shar_bitok_dyna_spheres_prime_pyramid_next_gen_68_mm_bdspybr68y_/",
    "/sect/1006/good/shar_bitok_dyna_spheres_prime_pyramid_next_gen_68_mm_bdspybr68r/",
    "/sect/1006/good/shar_bitok_dyna_spheres_prime_pyramid_next_gen_67_mm_bdspybr67y/",
    "/sect/1006/good/shar_bitok_dyna_spheres_prime_pyramid_next_gen_67_mm_bdspybr67r/",
    "/sect/1006/good/shar_15_dyna_spheres_prime_pyramid_67_mm_bbd_67_15/",
    "/sect/1006/good/shar_14_dyna_spheres_prime_pyramid_67_mm_bbd_67_14/",
    "/sect/1006/good/shar_13_dyna_spheres_prime_pyramid_67_mm_bbd_67_13/",
    "/sect/1006/good/shar_12_dyna_spheres_prime_pyramid_67_mm_bbd_67_12/",
    "/sect/1006/good/shar_11_dyna_spheres_prime_pyramid_67_mm_bbd_67_11/",
    "/sect/1006/good/shar_10_dyna_spheres_prime_pyramid_67_mm_bbd_67_10/",
    "/sect/1006/good/shar_9_dyna_spheres_prime_pyramid_67_mm_bbd_67_9/",
    "/sect/1006/good/shar_8_dyna_spheres_prime_pyramid_67_mm_bbd_67_8/",
    "/sect/1006/good/shar_7_dyna_spheres_prime_pyramid_67_mm_bbd_67_7/",
    "/sect/1006/good/shar_6_dyna_spheres_prime_pyramid_67_mm_bbd_67_6/",
    "/sect/1006/good/shar_5_dyna_spheres_prime_pyramid_67_mm_bbd_67_5/",
    "/sect/1006/good/shar_4_dyna_spheres_prime_pyramid_67_mm_bbd_67_4/",
    "/sect/1006/good/shar_3_dyna_spheres_prime_pyramid_67_mm_bbd_67_3/",
    "/sect/1006/good/shar_2_dyna_spheres_prime_pyramid_67_mm_bbd_67_2/",
    "/sect/1006/good/shar_1_dyna_spheres_prime_pyramid_67_mm_bbd_67_1/",
    "/sect/1008/good/start-billiards-405/"
]
let fileName = "shar.json"

let bigArray = []

let index = 24



const download = () => {
    let main = document.querySelector(".with-breadcrumbs")
    var data = {}
    let len = window.location.pathname.split("/").length
    data["name"] = main.children[2].textContent.replace("Коллекция ", "")
    if (main.children[5].children.thumbnails) {

        data["images"] = Array.from(main.children[5].children.thumbnails.children[0].children).map(item => item.children[0].attributes.rel.textContent.split("/")[4])
    }
    if (document.querySelector(".zoom")) {
        data["image"] = [document.querySelector(".zoom").children[0].href.split("/")[6]]

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
    if (document.querySelector(".parameters dt input[value='Купить']")) {
        data["price"] = document.querySelector(".parameters dt input[value='Купить']").attributes["data-price"].nodeValue
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

