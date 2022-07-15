const cheerio = require("cheerio");
const axios = require("axios");
const login = require("fb-chat-api");
const fs = require("fs")
login({appState: JSON.parse(fs.readFileSync('app.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
var name = []
var price = []
var dates = []
async function scraper(){

const { data } = await axios.get("http://gasprice.kapook.com/gasprice.php");
const $ = cheerio.load(data);
const item = $("section[class='container'] article ")
const ul = $(item).find("ul").each((index,el)=>{
dates.push($(el).html())
})
var prices = $(dates[0]).find("em").each((index,el)=>{
price.push($(el).text())
})

var names = $(dates[0]).find("span").each((index,el)=>{
name.push($(el).text())
})
var all = `
ราคาน้ำมัน ปตท วันนี้❗⛽
${name[0]} : ${price[0]}
${name[1]} : ${price[1]}
${name[2]} : ${price[2]}
${name[3]} : ${price[3]}
${name[4]} : ${price[4]}
${name[5]} : ${price[5]}
${name[6]} : ${price[6]}
${name[7]} : ${price[6]}
${name[8]} : ${price[8]}
${name[9]} : ${price[9]}
Bot By : เป็นเจ้าของได้แล้ววันนี้ ! 
`
api.listen((err,mess)=>{
if(mess.body.startsWith("/")){
api.sendMessage(all,mess.threadID)
}
})

}

scraper()
})
process.on('uncaughtException', function(err) {

});

process.on('unhandledRejection', function(err) {

});
