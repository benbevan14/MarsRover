using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MarsRover.API.Response
{
    public class PhotoResponse
    {
        [JsonProperty("photos")]
        public List<Photo> Photos { get; set; }
    }
}
