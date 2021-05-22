using Hospital.Core.Infrastructure;
using Hospital.Core.Models.Jwt;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Microsoft.AspNetCore.Http.Features;

namespace Hospital.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var token = Configuration.GetSection("tokenManagement").Get<TokenManagement>();
            services.AddSingleton<IDbClient, DbClient>();
            services.AddSingleton(token);
            services.Configure<HospitalDbConfig>(Configuration);
            services.AddTransient<IHospitalServices, HospitalServices>();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        //builder.WithOrigins("http://example.com",
                        //                    "http://www.contoso.com");
                        builder.WithOrigins()
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();

                    });
            });
            
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = token.Issuer,
                    ValidateAudience = true,
                    ValidAudience = token.Audience,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token.Secret))
                };
            });
           
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hospital.WebAPI", Version = "v1" });
                // add JWT Authentication
                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "Enter JWT Bearer token **_only_**",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer", // must be lower case
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securityScheme, new string[] { }}
                });

                services.Configure<FormOptions>(o =>  // currently all set to max, configure it to your needs!
                {
                    o.ValueLengthLimit = int.MaxValue;
                    o.MultipartBodyLengthLimit = long.MaxValue; // <-- !!! long.MaxValue
                    o.MultipartBoundaryLengthLimit = int.MaxValue;
                    o.MultipartHeadersCountLimit = int.MaxValue;
                    o.MultipartHeadersLengthLimit = int.MaxValue;
                });
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hospital.WebAPI v1"));
            }

            app.Use(async (context, next) =>
            {
                context.Features.Get<IHttpMaxRequestBodySizeFeature>().MaxRequestBodySize = null; // unlimited I guess
                await next.Invoke();
            });

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("MVC didn't find anything!");
            });
        }
    }
}
