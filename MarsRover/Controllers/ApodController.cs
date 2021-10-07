using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarsRover;
using MarsRover.Models;

namespace MarsRover.Controllers
{
    public class ApodController : Controller
    {
        public IActionResult Apod()
        {
            NasaApi api = new NasaApi();
            var apod = api.GetApodResponseToday();
            return View(apod);
        }

        [HttpPost]
        public IActionResult Apod(DateViewModel dateSearched)
        {
            NasaApi api = new NasaApi();
            var apod = api.GetApodResponseDate(dateSearched.Date);

            return View(apod);
        }
    }
}
