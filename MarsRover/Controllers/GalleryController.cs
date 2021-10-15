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
            List<string> urlList = new List<string>();

            var apod = api.GetApodResponseToday();
            var curiosityPhotos = api.GetCuriosityPhotos(DateTime.Now);

            ViewBag.apod = apod;
            ViewBag.date = DateTime.Now.ToString("yyyy-MM-dd");
            ViewBag.fhaz = "on";
            ViewBag.rhaz = "on";
            ViewBag.navcam = "on";
            ViewBag.mast = "on";
            ViewBag.chemcam = "on";
            ViewBag.mahli = "on";
            ViewBag.mardi = "on";


            foreach (Photo photo in curiosityPhotos)
            {
                urlList.Add(photo.ImgSrc);
            }

            return View(urlList);
           
        }

        [HttpPost, ActionName("Gallery")]
        public IActionResult GalleryFilter(PhotosFilter filter)
        {
            NasaApi api = new NasaApi();
            List<string> urlList = new List<string>();

            var apod = api.GetApodResponseDate(filter.Date);
            var curiosityPhotos = api.GetCuriosityPhotos(filter.Date);

            ViewBag.apod = apod;
            ViewBag.date = filter.Date.ToString("yyyy-MM-dd");

            int camera_count = 0;

            if (filter.Fhaz != "on")
            {
                camera_count += 1;
            }
            if (filter.Rhaz != "on")
            {
                camera_count += 1;
            }
            if (filter.Navcam != "on")
            {
                camera_count += 1;
            }
            if (filter.Mast != "on")
            {
                camera_count += 1;
            }
            if (filter.Chemcam != "on")
            {
                camera_count += 1;
            }
            if (filter.Mahli != "on")
            {
                camera_count += 1;
            }
            if (filter.Mardi != "on")
            {
                camera_count += 1;
            }

            if (camera_count > 3) 
            {
                
                if (filter.Fhaz == "on")
                {
                    var fhazPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "fhaz");
                    urlList.AddRange(fhazPhotos);
                  
                    ViewBag.fhaz = "on";
                }
                else
                {
                    ViewBag.fhaz = "off";
                }

                if (filter.Rhaz == "on")
                {
                    var rhazPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "rhaz");
                    urlList.AddRange(rhazPhotos);

                    ViewBag.rhaz = "on";
                }
                else
                {
                    ViewBag.rhaz = "off";
                }

                if (filter.Navcam == "on")
                {
                    var navcamPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "navcam");
                    urlList.AddRange(navcamPhotos);

                    ViewBag.navcam = "on";
                }
                else
                {
                    ViewBag.navcam = "off";
                }
                if (filter.Mast == "on")
                {
                    var mastPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "mast");
                    urlList.AddRange(mastPhotos);

                    ViewBag.mast = "on";
                }
                else
                {
                    ViewBag.mast = "off";
                }
                if (filter.Chemcam == "on")
                {
                    var chemcamPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "chemcam");
                    urlList.AddRange(chemcamPhotos);

                    ViewBag.chemcam = "on";
                }
                else
                {
                    ViewBag.chemcam = "off";
                }
                if (filter.Mahli == "on")
                {
                    var mahliPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "mahli");
                    urlList.AddRange(mahliPhotos);

                    ViewBag.mahli = "on";
                }
                else
                {
                    ViewBag.mahli = "off";
                }
                if (filter.Mardi == "on")
                {
                    var mardiPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "mardi");
                    urlList.AddRange(mardiPhotos);

                    ViewBag.mardi = "on";
                }
                else
                {
                    ViewBag.mardi = "off";
                }
            }
            else
            {
                foreach (Photo photo in curiosityPhotos)
                {
                    urlList.Add(photo.ImgSrc);
                }

                if (filter.Fhaz != "on")
                {
                    var fhazPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "fhaz");
                    foreach (string url in fhazPhotos)
                    {
                        urlList.Remove(url);
                    }

                    ViewBag.fhaz = "off";
                }
                else
                {
                    ViewBag.fhaz = "on";
                }

                if (filter.Rhaz != "on")
                {
                    var rhazPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "rhaz");
                    foreach (string url in rhazPhotos)
                    {
                        urlList.Remove(url);
                    }
                    ViewBag.rhaz = "off";
                }
                else
                {
                    ViewBag.rhaz = "on";
                }

                if (filter.Navcam != "on")
                {
                    var navcamPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "navcam");
                    foreach (string url in navcamPhotos)
                    {
                        urlList.Remove(url);
                    }
                    ViewBag.navcam = "off";
                }
                else
                {
                    ViewBag.navcam = "on";
                }
                if (filter.Mast != "on")
                {
                    var mastPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "mast");
                    foreach (string url in mastPhotos)
                    {
                        urlList.Remove(url);
                    }
                    ViewBag.mast = "off";
                }
                else
                {
                    ViewBag.mast = "on";
                }
                if (filter.Chemcam != "on")
                {
                    var chemcamPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "chemcam");
                    foreach (string url in chemcamPhotos)
                    {
                        urlList.Remove(url);
                    }
                    ViewBag.chemcam = "off";
                }
                else
                {
                    ViewBag.chemcam = "on";
                }
                if (filter.Mahli != "on")
                {
                    var mahliPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "mahli");
                    foreach (string url in mahliPhotos)
                    {
                        urlList.Remove(url);
                    }
                    ViewBag.mahli = "off";
                }
                else
                {
                    ViewBag.mahli = "on";
                }
                if (filter.Mardi != "on")
                {
                    var mardiPhotos = api.GetCuriosityCameraPhotoUrls(filter.Date, "mardi");
                    foreach (string url in mardiPhotos)
                    {
                        urlList.Remove(url);
                    }
                    ViewBag.mardi = "off";
                }
                else
                {
                    ViewBag.mardi = "on";
                }
            }
            return View(urlList);
        }

    }
}
