using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using Org.BouncyCastle.Asn1.Mozilla;
using Org.BouncyCastle.Pkix;
using System.Collections;
using System.Text;

namespace Ekonomisk_Dashboard_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;uid=root;pwd=;database=ekonomisk_dashboard_database");
        int statusCode;
        string? statusMessage;
        public static Hashtable sessionId = new Hashtable();



        [HttpPost]
        public ActionResult CreateUser(User user)
        {
            try
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.password);

                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "INSERT INTO users (users.username, users.password, users.mail, users.pastSaving) VALUES(@name, @password, @email, @pastsaving)";
                command.Parameters.AddWithValue("@name", user.username);
                command.Parameters.AddWithValue("@email", user.mail);
                command.Parameters.AddWithValue("@password", hashedPassword);
                command.Parameters.AddWithValue("@pastsaving", user.pastSavings);


                if (String.IsNullOrEmpty(user.password) || (String.IsNullOrEmpty(user.username)) || (String.IsNullOrEmpty(user.mail)))
                {
                    connection.Close();
                    return StatusCode(400, "Failed to create user, essential data missing");
                }
                else if(!CheckIfUniqueUserDataExists(user.username, user.mail))
                {
                    connection.Close();
                    return StatusCode(401, "Failed to create user, email or username already in use");
                }

                command.ExecuteNonQuery();

                statusCode = 200;
                statusMessage = "Successfully created user";
            }
            catch(Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to create user, server error: " + exception;
            }
            connection.Close();

            int userId = GetUserIdbyMail(user.mail);
            CreateSavingsRow(userId, user.pastSavings);

            return StatusCode(statusCode, statusMessage);
        }

        [HttpPost("SavingsNewUser")]
        public ActionResult CreateSavingsRow(int userId, int prevSave)
        {
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "INSERT INTO savings (userid, totalsaving) VALUES(@userId, @totalsaving)";
                command.Parameters.AddWithValue("@userId", userId);
                command.Parameters.AddWithValue("@totalsaving", prevSave);
                command.ExecuteNonQuery();

                statusCode= 201;
                statusMessage = "Successfully created row for user in savings";
            }
            catch(Exception exception)
            {
                statusCode = 500;
                statusMessage = "Failed to create row for user in savings, server error: " + exception.Message;
            }
            return StatusCode(statusCode, statusMessage);
        }

        [HttpGet("GetUserByMail")]
        public int GetUserIdbyMail(string mail)
        {
            int userId = 0;
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "SELECT userid FROM users WHERE mail = @mail";
                command.Parameters.AddWithValue("@mail", mail);
                using (MySqlDataReader data = command.ExecuteReader())
                {
                    while (data.Read())
                    {
                        userId = data.GetInt32("userid");
                    }
                }

                return userId;
            }
            catch(Exception exception)
            {
                Console.WriteLine("Could not fetch userid by mail, server error: " + exception.Message);
                return 0;
            }
        }

        private bool CheckIfUniqueUserDataExists(string name, string email)
        {
            bool checkUniqueUser = true;
            try
            {
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "SELECT * FROM users WHERE mail = @userMail OR username = @userName";
                command.Parameters.AddWithValue("@userName", name);
                command.Parameters.AddWithValue("@userMail", email);
                MySqlDataReader data = command.ExecuteReader();

                if (data.Read())
                {
                    if (data.GetString("mail") == email)
                    {
                        checkUniqueUser = false;
                    }
                    if (data.GetString("username") == name)
                    {
                        checkUniqueUser = false;
                    }
                }
                data.Close();
            }
            catch (Exception exception)
            {
                Console.WriteLine($"UserController.CheckIfUniqueUserDataExists: {exception.Message}");
            }

            return checkUniqueUser;
        }
        private User DecodeUser(User user, string auth)
        {
            if (auth != null && auth.StartsWith("Basic"))
            {
                string encodedUsernamePassword = auth.Substring("Basic ".Length).Trim();
                Encoding encoding = Encoding.GetEncoding("UTF-8");
                string usernamePassword = encoding.GetString(Convert.FromBase64String(encodedUsernamePassword));
                int seperatorIndex = usernamePassword.IndexOf(':');
                user.mail = usernamePassword.Substring(0, seperatorIndex);
                user.password = usernamePassword.Substring(seperatorIndex + 1);
            }
            else
            {                
                throw new Exception("The authorization header is either empty or isn't Basic.");
            }
            return user;
        }

        [HttpGet("VerifyUserId")]
        public ActionResult VerifyUserId()
        {
            string? auth = HttpContext.Request.Headers["Authorization"];
            if (auth == null || !sessionId.ContainsKey(auth))
            {
                return StatusCode(403, "0");
            }
            User user = (User)sessionId[auth];
            return StatusCode(200, user.id);
        }

        [HttpGet("Login")] 
        public ActionResult Login() 
        {
            string? auth = HttpContext.Request.Headers["Authorization"];
            User user = DecodeUser(new User(), auth);
            connection.Open();
            MySqlCommand command = connection.CreateCommand();
            command.Prepare();
            command.CommandText = "SELECT * FROM users WHERE mail = @mail";
            command.Parameters.AddWithValue("@mail", user.mail);
            MySqlDataReader data = command.ExecuteReader();
            try
            {
                string passwordHash = String.Empty;

                while (data.Read())
                {
                    passwordHash = data.GetString("password");
                    user.id = data.GetInt32("userid");
                    user.mail = data.GetString("mail");
                }

                if (passwordHash != string.Empty && BCrypt.Net.BCrypt.Verify(user.password, passwordHash))
                {
                    Guid guid = Guid.NewGuid();
                    string key = guid.ToString();
                    Console.WriteLine(key);
                    sessionId.Add(key, user);
                    connection.Close();
                    return Ok(new { token = key });
                }

                connection.Close();
                return StatusCode(400);
            }
            catch (Exception exception)
            {
                connection.Close();
                Console.WriteLine($"Login failed: {exception.Message}");
                return StatusCode(500);
            }
        }
    }
}
