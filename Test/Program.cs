using System;
using System.Configuration;
using MarsRover;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            MarsRover.NasaApi api = new MarsRover.NasaApi();
            string url = api.GetApodUrlToday();
            Console.WriteLine(url);
            Console.WriteLine("done");
        }
    }
}
