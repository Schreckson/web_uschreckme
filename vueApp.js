const url = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=&objectIds=191,236,310,224,317,234&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=county%2Ccases7_per_100k&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=none&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=standard&f=pjson&token=";

        const vm = new Vue({
              el: '#app',
                data: {
                   timestamp: "",
                   results: []
                },
                created() {
                    setInterval(this.getNow, 1000);
                },
                methods: {
                    getNow: function() {
                        const today = new Date();
                        const date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
                        this.timestamp = date;
                    }
                },
                mounted() {
                  axios.get(url).then(response => {
                    this.results = response.data.features.map((result) => {
                      return {GEN: result.attributes.county, CASES: result.attributes.cases7_per_100k};
                    }
                  )})
                  }
             });