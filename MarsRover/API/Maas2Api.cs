using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarsRover.API.Response;
using RestSharp;

namespace MarsRover.API
{
    public class Maas2Api
    {
        public string BaseUrl { get; set; }
        public RestClient RestClient { get; set; }

        public Maas2Api()
        {
            BaseUrl = "https://api.maas2.apollorion.com/";
            RestClient = new RestClient(BaseUrl);
        }

        public Maas2Response GetLatestStats()
        {
            var request = new RestRequest(Method.GET);
            var response = RestClient.Execute<Maas2Response>(request).Data;

            return response;
        }

        public Maas2Response GetStatsForSol(int sol)
        {
            var request = new RestRequest(sol.ToString(), Method.GET);
            var response = RestClient.Execute<Maas2Response>(request).Data;

            return response;
        }
    }
}
