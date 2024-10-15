using Microsoft.AspNetCore.Routing.Constraints;

namespace Ekonomisk_Dashboard_API
{
    public class Expenses
    {
        public int userId { get; set; }
        public string category { get; set; } = string.Empty;
        public int amount { get; set; }
        public int expenseId { get; set; }
        public List<string>? description { get; set; }

        public string image { get; set; } = string.Empty;
    }
}
