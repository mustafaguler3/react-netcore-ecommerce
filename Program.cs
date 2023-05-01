using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("Connection"));
});

builder.Services.AddCors();
builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail= true;

})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddScoped<TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "http://localhost:3001");
});

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

var logger= scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await DbInitializer.Initialize(context,userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
