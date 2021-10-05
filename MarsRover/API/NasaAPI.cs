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
            request.AddParameter("earth_date", date.ToString("yyyy-mm-dd"));

            var response = RestClient.Execute<ApodResponse>(request).Data;

            return response.url;
        }

        public IEnumerable<string> GetCuriosityPhotoUrls(DateTime earthDate)
        {
            var request = new RestRequest("mars-photos/api/v1/rovers/curiosity/photos", Method.GET);
            request.AddParameter("api_key", ApiKey);
            string dateString = earthDate.Year + "-" + earthDate.Month + "-" + earthDate.Day;
            request.AddParameter("earth_date", dateString);

            var response = RestClient.Execute<PhotoResponse>(request).Data;

            return response.Photos != null ? response.Photos.Select(p => p.ImgSrc) : new List<string>();
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

        // Get a selection of photos from a random day since curiosity landed on mars
        public IEnumerable<string> GetRandomPhotoSelection(int number)
        {
            Random r = new Random();
            // Curiosity landed on the 6th of August 2012
            DateTime curiosityLanding = new DateTime(2012, 8, 6);
            // Add a random number of days to give a date between the landing and today
            int range = (DateTime.Today - curiosityLanding).Days;
            DateTime randomDate = curiosityLanding.AddDays(r.Next(range));

            // Return a number sized list of photos
            return GetCuriosityPhotoUrls(randomDate).OrderBy(x => r.Next()).Take(number);
        }
    }
}
