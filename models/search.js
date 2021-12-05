const axios = require("axios");

class Search {
  
    constructor() {}

  async getMostHiredInsuranceLast24Hrs() {
    let hiringArray = [];
    let insuranceArray = [];
    let totalHiredInsurance = [];
    try {
      hiringArray = await _getHiring();
      insuranceArray = await _getExistingInsurance();

      for (let index = 0; index < insuranceArray.length; index++) {
        let hiredInsurance = hiringArray.filter((element) => {
          return element.insuranceId === insuranceArray[index].id;
        }).length;
        totalHiredInsurance.push({
          id: insuranceArray[index].id,
          name: insuranceArray[index].name,
          totalHired: hiredInsurance,
        });
      }
      totalHiredInsurance.sort((a, b) => {
        return parseInt(b.totalHired) - parseInt(a.totalHired);
      });
      return totalHiredInsurance.slice(0, 5);
    } catch (error) {
      return error;
    }
  }

}

async function _getExistingInsurance() {
  try {
    const instance = axios.create({
      baseURL: "https://hack.kunderlabs.com/exam/insurance/api/insurance",
    });

    let response = await instance.get();

    return response.data.insurance;
  } catch (error) {
    return error;
  }
}

async function _getHiring() {
  try {
    const instance = await axios.create({
      baseURL:
        "https://hack.kunderlabs.com/exam/insurance/api/insurance/contracted/today",
    });
    const response = await instance.get();
    return response.data.contracted.results;
  } catch (error) {
    return error;
  }
}

module.exports = Search;
