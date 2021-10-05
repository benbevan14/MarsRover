using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarsRover;

namespace MarsRover.Controllers
{
    public class ApodController : Controller
    {
        public IActionResult Index()
        {
            NasaApi api = new NasaApi();
            var test = api.GetApodUrlToday();
            return View(api.GetApodUrlToday());
        }
    }
}
