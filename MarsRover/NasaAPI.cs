using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using RestSharp;

namespace MarsRover
{
    public class NasaApi
    {
        public string ApiKey { get; set; }
        public string BaseUrl { get; set; }
        public RestClient RestClient { get; set; }

        public NasaApi()
        {
            ApiKey = ConfigurationManager.AppSettings["apiKey"];
            BaseUrl = "https://api.nasa.gov/";
            RestClient = new RestClient(BaseUrl);
        }

        public string GetApodUrlToday()
        {
            var request = new RestRequest("planetary/apod", Method.GET);
            request.AddHeader("api_key", ApiKey);

            var response = RestClient.Execute<ApodResponse>(request).Data;

            return response.url;
        }

        public string GetApodUrlDate(DateTime date)
        {
            var request = new RestRequest("planetary/apod", Method.GET);
            request.AddHeader("api_key", ApiKey);
            request.AddHeader("date", date.ToString("yyyy-mm-dd"));

            var response = RestClient.Execute<ApodResponse>(request).Data;

            return response.url;
        }

    }
}
