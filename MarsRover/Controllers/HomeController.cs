using MarsRover.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MarsRover.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        { 
           return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }

        public IActionResult Rovers()
        {
            return View();
        }

        public IActionResult Information()
        {
            return View();
        }

        public IActionResult MarsGame()
        {
            var scores = Utilities.GetHighScores();
            return View(scores);
        }

        [HttpPost, ActionName("MarsGame")]
        public IActionResult SubmitScore(int score, string username)
        {
            Utilities.AddScore(score, username);
            var scores = Utilities.GetHighScores();
            return View("MarsGame", scores);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
