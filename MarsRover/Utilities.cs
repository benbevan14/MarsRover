using System;
using System.Collections.Generic;
using System.IO;
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

        public static double GetRoverSols(DateTime landingDate)
        {
            TimeSpan ts = DateTime.UtcNow - landingDate;
            return Math.Truncate( ts.TotalSeconds / 88775.244147);
        }

        public static double GetCuriositySols()
        {
            return GetRoverSols(new DateTime(2012, 8, 6, 5, 17, 57));
        }

        public static double GetOpportunitySols()
        {
            return GetRoverSols(new DateTime(2004, 1, 25, 5, 5, 0));
        }

        public static double GetSojournerSols()
        {
            return GetRoverSols(new DateTime(1996, 12, 4, 6, 58, 7));
        }

        public static double GetSpiritSols()
        {
            return GetRoverSols(new DateTime(2004, 1, 4, 4, 35, 0));
        }

        public static double GetPerseverenceSols()
        {
            return GetRoverSols(new DateTime(2021, 2, 18, 20, 55, 0));
        }


        // Stuff for mars rover game
        public static void AddScore(int score, string username)
        {
            string path = @"Scores.txt";
            if (!File.Exists(path)) return;
            using StreamWriter sw = File.AppendText(path);
            sw.WriteLine(score + "," + username);
        }

        public static IEnumerable<GameScore> GetHighScores()
        {
            List<GameScore> scores = new List<GameScore>();
            string path = @"Scores.txt";
            //if (!File.Exists(path)) return null;
            foreach (string s in File.ReadAllLines(path))
            {
                var data = s.Split(',');
                scores.Add(new GameScore(int.Parse(data[0]), data[1]));
            }

            return scores.OrderByDescending(s => s.Score).Take(5);
        }
    }

    public class GameScore
    {
        public int Score { get; set; }
        public string Username { get; set; }

        public GameScore(int score, string username)
        {
            Score = score;
            Username = username;
        }
    }
}
