using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Diagnostics.Eventing.Reader;
using System.Reflection.Metadata;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Ekonomisk_Dashboard_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpensesController : Controller
    {
        // Update connection string as necessary
        string connectionString = "server=localhost;uid=root;pwd=;database=ekonomisk_dashboard_database";
        int statusCode;
        string? statusMessage;
        string? username;

        [HttpGet("ExpenseDescription")]
        // Gets all descriptions for a specific expense connected to user, expense
        public List<string> GetExpenseDescriptions(int expenseId)
        {
            List<string> expenseDescription = new List<string>();
            
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.CommandText = "SELECT description FROM expensdescription WHERE expensId = @expenseId";
                    command.Parameters.AddWithValue("@expenseId", expenseId);

                    using (MySqlDataReader data = command.ExecuteReader())
                    {
                        while (data.Read())
                        {
                            string description = data.GetString("description");
                            expenseDescription.Add(description);
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to fetch description(s), server error: " + exception.Message;
            }

            return expenseDescription;
        }

        private string SaveImage(string base64)
        {
            string fileType = base64.Split(",")[0].Split("/")[1].Split(";")[0];
            byte[] imageData = Convert.FromBase64String(base64.Split(",")[1]);
            string uniqueFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + "_" + GenerateRandomString(8);
            string path = "C:\\Users\\erikf\\Documents\\GitHub\\Ekonomisk-Dashboard\\Ekonomisk\\public\\images\\" + uniqueFileName + "." + fileType;
            System.IO.File.WriteAllBytes(path, imageData);
            path = uniqueFileName + "." + fileType;
            return path;
        }
        private string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPost("ExpenseImage")]
        public ActionResult<List<string>> ExpenseImage([FromBody] Expenses data)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {

                    if(data.image != "") {
                        data.image = SaveImage(data.image);
                    }
                    
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "INSERT INTO expenses (userid, category, amount, imageURL) VALUES(@userId, @category, @amount, @imageURL)";
                    command.Parameters.AddWithValue("@userId", data.userId);
                    command.Parameters.AddWithValue("@category", data.category);
                    command.Parameters.AddWithValue("@amount", data.amount);
                    command.Parameters.AddWithValue("@imageURL", data.image);

                    if (System.String.IsNullOrEmpty(Convert.ToString(data.userId)) ||
                        System.String.IsNullOrEmpty(Convert.ToString(data.category)) ||
                        System.String.IsNullOrEmpty(Convert.ToString(data.amount)))
                    {
                        // Crucial information missing
                        statusCode = 400;
                        statusMessage = "Could not post expenses, crucial information missing";
                    }
                    else
                    {
                        command.ExecuteNonQuery();

                        int id = RecentExpenseId(data.userId);

                        if (id == 0)
                        {
                            statusCode = 400;
                            statusMessage = "Could not post description, no expenses in database";
                        }
                        else
                        {
                           
                            foreach (string desc in data.description)
                            {
                                Console.WriteLine("description " + desc + id);
                                PostDescriptions(desc, id);
                            }
                            statusCode = 201;
                            statusMessage = "Successfully posted expense to database";
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to post expense(s), server error: " + exception.Message;
            }

            return StatusCode(statusCode, statusMessage);
        }


        [HttpGet("RecentExpenseId")]
        public int RecentExpenseId(int userId)
        {
            int id;
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT * FROM expenses WHERE userid = @userId ORDER BY id DESC LIMIT 1";
                    command.Parameters.AddWithValue("@userId", userId);

                    using (MySqlDataReader data = command.ExecuteReader())
                    {
                        if(data.Read())
                        {
                            id = data.GetInt32("id");

                            statusCode = 200;
                            return id;
                        }                        
                    }
                }
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to fetch most recent expensId, server error: " + exception.Message;
            }
            return 0;
        }

        [HttpPost("Descriptions")]
        public ActionResult PostDescriptions(string description, int expensId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {                                                          
                    
                    
                        
                            connection.Open();
                            MySqlCommand command = connection.CreateCommand();
                            command.Prepare();
                            command.CommandText = "INSERT INTO expensdescription (expensId, description) VALUES(@expensId, @description)";
                            command.Parameters.AddWithValue("@expensId", expensId);
                            command.Parameters.AddWithValue("@description", description);
                            command.ExecuteNonQuery();
                        
                        statusCode = 201;
                        statusMessage = "Successfully posted description(s)";
                    
                 
                }
            }
            catch(Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not post description, server error: " + exception.Message;
            }
            return StatusCode(statusCode, statusMessage);
        }

        [HttpPut("Expense")]
        public ActionResult PutExpense(Expenses expenses, int expenseId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "UPDATE expenses SET amount = @amount WHERE id = @id";
                    command.Parameters.AddWithValue("@amount", expenses.amount);
                    command.Parameters.AddWithValue("@id", expenseId);

                    command.ExecuteNonQuery();
                }

                statusCode = 200;
                statusMessage = $"Successfully changed amount on id = {expenses.expenseId}";
            }
            catch(Exception exception)
            {
                statusCode=500;
                statusMessage = "error" + exception.Message;
                return StatusCode(statusCode, statusMessage);
            }
            return StatusCode(statusCode, statusMessage);
        }

        [HttpGet("Expenses")]
        public List<Expenses> GetExpenses(int userId)
        {
            List<Expenses> expenses = new List<Expenses>();

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT * FROM expenses WHERE userId = @userId";
                    command.Parameters.AddWithValue("@userId", userId);

                    if (System.String.IsNullOrEmpty(Convert.ToString(userId)))
                    {
                        statusCode = 400;
                        statusMessage = "Could not fetch expenses, missing userId";
                        return expenses;
                    }

                    using (MySqlDataReader data = command.ExecuteReader())
                    {
                        while (data.Read())
                        {
                            Expenses expense = new Expenses()
                            {
                                amount = data.GetInt32("amount"),
                                category = data.GetString("category"),
                                expenseId = data.GetInt32("id"),
                                description = GetExpenseDescriptions(data.GetInt32("id")),
                                image = data.GetString("imageURL")
                            };
                            expenses.Add(expense);
                        }
                    }
                }

                statusCode = 200;
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not fetch expenses, server error: " + exception.Message;
            }

            return expenses;
        }

        

        [HttpGet("GetIncome")]
        //fetches income for a single user by userId
        public int GetIncome(int userId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT amount FROM income WHERE userid = @userid";
                    command.Parameters.AddWithValue("@userid", userId);

                    if (System.String.IsNullOrEmpty(Convert.ToString(userId)))
                    {
                        statusCode = 400;
                        statusMessage = "Could not fetch income amount, missing userid";
                    }

                    MySqlDataReader data = command.ExecuteReader();
                    data.Read();

                    Income income = new Income();
                    income.income = data.GetInt32("amount");

                    statusCode = 200;
                    return income.income;
                }
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not fetch income amount, server error: " + exception.Message;
                return 0;
            }
        }

        [HttpDelete]
        public ActionResult RemoveExpense(int expenseId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    if(expenseId > 0)
                    {
                        connection.Open();
                        MySqlCommand command = connection.CreateCommand();
                        command.Prepare();
                        command.CommandText = "DELETE FROM expenses WHERE id = @id";
                        command.Parameters.AddWithValue("@id", expenseId);

                        command.ExecuteNonQuery();

                        statusCode = 200;
                        statusMessage = $"Successfully deleted expense row where id = {expenseId}";
                        DeleteDescription(expenseId);
                    }
                    else
                    {
                        return StatusCode(400, "Could not delete expense, invalid id");
                    }                    
                }
            }
            catch(Exception exception) 
            {
                statusCode = 500;
                statusMessage = "Could not delete expense, server error: " + exception.Message;
            }
            return StatusCode(statusCode, statusMessage);
        }

        [HttpDelete("DeleteDescriptions")]
        public ActionResult DeleteDescription(int expenseId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "DELETE FROM expensdescription WHERE expensId = @expenseId";
                    command.Parameters.AddWithValue("@expenseId", expenseId);
                    command.ExecuteNonQuery();

                    statusCode= 200;
                    statusMessage = "Successfully deleted descriptions";
                }
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not delete description, server error: " + exception.Message;               
            }
            return StatusCode(statusCode, statusMessage);
        }

        [HttpGet("Username")]
        public string? GetUsername(int userId)
        {
            
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT username FROM users WHERE userid = @userId";
                    command.Parameters.AddWithValue("@userId", userId);
                    using(MySqlDataReader reader = command.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            username = reader.GetString("username");
                        }                        
                    }

                    return username;
                }
            }
            catch
            {
                return "";
            }
        }

        [HttpGet("SavingExpenses")] 
        public ActionResult<SavingExpenses> SavingExpenses(int userId)
        {
            try
            {
                Savings savings = null;
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT * FROM savings WHERE userId = @userId";
                    command.Parameters.AddWithValue("@userId", userId);

                    using (MySqlDataReader data = command.ExecuteReader())
                    {
                        if (data.Read())
                        {
                            savings = new Savings()
                            {
                                totalSaved = data.GetInt32("totalsaving"),
                                saveGoal = data.GetInt32("savegoal"),
                                prevsave = data.GetInt32("totalsaving")
                            };
                        }
                    }
                }

                List<Expenses> expenses = GetExpenses(userId);
                string username = GetUsername(userId);

                SavingExpenses financialInfo = new SavingExpenses()
                {
                    username = username,
                    Savings = savings,
                    Expenses = expenses
                };

                return StatusCode(200, financialInfo);
            }
            catch (Exception exception)
            {
                int statusCode = 500;
                string statusMessage = "Could not fetch SavingExpenses, server error: " + exception.Message;
                return StatusCode(statusCode, statusMessage);
            }
        }

        

        [HttpGet("IncomeExpenses")]
        public ActionResult<IncomeExpenses> GetIncomeExpenses(int userId)
        {
            try
            {
                Income income = new Income();
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();

                    command.CommandText = "SELECT amount FROM income WHERE userid = @userid";
                    command.Parameters.AddWithValue("@userid", userId);

                    if (System.String.IsNullOrEmpty(Convert.ToString(userId)))
                    {
                        statusCode = 400;
                        statusMessage = "Could not fetch income amount, missing userid";

                    }

                    using (MySqlDataReader data = command.ExecuteReader())
                    {
                        if (data.Read())
                        {
                            income.income = data.GetInt32("amount");
                        }
                    }                    

                    List<Expenses> expenses = GetExpenses(userId);

                    IncomeExpenses incomeExpenses = new IncomeExpenses()
                    {
                        income = income,
                        expenses = expenses
                        
                    };
                    statusCode = 200;
                    return StatusCode(statusCode, incomeExpenses);                    
                }
            }
            catch(Exception exception)
            {
                int statusCode = 500;
                string statusMessage = "Could not fetch IncomeExpenses, server error: " + exception.Message;
                return StatusCode(statusCode, statusMessage);
            }
        }

 
    }
}
