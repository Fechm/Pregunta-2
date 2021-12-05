const Search = require("./models/search");


const main = async()=>{
    const search = new Search();
    const response = await search.getMostHiredInsuranceLast24Hrs();
    console.log(response);
};

main();