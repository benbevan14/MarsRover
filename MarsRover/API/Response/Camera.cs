using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MarsRover.API.Response
{
    public class Camera
    {
        [JsonProperty("id")]
        public int CameraId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("rover_id")]
        public int RoverId { get; set; }
        [JsonProperty("full_name")]
        public string FullName { get; set; }
    }
}
