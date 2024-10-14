namespace Ekonomisk_Dashboard_API
{
    public class SavingExpenses
    {
        public string username {  get; set; } = string.Empty;
        public Savings Savings { get; set; }
        public List<Expenses> Expenses { get; set; }

    }
}
