using Ekonomisk_Dashboard_API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ekonomisk_Dashboard_API
{
    public class UpdateMonthlySavingsService : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly IServiceScopeFactory _scopeFactory;

        public UpdateMonthlySavingsService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            ScheduleNextRun(); 
            return Task.CompletedTask;
        }

        private void ScheduleNextRun()
        {
            
            DateTime now = DateTime.Now;
            DateTime nextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(1);  
            TimeSpan timeUntilNextMonth = nextMonth - now;

            
            _timer = new Timer(UpdateMonthlySavings, null, timeUntilNextMonth, Timeout.InfiniteTimeSpan);
            

            //TimeSpan timeUntilNextRun = TimeSpan.FromSeconds(10);

            
            //_timer = new Timer(UpdateMonthlySavings, null, timeUntilNextRun, Timeout.InfiniteTimeSpan);
        }

        private async void UpdateMonthlySavings(object state)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var controller = scope.ServiceProvider.GetRequiredService<SavingsController>();
                var result = controller.UpdateMonthlySavings();

                if (result is OkObjectResult)
                {
                    Console.WriteLine("Monthly savings updated successfully.");
                }
                else
                {
                    Console.WriteLine("Failed to update monthly savings.");
                }
            }

            // After updating the savings, schedule the next run (next month)
            ScheduleNextRun();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
