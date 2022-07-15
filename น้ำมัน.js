const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs")
const express = require("express");
var app = express();
var port = 5000
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
var all = [
{"name":name[0],"price":price[0]},
{"name":name[1],"price":price[1]},
{"name":name[2],"price":price[2]},
{"name":name[3],"price":price[3]},
{"name":name[4],"price":price[4]},
{"name":name[5],"price":price[5]},
{"name":name[6],"price":price[6]},
{"name":name[7],"price":price[7]},
{"name":name[8],"price":price[8]},
{"name":name[9],"price":price[9]},
{"codeby":"Cung999"},
{"date":"15/7/2565"}
]
app.get("/api/all",(req,res)=>{
res.send(all)
})
app.use((req,res,nuxt)=>{
res.status(404).send("Page Not Found ! ");
})
}
scraper()
process.on('uncaughtException', function(err) {
});
process.on('unhandledRejection', function(err) {
});
app.listen(port,()=>{
console.log("Starting Server ! ")
})
