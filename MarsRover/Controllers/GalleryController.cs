using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarsRover.Models;
using MarsRover.API.Response;

namespace MarsRover.Controllers
{
    public class GalleryController : Controller
    {
        public IActionResult Gallery()
        {
            NasaApi api = new NasaApi();
            var apod = api.GetApodResponseToday();
            ViewBag.apod = apod;

            return View();
           
        }

        [HttpPost]
        public IActionResult Gallery(DateModel dateSearched)
        {
            NasaApi api = new NasaApi();
            List<string> urlList = new List<string>();

            var apod = api.GetApodResponseDate(dateSearched.Date);
            var curiosityPhotosUrls = api.GetCuriosityPhotoUrls(dateSearched.Date);

            ViewBag.apod = apod;

            foreach (string urls in curiosityPhotosUrls)
            {
                urlList.Add(urls);
            }

            urlList.AddRange(api.GetCuriosityCameraPhotoUrls(dateSearched.Date, "fhaz"));
            urlList.AddRange(api.GetCuriosityCameraPhotoUrls(dateSearched.Date, "mast"));
            urlList.AddRange(api.GetCuriosityCameraPhotoUrls(dateSearched.Date, "chemcam"));
            urlList.AddRange(api.GetCuriosityCameraPhotoUrls(dateSearched.Date, "mahli"));
            urlList.AddRange(api.GetCuriosityCameraPhotoUrls(dateSearched.Date, "mardi"));
            urlList.AddRange(api.GetCuriosityCameraPhotoUrls(dateSearched.Date, "navcam"));

            return View(urlList);
        }
    }
}
