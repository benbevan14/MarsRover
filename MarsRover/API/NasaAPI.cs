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
            ApiKey = Environment.GetEnvironmentVariable("API_KEY");
            BaseUrl = "https://api.nasa.gov/";
            RestClient = new RestClient(BaseUrl);
        }

        public ApodResponse GetApodResponseToday()
        {
            var request = new RestRequest("planetary/apod", Method.GET);
            request.AddParameter("api_key", ApiKey);
            var response = RestClient.Execute<ApodResponse>(request).Data;
            return response;
        }

        public ApodResponse GetApodResponseDate(DateTime date)
        {
            var request = new RestRequest("planetary/apod", Method.GET);
            request.AddParameter("api_key", ApiKey);
            string dateString = date.Year + "-" + date.Month + "-" + date.Day;
            request.AddParameter("date", dateString);

            var response = RestClient.Execute<ApodResponse>(request).Data;
            return response;
        }

        public IEnumerable<Photo> GetCuriosityPhotos(DateTime earthDate)
        {
            var request = new RestRequest("mars-photos/api/v1/rovers/curiosity/photos", Method.GET);
            request.AddParameter("api_key", ApiKey);
            string dateString = earthDate.Year + "-" + earthDate.Month + "-" + earthDate.Day;
            request.AddParameter("earth_date", dateString);

            var response = RestClient.Execute<PhotoResponse>(request).Data;

            return response != null && response.Photos != null ? response.Photos : new List<Photo>();
        }

        public IEnumerable<string> GetCuriosityCameraPhotoUrls(DateTime earthDate, string camera)
        {
            var request = new RestRequest("mars-photos/api/v1/rovers/curiosity/photos", Method.GET);
            request.AddParameter("api_key", ApiKey);
            string dateString = earthDate.Year + "-" + earthDate.Month + "-" + earthDate.Day;
            request.AddParameter("earth_date", dateString);
            request.AddParameter("camera", camera);

            var response = RestClient.Execute<PhotoResponse>(request).Data;

            return response.Photos.Select(p => p.ImgSrc);
        }
    }
}
