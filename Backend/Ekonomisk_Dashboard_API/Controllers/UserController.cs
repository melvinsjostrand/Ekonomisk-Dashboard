using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using Org.BouncyCastle.Asn1.Mozilla;
using Org.BouncyCastle.Pkix;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Ekonomisk_Dashboard_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IEmailSender _emailSender;
        private MySqlConnection connection;
        public UserController(IEmailSender emailSender)
        {
            this._emailSender = emailSender;
            connection = new MySqlConnection("server=localhost;uid=root;pwd=;database=ekonomisk_dashboard_database");

        }
        
        int statusCode;
        string? statusMessage;
        public static Hashtable sessionId = new Hashtable();
        
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            var token = Guid.NewGuid().ToString();
            var tokenExpiry = DateTime.UtcNow.AddMinutes(10);

            try
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.password);

                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.Prepare();
                command.CommandText = "INSERT INTO pendingUser (pendingUser.username, pendingUser.password, pendingUser.mail, pendingUser.pastsavings, pendingUser.Token, pendingUser.TokenExpiry) VALUES(@name, @password, @email, @pastsaving, @token, @tokenExpiry)";
                command.Parameters.AddWithValue("@name", user.username);
                command.Parameters.AddWithValue("@email", user.mail);
                command.Parameters.AddWithValue("@password", hashedPassword);
                command.Parameters.AddWithValue("@pastsaving", user.pastSavings);
                command.Parameters.AddWithValue("@token", token);
                command.Parameters.AddWithValue("@tokenExpiry", tokenExpiry);

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

                if(IsValidEmail(user.mail))
                {
                    command.ExecuteNonQuery();

                } else
                {
                    return StatusCode(400, "email is bad");
                }


                


                var receiver = user.mail;
                var subject = "Confirm Your Account Creation";
                var confirmationLink = Url.Action("ConfirmUser", "User", new { token = token }, Request.Scheme);

                Console.WriteLine("confirmationlink: " + confirmationLink);

                var bodyMessage = $@"
                    <p>Dear {user.username},</p>
                    <p>Thank you for signing up! To complete your registration and activate your account, please verify your email by clicking the button below</p>
                    <a href='{confirmationLink}' style='color:blue;text-decoration:none;font-weight:bold;cursor:pointer;'>Confirm</a>
                    <p> If you did not create an account with us, you can safely ignore this email. Thank you</p>
                    <p>This link will expire in 10 minutes</p>";

                await _emailSender.SendEmailAsync(receiver, subject, bodyMessage);

                return StatusCode(200, "Confirmation email sent. Please confirm within 10 minutes.");

                //statusCode = 200;
                //statusMessage = "Successfully created user";
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

        [HttpGet("ConfirmUser")]
        public async Task<IActionResult> ConfirmUser(string token)
        {
            try
            {
                connection.Open();
                MySqlCommand query = connection.CreateCommand();
                query.CommandText = "SELECT * FROM pendinguser WHERE Token = @token AND TokenExpiry > @currentDate";
                query.Parameters.AddWithValue("@token", token);
                query.Parameters.AddWithValue("@currentDate", DateTime.UtcNow);

                var data = query.ExecuteReader();
                if (data.Read())
                {
                    // Token is valid, proceed with account creation
                    string username = data.GetString("username");
                    string passwordHash = data.GetString("password");
                    string mail = data.GetString("mail");

                    data.Close();

                    // Create user in the actual user table
                    query.CommandText = "INSERT INTO users (username, password, mail) " +
                                        "VALUES(@username, @password, @mail)";
                    query.Parameters.Clear();
                    query.Parameters.AddWithValue("@username", username);
                    query.Parameters.AddWithValue("@password", passwordHash);
                    query.Parameters.AddWithValue("@mail", mail);

                    query.ExecuteNonQuery();

                    // Delete pending user
                    query.CommandText = "DELETE FROM pendinguser WHERE Token = @token";
                    query.Parameters.AddWithValue("@token", token);
                    query.ExecuteNonQuery();

                    // Return a success message with auto-close functionality
                    return Content(@"
                <html>
                    <head>
                        <title>Account Confirmed</title>
                    </head>
                    <body>
                        <p>Your account has been confirmed and created successfully.</p>
                        <p>This window will close automatically in 1 seconds.</p>
                        <script>
                            setTimeout(function() {
                                window.close();
                            }, 1000); // Close the window after 1 seconds
                        </script>
                    </body>
                </html>", "text/html");
                }
                else
                {
                    return BadRequest("Invalid or expired token.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }




        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
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

                connection.Close();

                statusCode = 201;
                statusMessage = "Successfully created row for user in savings";
            }
            catch(Exception exception)
            {
                connection.Close();
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
                connection.Close();
                return userId;
            }
            catch(Exception exception)
            {
                Console.WriteLine("Could not fetch userid by mail, server error: " + exception.Message);
                connection.Close();
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
