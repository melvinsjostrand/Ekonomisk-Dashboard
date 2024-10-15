namespace Ekonomisk_Dashboard_API
{
    public class Limits
    {
        public int id { get; set; }
        public int userId {  get; set; }
        public string category { get; set; } = string.Empty;
        public int spendLimit { get; set; }
    }
}
