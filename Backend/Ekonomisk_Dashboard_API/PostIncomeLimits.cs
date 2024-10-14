namespace Ekonomisk_Dashboard_API
{
    public class PostIncomeLimits
    {
        public int userid { get; set; }
        public int income { get; set; }
        public int saveGoal { get; set; }

        public List<Limits> limits { get; set; }
    }
}
