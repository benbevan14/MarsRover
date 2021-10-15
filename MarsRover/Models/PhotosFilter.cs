using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarsRover.Models
{
    public class PhotosFilter
    {
        public DateTime Date { get; set; }
        public string Fhaz { get; set; }
        public string Rhaz { get; set; }
        public string Navcam { get; set; }
        public string Mast { get; set; }
        public string Chemcam { get; set; }
        public string Mahli { get; set; }
        public string Mardi { get; set; }
    }
}
