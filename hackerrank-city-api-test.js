const axios = require('axios');
const us=require("underscore");

async function useAyncCallAPI() {
    try {
        let apiurl='http://jsonmock.hackerrank.com/api/food_outlets?city=Seattle&page=1';
        const res = await axios.get(apiurl);
        console.log('Call api using async, await:')
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}

const useAyncArrow = async () => {
    // do something with evt
    let apiurl='http://jsonmock.hackerrank.com/api/food_outlets?city=Seattle&page=1';
    const res = await axios.get(apiurl, {
        responseType: 'json'
        });
    console.log('Call api using async, await with arrow function:')
    console.log(res.data);
}

async function getRelevantFoodOutlets(city, maxCost) {
    try {
        let url = "http://jsonmock.hackerrank.com/api/food_outlets?city=" + city + "&page=1";
        const results = [];
        const res = await axios.get(url, {
            responseType: 'json'
            });
        if (res.status === 200) {
            let total_page = res.data['total_pages'];
            //console.log(total_page);
            for (let i = 1; i <= total_page; i++) {
                url = "http://jsonmock.hackerrank.com/api/food_outlets?city=" + city + "&page=" + i;
                let subRes = await axios.get(url, {
                    responseType: 'json'
                    });
                if (subRes.status === 200) {
                    us.map(subRes.data, function (content) {
                        us.map(content, function (data) {
                            if (data.estimated_cost <= maxCost) {
                                results.push(data.name);
                            }
                        });
                    });
                }

            }
        }
        return console.log(results.sort());
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {
    useAyncCallAPI,
    useAyncArrow,
    getRelevantFoodOutlets
};

useAyncCallAPI();
useAyncArrow();
getRelevantFoodOutlets('Seattle',150);
