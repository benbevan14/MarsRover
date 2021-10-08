using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MarsRover.API.Response
{
    public class Maas2Response
    {
        [JsonProperty("status")]
        public int Status { get; set; }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("terrestrial_date")]
        public DateTime TerrestrialDate { get; set; }

        [JsonProperty("ls")]
        public int Ls { get; set; }

        [JsonProperty("season")]
        public string Season { get; set; }

        [JsonProperty("min_temp")]
        public int MinTemp { get; set; }

        [JsonProperty("max_temp")]
        public int MaxTemp { get; set; }

        [JsonProperty("pressure")]
        public int Pressure { get; set; }

        [JsonProperty("pressure_string")]
        public string PressureString { get; set; }

        [JsonProperty("abs_humidity")]
        public object AbsHumidity { get; set; }

        [JsonProperty("wind_speed")]
        public object WindSpeed { get; set; }

        [JsonProperty("atmo_opacity")]
        public string AtmoOpacity { get; set; }

        [JsonProperty("sunrise")]
        public string Sunrise { get; set; }

        [JsonProperty("sunset")]
        public string Sunset { get; set; }

        [JsonProperty("local_uv_irradiance_index")]
        public string LocalUvIrradianceIndex { get; set; }

        [JsonProperty("min_gts_temp")]
        public int MinGtsTemp { get; set; }

        [JsonProperty("max_gts_temp")]
        public int MaxGtsTemp { get; set; }

        [JsonProperty("wind_direction")]
        public object WindDirection { get; set; }

        [JsonProperty("sol")]
        public int Sol { get; set; }

        [JsonProperty("unitOfMeasure")]
        public string UnitOfMeasure { get; set; }

        [JsonProperty("TZ_Data")]
        public string TZData { get; set; }
    }

}
