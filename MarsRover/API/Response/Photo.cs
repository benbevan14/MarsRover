using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MarsRover.API.Response
{
    public class Photo
    {
        [JsonProperty("id")]
        public int PhotoId { get; set; }
        [JsonProperty("sol")]
        public int Sol { get; set; }
        [JsonProperty("camera")]
        public Camera Camera { get; set; }
        [JsonProperty("img_src")]
        public string ImgSrc { get; set; }
        [JsonProperty("earth_date")]
        public DateTime EarthDate { get; set; }
        [JsonProperty("rover")]
        public Rover Rover { get; set; }

    }
}
