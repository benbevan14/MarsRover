using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarsRover
{
    public class Utilities
    {
        public static int MarsDayInSeconds = 88775;
        public static int EarthDayInSeconds = 86400;
        public decimal DayConversion = MarsDayInSeconds / EarthDayInSeconds;

        public int EarthDateToSol(DateTime earthDate)
        {
            int timeDifferenceInDays = (int)earthDate.Subtract(new DateTime(1873, 12, 29)).TotalDays;
            int MarsSolDate = (int)(timeDifferenceInDays * DayConversion);

            return MarsSolDate;
        }

        public DateTime SolToEarthDate(int MarsSolDate)
        {
            int timeDifferenceInDays = (int)(MarsSolDate / DayConversion);
            DateTime earthDate = new DateTime(1873, 12, 29).AddDays(timeDifferenceInDays);
  
            return earthDate;
        }
    }
}
