using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using RestSharp;

namespace MarsRover
{
    public class MarsRoverPhotosAPI
    {
        public string ApiKey { get; set; }
        public string BaseUrl { get; set; }
        public RestClient RestClient { get; set; }

        public MarsRoverPhotosAPI()
        {
            ApiKey = ConfigurationManager.AppSettings["apiKey"];
            BaseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
            RestClient = new RestClient(BaseUrl);
        }
    }
}
