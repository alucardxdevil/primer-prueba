const express = require('express')
const cheerios = require('cheerio')
const request = require('request')

const app = express()

app.get('/scrape', (req, res) => {
    const url = 'https://www.soriana.com'
    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerios.load(html)

            const department = $("a.nav-link:contains(Despensa)").text().trim()

            const urlDepartment = $("a.nav-link:contains(Despensa)").attr("href");

            const categories = [];
            $("ul.navbar-nav > li.nav-item").each((i, el) => {
                const name = $(el).find("a").text().trim();
                const urlCategory = $(el).find("a").attr("href");
                const subcategories = [];
                $(el).find("ul.dropdown-menu > a").each((i, el) => {
                    const subcategoryName = $(el).text().trim();
                    const subcategoryUrl = $(el).attr("href");
                    subcategories.push({ name: subcategoryName, url: subcategoryUrl });
                });
                categories.push({ name: name, url: urlCategory, subcategories: subcategories });
            });

            const result = { department: department, url: urlDepartment, categories: categories };

            res.send(result);
        }
    })
})

app.listen(5000, () => {
    console.log('Server on port', 5000)
})