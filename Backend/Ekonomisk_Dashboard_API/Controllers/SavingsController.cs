using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;

namespace Ekonomisk_Dashboard_API.Controllers
{
    public class SavingsController : Controller
    {
        string connectionString = "server=localhost;uid=root;pwd=;database=ekonomisk_dashboard_database";

        [HttpGet("UserIdList")]
        public List<int>? GetUserIdList()
        {
            List<int> userIdList = new List<int>();
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT userid FROM users";

                    using(MySqlDataReader data = command.ExecuteReader())
                    {
                        while(data.Read())
                        {
                            userIdList.Add(data.GetInt32("userid"));
                        }
                    }
                }
            }
            catch(Exception exception) 
            {
                Console.WriteLine(exception.Message);
                return null;
            }
            return userIdList;
        }


        [HttpGet("SumOfExpenses")]
        public int GetSumOfExpenses(int userId)
        {
            int sumOfExpenses = 0;
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT SUM(amount) FROM expenses WHERE userid = @userId";
                    command.Parameters.AddWithValue("@userId", userId);
                    
                    using(MySqlDataReader data = command.ExecuteReader())
                    {
                        while (data.Read())
                        {
                            Console.WriteLine(data);
                            sumOfExpenses = data.GetInt32("SUM(amount)");
                        }
                    }

                    return sumOfExpenses;
                }
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception.Message);
                return 0;
            }
        }

        [HttpGet("GetIncome")]
        public int GetIncome(int userId)
        {
            int income = 0;
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT amount FROM income WHERE userid = @userId";
                    command.Parameters.AddWithValue("@userId", userId);

                    using (MySqlDataReader data = command.ExecuteReader())
                    {
                        while (data.Read())
                        {
                            Console.WriteLine(data);
                            income = data.GetInt32("amount");
                        }
                    }

                    return income;
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return 0;
            }
        }

        [HttpPost("UpdatePreviousMonthlySavings")]
        public bool UpdatePrevMonthSave(int userId, int savedThisMonth)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "UPDATE savings SET prevmonthsave = @savedThisMonth WHERE userid = @userId";
                    command.Parameters.AddWithValue("@savedThisMonth", savedThisMonth);
                    command.Parameters.AddWithValue("@userId", userId);
                    command.ExecuteNonQuery();
                }
            }
            catch(Exception exception)
            {
                Console.WriteLine("Failed to update previous monthly savings: " + exception.Message);
                return false;
            }
            return true;
        }

        [HttpPost("AddMonthlySaveToTotal")]
        public bool AddMonthlySaveToTotal(int userId, int savedThisMonth)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "UPDATE savings SET totalsaving = totalsaving + @savedThisMonth WHERE userid = @userId";
                    command.Parameters.AddWithValue("@savedThisMonth", savedThisMonth);
                    command.Parameters.AddWithValue("@userId", userId);
                    command.ExecuteNonQuery();
                }
            }
            catch(Exception exception)
            {
                Console.WriteLine("Failed to add savedThisMonth to totalsaved: " + exception.Message);
                return false;
            }
            return true;
        }

        [HttpPost("UpdateMonthlySavings")]
        public ActionResult UpdateMonthlySavings()
        {
            List<int>? userIdList = new List<int>();
            userIdList = GetUserIdList();
            try
            {
                foreach (int userId in userIdList)
                {
                    int income = GetIncome(userId);
                    int totalExpenses = GetSumOfExpenses(userId);
                    int savedThisMonth = income - totalExpenses;

                    if (savedThisMonth >= 0 && totalExpenses > 0 && savedThisMonth >= totalExpenses)
                    {
                        bool success = UpdatePrevMonthSave(userId, savedThisMonth);
                        if(success)
                        {
                            success = AddMonthlySaveToTotal(userId, savedThisMonth);
                            if (!success)
                            {
                                Console.WriteLine("AddMonthlySaveToTotal failed D:");
                            }
                        }
                        else
                        {
                            Console.WriteLine("UpdatePrevMonthSave failed D:");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"saved this month was negative on userid: {userId}, and was therefore not updated this month");
                    }
                }                
            }
            catch (Exception exception)
            {
                return StatusCode(500, "Failed to update monthly savings: " + exception.Message);
            }
            DeleteMonthlySavings();
            return StatusCode(201);
        }

        [HttpDelete("DeleteExpenses")]
        public ActionResult DeleteMonthlySavings()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "DELETE FROM expenses"; //Ska jag eventuellt göra en lista med de userid som lyckades uppdateras och endast ta bort deras expenses?
                    command.ExecuteNonQuery();
                }
            }
            catch
            {
                return StatusCode(500);
            }
            return StatusCode(200);
        }
    }
}
