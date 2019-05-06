import axiosLib from "axios";

class Api {
  constructor() {
    this.host = "https://api.mapbox.com/";
    this.districtsDatasetId = "cjuetvkuw0did2xrrkbdmf0na";
    this.datasetPath = "datasets/v1";
    this.datasetOwner = "jacksonrya";

    this.axios = axiosLib.create({
      baseURL: this.host,
      timeout: 10000,
      params: {
        access_token: process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN
      },
      responseType: "json"
    });

    // this.datasets = this.axios
    //   .get(`${this.datasetPath}/${this.datasetOwner}`)
    //   .then(response => {
    //     console.log(response);
    //     return response.data;
    //   });
    this.datasets = {
      LegislativeDistricts: "cjuetvkuw0did2xrrkbdmf0na"
    };
  }

  getFeatures(datasetName) {
    if (this.datasets.hasOwnProperty(datasetName)) {
      const datasetId = this.datasets[datasetName];
      return this.axios
        .get(`${this.datasetPath}/${this.datasetOwner}/${datasetId}/features`)
        .then(response => {
          return response.data;
        });
    } else {
      console.error(`Dataset '${datasetName}' does not exist`);
    }
  }
}

const api = new Api();

export default api;
