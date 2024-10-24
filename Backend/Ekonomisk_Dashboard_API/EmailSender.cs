﻿using System.Net.Mail;
using System.Net;

namespace Ekonomisk_Dashboard_API
{
    public class EmailSender : IEmailSender
    {
        private readonly string _emailFrom;
        private readonly string _emailPassword;
        private readonly string _smtpHost;
        private readonly int _smtpPort;

        public EmailSender(IConfiguration configuration)
        {
            // Load email settings from appsettings.json or other configuration source
            _emailFrom = configuration["EmailSettings:EmailFrom"];
            _emailPassword = configuration["EmailSettings:EmailPassword"];
            _smtpHost = configuration["EmailSettings:SmtpHost"];
            _smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"]);
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                using (var client = new SmtpClient(_smtpHost, _smtpPort))
                {
                    client.EnableSsl = true;
                    client.Credentials = new NetworkCredential(_emailFrom, _emailPassword);

                    using (var mailMessage = new MailMessage())
                    {
                        mailMessage.From = new MailAddress(_emailFrom, "Verification Mail");
                        mailMessage.To.Add(email);
                        mailMessage.Subject = subject;

                        // Set the body to HTML content
                        mailMessage.Body = message;
                        mailMessage.IsBodyHtml = true; // Ensure the body is treated as HTML

                        await client.SendMailAsync(mailMessage);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
                throw; // Optional: rethrow or handle based on your app's requirements
            }
        }
    }
}
