using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Tls.Crypto.Impl.BC;

namespace Ekonomisk_Dashboard_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LimitsController : Controller
    {
        string connectionString = "server=localhost;uid=root;pwd=;database=ekonomisk_dashboard_database";
        int statusCode;
        string? statusMessage;

        [HttpGet]
        public List<Limits> GetLimits(int userId)
        {
            List<Limits> limitsList = new List<Limits>();
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT category, spendlimit from limits WHERE userid = @userId";
                    command.Parameters.AddWithValue("@userId", userId);
                    MySqlDataReader data = command.ExecuteReader();
                    while (data.Read())
                    {
                        Limits limits = new Limits
                        {
                            category = data.GetString("category"),
                            spendLimit = data.GetInt32("spendLimit")
                        };
                        limitsList.Add(limits);
                    }
                }

            }
            catch(Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not get Limits from database due to server error: " + exception.Message;                
            }
            statusCode = 200;            
            
            return limitsList;
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

                    if (String.IsNullOrEmpty(Convert.ToString(userId)))
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

        [HttpPost("PostIncome")]
        //Posts income for a single user to database
        public ActionResult PostIncome(int userid, int income)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
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
            }            

            return StatusCode(statusCode, statusMessage);
        }

        [HttpPut("PutIncome")]
        //Edits an income row in database connected to user by userId
        public ActionResult PutIncome(int userid, int income)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
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
            }             

            return StatusCode(statusCode, statusMessage);
        }

        [HttpGet("GetSaveGoal")] //This one looks very bad i know
        public int GetSaveGoal(int userId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {

                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.CommandText = "SELECT savegoal FROM savings WHERE userid = @userid";
                    command.Parameters.AddWithValue("@userid", userId);
                    int saveGoal;
                    using (MySqlDataReader data = command.ExecuteReader())
                    {

                        if (data.Read())
                        {
                            return data.GetInt32("savegoal");
                        }
                    }
                }
            }
            catch
            {
                return 0;
            }
            return 0;
        }

        [HttpGet("LimitsIncomeSaveGoal")]
        public ActionResult<LimitsIncome> LimitsIncomeSaveGoal(int userId)
        {
            
            try
            {                                           
                List<Limits> limits = GetLimits(userId);

                if(limits.Count == 0)
                {
                    return StatusCode(204);
                }

                int income = GetIncome(userId);
                int saveGoal = GetSaveGoal(userId);

                LimitsIncome limitsIncome = new LimitsIncome()
                {
                    Income = income,
                    Limits = limits,
                    saveGoal = saveGoal                   
                };
                statusCode = 200;
                return StatusCode(statusCode, limitsIncome);
                    
            }
            catch(Exception exception) 
            {
                statusCode = 500;
                statusMessage = "Could not fetch LimitsIncomeSaveGoal, server error: " + exception.Message;
                return StatusCode(statusCode, statusMessage);
            }
        }


        [HttpPost("PostIncomeLimits")] // Main POST on AddIncome (frontend)
        public ActionResult PostLimits(PostIncomeLimits incomeLimits)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    List<Limits>? prevLimits = CheckLimits(incomeLimits.userid);

                    if (!prevLimits.Any())
                    {
                        // No previous limits in database, therefore POST


                        foreach (Limits limit in incomeLimits.limits)
                        {

                            connection.Open();
                            MySqlCommand command = connection.CreateCommand();
                            command.Prepare();
                            command.CommandText = "INSERT INTO limits (userid, category, spendlimit) VALUES(@userID, @category, @spendLimit)";
                            command.Parameters.AddWithValue("@userID", limit.userId);
                            command.Parameters.AddWithValue("@category", limit.category);
                            command.Parameters.AddWithValue("@spendLimit", limit.spendLimit);

                            if (String.IsNullOrEmpty(Convert.ToString(incomeLimits.userid)) || String.IsNullOrEmpty(limit.category) || String.IsNullOrEmpty(Convert.ToString(limit.spendLimit)))
                            {
                                statusMessage = "Essential data missing when posting limits";
                                statusCode = 400;
                                connection.Close();
                                return StatusCode(statusCode, statusMessage);
                            }
                            command.ExecuteNonQuery();
                            connection.Close();
                        }

                        PostIncome(incomeLimits.userid, incomeLimits.income);
                    }
                    else
                    {
                        // There are entries in database, therefore PUT

                        foreach (Limits newLimit in incomeLimits.limits)
                        {
                            Limits? prevLimit = prevLimits.FirstOrDefault(p => p.category == newLimit.category);

                            if (prevLimit != null)
                            {
                                PutLimit(newLimit.spendLimit, prevLimit.userId, prevLimit.category);
                            }
                        }

                        PutIncome(incomeLimits.userid, incomeLimits.income);
                    }
                    PutSaveGoal(incomeLimits.userid, incomeLimits.saveGoal);
                }

            }
            catch (Exception exception)
            {

                statusCode = 500;
                statusMessage = "Could not post limits to database due to server error: " + exception.Message;

                return StatusCode(statusCode, statusMessage);
            }
            statusCode = 201;
            statusMessage = "Successfully posted Limits to database!";

            return StatusCode(statusCode, statusMessage);
        }



        [HttpPut("SaveGoal")]
        public ActionResult PutSaveGoal(int userId, int saveGoal)
        {
            try
            {
                using(MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "UPDATE savings SET savegoal = @saveGoal WHERE userid = @userId";
                    command.Parameters.AddWithValue("@saveGoal", saveGoal);
                    command.Parameters.AddWithValue("@userId", userId);
                    command.ExecuteNonQuery();

                    statusCode = 200;
                    statusMessage = "Successfully updated savegoal";
                    return StatusCode(statusCode, statusMessage);
                }
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not put saveGoal in database, server error: " + exception.Message;
                return StatusCode(statusCode, statusMessage);
            }
        }

        [HttpPut]
        public ActionResult PutLimit(int newSpendLimit, int userId, string category)
        {
            int statusCode;
            string statusMessage;

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "UPDATE limits SET spendlimit = @spendlimit WHERE userid = @userId AND category = @category";
                    command.Parameters.AddWithValue("@spendlimit", newSpendLimit);
                    command.Parameters.AddWithValue("@userId", userId);
                    command.Parameters.AddWithValue("@category", category);
                    command.ExecuteNonQuery();

                    statusCode = 201;
                    statusMessage = "Successfully updated limit";
                }

                return StatusCode(statusCode, statusMessage);
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not post limit, server error: " + exception.Message;
                return StatusCode(statusCode, statusMessage);
            }
        }


        [HttpGet("CheckLimits")] //WORKS
        public List<Limits>? CheckLimits(int userId)
        {
            try
            {
                using(MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    
                    List<Limits> limitsList = new List<Limits>();

                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "SELECT * FROM LIMITS WHERE userid = @userId";
                    command.Parameters.AddWithValue("@userId", userId);
                    MySqlDataReader data = command.ExecuteReader();
                    while(data.Read())
                    {
                        Limits limits = new Limits();
                        limits.id = data.GetInt32("id");
                        limits.userId = data.GetInt32("userid");
                        limits.category = data.GetString("category");
                        limits.spendLimit = data.GetInt32("spendlimit");
                        limitsList.Add(limits);
                    }
                    return limitsList;
                }
                
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        [HttpDelete]
        public ActionResult DeleteLimits(int userId)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = connection.CreateCommand();
                    command.Prepare();
                    command.CommandText = "DELETE * FROM limits WHERE userid = @userId";
                    command.Parameters.AddWithValue("@userId", userId);
                    command.ExecuteNonQuery();
                }
            
            }
            catch (Exception exception)
            {
                statusCode = 500;
                statusMessage = "Could not delete all limits due to server error: " + exception.Message;
                
                return StatusCode(statusCode, statusMessage);
            }
            statusCode = 200;
            statusMessage = "Successfully deleted all limits from database";
            
            return StatusCode(statusCode, statusMessage);
        }
    }
}
