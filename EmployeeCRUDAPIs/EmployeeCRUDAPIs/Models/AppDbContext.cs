using Microsoft.EntityFrameworkCore;

namespace EmployeeCRUDAPIs.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) 
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
