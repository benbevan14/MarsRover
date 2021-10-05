using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using MarsRover.API.Response;
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
            request.AddParameter("api_key", ApiKey);

            var response = RestClient.Execute<ApodResponse>(request).Data;

            return response.url;
        }

        public string GetApodUrlDate(DateTime date)
        {
            var request = new RestRequest("planetary/apod", Method.GET);
            request.AddParameter("api_key", ApiKey);
            request.AddParameter("date", date.ToString("yyyy-mm-dd"));

            var response = RestClient.Execute<ApodResponse>(request).Data;

            return response.url;
        }

        public IEnumerable<string> GetCuriosityPhotoUrls(DateTime earthDate)
        {
            var request = new RestRequest("mars-photos/api/v1/rovers/curiosity/photos", Method.GET);
            request.AddParameter("api_key", ApiKey);
            request.AddParameter("date", earthDate.ToString("yyyy-mm-dd"));

            var response = RestClient.Execute<PhotoResponse>(request).Data;

            return response.Photos.Select(p => p.ImgSrc);
        }

        public IEnumerable<string> GetCuriosityCameraPhotoUrls(DateTime earthDate, string camera)
        {
            var request = new RestRequest("mars-photos/api/v1/rovers/curiosity/photos", Method.GET);
            request.AddParameter("api_key", ApiKey);
            request.AddParameter("date", earthDate.ToString("yyyy-mm-dd"));
            request.AddParameter("camera", camera);

            var response = RestClient.Execute<PhotoResponse>(request).Data;

            return response.Photos.Select(p => p.ImgSrc);
        }
    }
}
