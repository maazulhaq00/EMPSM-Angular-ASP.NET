using System.ComponentModel.DataAnnotations;

namespace EmployeeCRUDAPIs.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public string EmpEmail { get; set; }
        public int EmpSalary { get; set; }
    }
}
