using Pinewood.Customers.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Pinewood.Customers.Infrastructure.Data.Repositories;
using AutoMapper;
using Pinewood.Customers.API;
using Pinewood.Customers.API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

//get congurations
var connectionString = builder.Configuration.GetConnectionString("CustomersApp");

// Add services to the container.
builder.Services.AddDbContext<CustomersAppEfDataContext>(options =>
{
    options.UseSqlServer(connectionString);
});

//add repositories
builder.Services.AddScoped<ICustomerTypeRepository, CustomerTypeRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();

//auto mapper
IMapper mapper = MappingConfig.RegisterTypes().CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("https://localhost:7216")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
}); 

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

//Use CROS Orgion Policy in Your Application
app.UseCors("AllowSpecificOrigin"); 

app.UseHttpsRedirection();

app.UseCors(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
