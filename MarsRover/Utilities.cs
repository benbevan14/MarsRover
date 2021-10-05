using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarsRover
{
    public class Utilities
    {
        public static double GetJulianDateUt(double milliseconds)
        {
            return 2440587.5 + milliseconds / 8.64e7;
        }

        public static double GetJulianDateTt(double julianDateUT)
        {
            return julianDateUT + (37 + 32.184) / 86400;
        }

        public static double GetJ2000(double jdTt)
        {
            return jdTt - 2451545.0;
        }

        public static double GetMarsSolDate()
        {
            double jdUt = GetJulianDateUt(DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
            double jdTt = GetJulianDateTt(jdUt);
            double j2000 = GetJ2000(jdTt);
            return (j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;
        }
    }
}
