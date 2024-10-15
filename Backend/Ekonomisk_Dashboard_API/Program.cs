using Ekonomisk_Dashboard_API;
using Ekonomisk_Dashboard_API.Controllers;
using IEmailSender = Ekonomisk_Dashboard_API.IEmailSender;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("cors", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

// Register the StatsController as a scoped service so it can be injected into the MonthlyStatsService
builder.Services.AddScoped<SavingsController>();

// Register the MonthlyStatsService as a hosted service
builder.Services.AddHostedService<UpdateMonthlySavingsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("cors");

app.Run();
