using EmployeeCRUDAPIs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCRUDAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext context;
        public EmployeeController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromBody]Employee emp)
        {
            await context.Employees.AddAsync(emp);
            await context.SaveChangesAsync();

            return Ok(emp);

        }
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            var employees = await context.Employees.ToListAsync();

            if (employees == null || employees.Count == 0)
            {
                return NotFound();
            }

            return Ok(employees);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById([FromRoute]int id)
        {
            var employee = await context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (id != employee.EmpId)
            {
                return BadRequest();
            }

            context.Employees.Update(employee);
            await context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee([FromRoute] int id)
        {
            var employee = await context.Employees.FindAsync(id);

            if(employee == null)
            {
                return NotFound();
            }

            context.Employees.Remove(employee);
            await context.SaveChangesAsync();

            return Ok();

        }
        //[HttpGet]
        //public async Task<ActionResult<List<Employee>>> GetEmployeesByName([FromQuery] string name)
        //{
        //    var employees = await context.Employees.Where(employee => employee.EmpName == name).ToListAsync();

        //    if (employees == null || employees.Count == 0)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(employees);

        //}

    }
}
