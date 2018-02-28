using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PatientsApp.Startup))]
namespace PatientsApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
