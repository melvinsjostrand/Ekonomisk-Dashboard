namespace Ekonomisk_Dashboard_API
{
    public class User
    {
        public int id { get; set; }
        public string password { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public string mail { get; set; } = string.Empty;

        public int pastSavings { get; set; }
    }
}
