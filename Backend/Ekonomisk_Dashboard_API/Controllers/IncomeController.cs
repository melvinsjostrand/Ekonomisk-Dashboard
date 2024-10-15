using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace Ekonomisk_Dashboard_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IncomeController : Controller
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;uid=root;pwd=;database=ekonomisk_dashboard_database");
        int statusCode;
        string? statusMessage;
        

        [HttpGet]
        //fetches income for a single user by userId
        public ActionResult GetIncome(int userId)
        {
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "SELECT amount FROM income WHERE userid = @userid";
                command.Parameters.AddWithValue("@userid", userId);

                if (String.IsNullOrEmpty(Convert.ToString(userId)) )
                {
                    statusCode = 400;
                    statusMessage = "Could not fetch income amount, missing userid";
                    return StatusCode(statusCode, statusMessage);
                }

                MySqlDataReader data = command.ExecuteReader();
                data.Read();
                Income income = new Income();
                income.income = data.GetInt32("amount");

                statusCode = 200;
                return StatusCode(statusCode, income);
            }
            catch(Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not fetch income amount, server error: " + exception.Message;                
            }
            return StatusCode(statusCode, statusMessage);
        }

        [HttpPost]
        //Posts income for a single user to database
        public ActionResult CreateIncome(int userid, int income)
        {
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "INSERT INTO income (userid, amount) VALUES(@userId, @incomeAmount)";
                command.Parameters.AddWithValue("@userId", userid);
                command.Parameters.AddWithValue("incomeAmount", income);

                command.ExecuteNonQuery();

                statusCode = 201;
                statusMessage = "Successfully posted income to database";
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to post income to database: " + exception.Message;
            }

            return StatusCode(statusCode, statusMessage);
        }

        [HttpPut]
        //Edits an income row in database connected to user by userId
        public ActionResult EditIncome(int userid, int income)
        {
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "UPDATE income SET amount = @incomeAmount WHERE userid = @userId";
                command.Parameters.AddWithValue("@incomeAmount", income);
                command.Parameters.AddWithValue("@userId", userid);

                command.ExecuteNonQuery();

                statusCode = 200;
                statusMessage = "Sucessfully edited income in database";
                
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to edit income to database: " + exception.Message;
            }

            return StatusCode(statusCode, statusMessage);
        }
    }
}
