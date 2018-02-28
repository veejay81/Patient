using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PatientsApp.Controllers
{
    public class patientsController : ApiController
    {
        studentDBEntities objapi = new studentDBEntities();

       // USP_Student_Select_Result objDBAPI = new USP_Student_Select_Result();


        // to Search  Details and display the result
        [HttpGet]
        public IEnumerable<USP_Student_Select_Result> Get(string  Name, string Medicare)
        {
            if (Name == null)
                Name = "";
            if (Medicare == null)
                Medicare = "";
            return objapi.USP_Student_Select(Name, Medicare).AsEnumerable();


        }


        // To Insert new  Details
        public IEnumerable<string> insertStudent(string StudentName, string StudentEmail, string Phone, string Address)
        {
            return objapi.USP_Student_Insert(StudentName, StudentEmail, Phone, Address).AsEnumerable();
        }

        //to Update Student Details
        [HttpGet]
        public IEnumerable<string> update(int ID,string Name, string Medicare, string Phone, string Address)
        {
            if (ID > 0)
                return objapi.USP_Student_Update(ID, Name, Medicare, Phone, Address).AsEnumerable();
            else
                return objapi.USP_Student_Insert(Name, Medicare, Phone, Address).AsEnumerable();
        }


        //to Update Student Details
        [HttpGet]
        public string delete(int ID)
        {
            objapi.USP_Student_Delete(ID);
            objapi.SaveChanges();
            return "deleted";
        }
    }
}
