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
            return Math.Truncate((j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096);
        }

        public static double GetCuriositySols()
        {
            DateTime landingDate = new DateTime(2012, 08, 06, 05, 17, 57);
            TimeSpan ts = DateTime.UtcNow - landingDate;
            double jdUt = GetJulianDateUt(ts.TotalMilliseconds);
            double jdTt = GetJulianDateTt(jdUt);
            double j2000 = GetJ2000(jdTt);
            return Math.Truncate((j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096);
        }
    }
}
