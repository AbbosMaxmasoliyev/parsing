const fs = require("fs/promises")
const puppeteer = require('puppeteer');


const links = ["/sect/991/good/kiy_yakubovicha_yantar/", "/sect/212/good/kiy_klassika_16_5/", "/sect/185/good/0-1-r/", "/sect/184/good/kiy_ryabova_16_5_rs/", "/sect/184/good/kiy_ryabova_19_1_rc/", "/sect/184/good/kiy_ryabova_16_3_rs/", "/sect/991/good/kiy_yakubovicha_agat/", "/sect/184/good/kiy_ryabova_16_1_rs/", "/sect/185/good/0-2-r/", "/sect/184/good/kiy_ryabova_16_2_rs/", "/sect/184/good/kiy_ryabova_17_3_rs/", "/sect/184/good/kiy_ryabova_17_2_rs_/", "/sect/184/good/kiy_ryabova_14_1_rs/", "/sect/184/good/kiy_ryabova_17_1_rs/", "/sect/184/good/kiy_ryabova_15_4_rs/", "/sect/184/good/kiy_ryabova_10_5_rs/", "/sect/184/good/kiy_ryabova_10_1_rs/", "/sect/184/good/kiy_ryabova_10_9/", "/sect/185/good/kiy_klubnyy_0_2_r_tyulpan/", "/sect/185/good/kiy_klubnyy_0_1_r_tyulpan/", "/sect/185/good/kiy_klubnyy_0_1_r/", "/sect/185/good/kiy_klubnyy_0_2_r/", "/sect/991/good/kiy_yakubovicha_topaz/", "/sect/184/good/kiy_ryabova_10_9_rs/", "/sect/184/good/kiy_ryabova_10_4_rs/", "/sect/184/good/kiy_ryabova_10_8_rs/", "/sect/184/good/kiy_ryabova_16_4_rs/", "/sect/184/good/kiy_ryabova_18_2_rc/", "/sect/184/good/kiy_ryabova_10_10_rs/", "/sect/184/good/kiy_ryabova_10_6_rs/", "/sect/184/good/kiy_ryabova_18_1_rs/", "/sect/184/good/kiy_ryabova_10_7_rs/", "/sect/991/good/kiy_yakubovicha_izumrud/", "/sect/212/good/kiy_klassika_16_3/", "/sect/184/good/kiy_ryabova_10_6u/", "/sect/184/good/kiy_ryabova_10_5u/", "/sect/184/good/kiy_ryabova_10_1u/", "/sect/184/good/kiy_ryabova_10_7u/", "/sect/184/good/kiy_ryabova_10_10u/", "/sect/184/good/kiy_ryabova_10_2e/", "/sect/991/good/kiy_yakubovich_korall/", "/sect/991/good/kiy_yakubovich_sapfir/", "/sect/185/good/1-6-r/", "/sect/185/good/1-5-r/", "/sect/185/good/1-4-r/", "/sect/185/good/1-3-r/", "/sect/185/good/1-2-r/", "/sect/185/good/1-1-r/", "/sect/184/good/kiy_ryabova_10_2u/", "/sect/991/good/kiy_yakubovich_yastreb/", "/sect/212/good/kiy_klassika_11_10/", "/sect/212/good/kiy_praktik_14_1/", "/sect/212/good/kiy_ornament_16_5_r/", "/sect/212/good/kiy_klassika_11_9/", "/sect/212/good/kiy_drakon_16_5_r/", "/sect/991/good/kiy_yakubovicha_almaz/", "/sect/212/good/kiy_klassika_11_11/", "/sect/212/good/kiy_klassika_11_1/", "/sect/212/good/kiy_klassika_11_2/", "/sect/184/good/kiy_ryabova_11_10_rs/", "/sect/212/good/kiy_sirius_17_2/", "/sect/185/good/2-1-r/", "/sect/184/good/kiy_ryabova_11_9_rs/", "/sect/212/good/kiy_klassika_16_1/", "/sect/185/good/2-2-r/", "/sect/212/good/kiy_klassika_11_7/", "/sect/212/good/kiy_klassika_16_2/", "/sect/185/good/2-3-r/", "/sect/212/good/kiy_pereplet_16_1_r/", "/sect/212/good/kiy_versache_16_1_r/", "/sect/212/good/kiy_versache_16_3_r/", "/sect/184/good/kiy_ryabova_11_11_rs/", "/sect/185/good/2-4-r/", "/sect/212/good/kiy_pereplet_16_3_r/", "/sect/212/good/kiy_klassika_11_6/", "/sect/185/good/2-5-r/", "/sect/185/good/kiy_lyubitelskiy_2_7/", "/sect/212/good/kiy_ekzotik_19_1/", "/sect/185/good/2-6-r/", "/sect/212/good/kiy_sirius_17_1/", "/sect/185/good/kiy_lyubitelskiy_drakon_2_5_r_/", "/sect/185/good/kiy_drakon_2_6_r_/", "/sect/185/good/kiy_ornament_2_5_r/", "/sect/212/good/kiy_versache_10_1/", "/sect/185/good/kiy_lyubitelskiy_ornament_2_6_r/", "/sect/212/good/kiy_drakon_10_1/", "/sect/212/good/kiy_pereplet_10_1/", "/sect/184/good/kiy_ryabova_11_1_rs/", "/sect/184/good/kiy_ryabova_11_2_rs/", "/sect/212/good/kiy_4_kh_storonniy_zapil_18_2/", "/sect/212/good/kiy_klassika_10_9/", "/sect/184/good/kiy_ryabova_11_7_rs/", "/sect/212/good/kiy_klassika_10_1/", "/sect/212/good/kiy_sirius_17_3/", "/sect/212/good/kiy_klassika_10_8/", "/sect/212/good/kiy_klassika_11_4/", "/sect/184/good/kiy_ryabova_11_6_rs/", "/sect/212/good/kiy_4_kh_storonniy_zapil_18_1/", "/sect/184/good/kiy_ryabova_11_4_rs/", "/sect/212/good/kiy_klassika_10_4/", "/sect/184/good/kiy_ryabova_11_6u/", "/sect/212/good/kiy_praktik_15_4/", "/sect/212/good/kiy_klassika_16_4/", "/sect/212/good/kiy_klassika_10_6/", "/sect/212/good/kiy_klassika_10_10/", "/sect/212/good/kiy_klassika_10_5/", "/sect/212/good/kiy_klassika_11_8/", "/sect/1030/good/kiy_shakhmaty_svetlye/", "/sect/1030/good/kiy_pauk_chernyy_grab_siniy/", "/sect/1030/good/kiy_venets/", "/sect/1030/good/kiy_pauk_venge/", "/sect/1030/good/kiy_pauk_chernyy_grab/", "/sect/1029/good/kiy_neptun_svetlyy/", "/sect/1030/good/kiy_neptun_temnyy/", "/sect/1030/good/kiy_plamya/", "/sect/1030/good/kiy_shakhmaty/", "/sect/1029/good/kiy_integro/", "/sect/184/good/kiy_ryabova_11_5u/", "/sect/212/good/kiy_klassika_10_7/", "/sect/184/good/kiy_ryabova_11_8_rs/", "/sect/991/good/kiy_yakubovich_vystrel/", "/sect/184/good/kiy_ryabova_11_8u/", "/sect/991/good/kiy_yakubovich_richard/", "/sect/991/good/kiy_yakubovich_lyudovik/", "/sect/212/good/kiy_klassika_10_9_P/", "/sect/763/good/acs-11/", "/sect/763/good/drevko_dlya_mostika_d_2/", "/sect/763/good/drevko_dlya_mostika_d_3/", "/sect/763/good/acs-13/"]

let bigArray = []

let index = 114



const download = () => {
    let data = {}
    let keyName = document.querySelector("h1.float-right")
    data["name"] = document.querySelector("h1.float-right.width772").textContent.replace("Коллекция ", "")
    if (document.querySelector("span.zoom")) {
        data["image"] = [document.querySelector(".zoom").children[0].href.split("/").pop()]
    }
    if (document.querySelectorAll("#thumbnails ul li a")) {
        data["images"] = Array.from(document.querySelectorAll("#thumbnails ul li a")).map(item => item.rel.split("/")[4])
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


    if (document.querySelectorAll(".spec-table-0")) {
        data["table"] = Array.from(document.querySelectorAll(".spec-table-0")).map(item => {
            return {
                shape: item.children[0].textContent,
                dlina: item.children[1].textContent,
                weight: item.children[2].textContent,
                price: item.children[3].textContent.replaceAll("\n", "").trim().replaceAll(" ", "")
            }
        })
    }

    if (document.getElementById("tab-description")) {
        let description = document.getElementById("tab-description")
        data["description"] = description.innerText
    }


    let len = window.location.pathname.split("/").length
    let name = window.location.pathname.split("/")[len - 2]

    return ({
        [name]: data
    })
}


let fileName = "key.json"

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

