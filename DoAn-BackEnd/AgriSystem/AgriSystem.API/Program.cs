using AgriSystem.Data;
using AgriSystem.Service;
using AgriSystem.Service.Mapping;

var builder = WebApplication.CreateBuilder(args);

// Add Cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("*")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


// Add AutoMapper (use extension DIAutoMapper)
builder.Services.AddAutoMapper(typeof(ProfileMapper));

// Add services to the container.
builder.Services.AddControllers();

// Add Db context
builder.Services.AddDbContext<AgriSystemContext>();

// Add other services
builder.Services.AddDependencyInjectionExtension();

// Add Authentication
builder.Services.AddJWTExtension((builder.Configuration));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

// add static file
app.AddStaticFileExtension();

app.MapControllers();

app.Run("http://[::]:5268");
