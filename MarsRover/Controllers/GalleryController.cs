using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarsRover.Models;

namespace MarsRover.Controllers
{
    public class GalleryController : Controller
    {
        public IActionResult Gallery()
        {
            NasaApi api = new NasaApi();
            var apod = api.GetApodResponseToday();
            return View(apod);
           
        }

        [HttpPost]
        public IActionResult Gallery(DateViewModel dateSearched)
        {
            NasaApi api = new NasaApi();
            var apod = api.GetApodResponseDate(dateSearched.Date);

            return View(apod);
        }
    }
}
