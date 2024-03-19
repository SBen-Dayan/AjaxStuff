using Ajax.Data;
using Ajax.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Ajax.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly PeopleRepository _repo = new(@"Data Source=.\sqlexpress; Initial Catalog=Practice; Integrated Security=True;");

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            List<Person> people = _repo.GetAll();
            return Json(people);
        }

        public IActionResult GetPerson(int id)
        {
            return Json(_repo.GetPerson(id));
        }

        [HttpPost]
        public void EditPerson(Person person)
        {
            _repo.Update(person);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            _repo.DeletePerson(id);
        }

        //[HttpPost]
        //public void DeletePeople(List<int> ids)
        //{
        //    _repo.DeletePeople(ids);
        //}

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            _repo.Add(person);
            return Json(person);
        }
    }

    public class Foo
    {
       public int Id;
    }
}