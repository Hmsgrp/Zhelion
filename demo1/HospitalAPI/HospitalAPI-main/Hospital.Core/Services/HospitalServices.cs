using Hospital.Core.Infrastructure;
using Hospital.Core.Models;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Core.Operations;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System.Net.Mail;

namespace Hospital.Core.Services
{
    public class HospitalServices : IHospitalServices
    {
        private readonly IMongoCollection<Role> _roles;
        private readonly IMongoCollection<Hospitaal> _hospitals;
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Lab> _labs;
        private readonly IMongoCollection<Test> _tests;
        private readonly IMongoCollection<TestParameter> _testParameters;
        private readonly IMongoCollection<UserHospitalMap> _userHospitals;
        private readonly IMongoCollection<Menu> _menus;
        private readonly IMongoCollection<MenuRoleMap> _menuRoleMaps;
        private readonly IMongoCollection<PaySplitUp> _paySplitUps;
        private readonly IMongoCollection<MappingURL> _mappingURLS;
        private readonly IMongoCollection<TestMap> _testMaps;
        private readonly IMongoCollection<Counter> _counterColvals;
        private readonly IMongoCollection<PrescriptionOrder> _prescriptionOrders;
        private readonly IMongoCollection<PaymentHistory> _payHistory;
        private readonly IMongoCollection<Result> _results;
        private readonly IMongoCollection<Notification> _notifications;
        private readonly IMongoCollection<LabMapping> _labMapping;
        private readonly IMongoCollection<RetryOrder> _retryOrder;

        private readonly IConfiguration _iconfiguration;
        private static Random random = new Random();
        readonly ExceptionResult excep = new ExceptionResult();
        public HospitalServices(IDbClient dbClient, IConfiguration iconfiguration)
        {
            _roles = dbClient.GetRolesCollection();
            _hospitals = dbClient.GetHospitalsCollection();
            _users = dbClient.GetUsersCollection();
            _labs = dbClient.GetLabsCollection();
            _tests = dbClient.GetTestsCollection();
            _testParameters = dbClient.GetTestParametersCollection();
            _userHospitals = dbClient.GetUserHospitalsCollection();
            _menus = dbClient.GetMenusCollection();
            _menuRoleMaps = dbClient.GetMenuRoleMapsCollection();
            _paySplitUps = dbClient.GetSplitUpsCollection();
            _mappingURLS = dbClient.GetMappingURLCollection();
            _testMaps = dbClient.GetTestMapCollection();
            _iconfiguration = iconfiguration;
            _counterColvals = dbClient.GetCountersCollection();
            _prescriptionOrders = dbClient.GetPrescriptionOrdersCollection();
            _payHistory = dbClient.GetPaymentHistoryCollection();
            _results = dbClient.GetResultCollection();
            _notifications = dbClient.GetNotificationCollection();
            _labMapping = dbClient.GetLabMappingCollection();
            _retryOrder = dbClient.GeRetryOrderCollection();
        }

        public Hospitaal AddHospital(Hospitaal hospital)
        {
            hospital.HospitalId = Guid.NewGuid().ToString();
            hospital.CreatedDate = DateTime.Now;
            _hospitals.InsertOne(hospital);
            return hospital;
        }

        public void DeleteHospital(string id)
        {
            _hospitals.DeleteOne(hospital => hospital.HospitalId == id);
        }

        public Hospitaal GetHospital(string id)
        {
            return _hospitals.Find(hospital => hospital.HospitalId == id).First();
        }

        public List<Hospitaal> GetHospitals()
        {
            return _hospitals.Find(hospital => true).ToList();
        }

        public List<Hospitaal> GetHospitalsV2()
        {
            List<Hospitaal> lh = new List<Hospitaal>();
            var results = _hospitals.Find(Builders<Hospitaal>.Filter.Eq(hospital => hospital.IsActive, true))
                        .Project(u => new { u.HospitalId, u.HospitalAddress,u.HospitalName,u.PhoneNumber,u.ContactPerson,u.CreatedDate }).ToList();
            foreach(var res in results)
            {
                Hospitaal h = new Hospitaal();
                h.HospitalId = res.HospitalId;
                h.HospitalAddress = res.HospitalAddress;
                h.HospitalName = res.HospitalName;
                h.PhoneNumber = res.PhoneNumber;
                h.ContactPerson = res.ContactPerson;
                h.CreatedDate = res.CreatedDate;
                h.HospitalLogo = "";

                lh.Add(h);
            }

            return lh;
        }
        public Hospitaal UpdateHospital(Hospitaal hospital)
        {
            GetHospital(hospital.HospitalId);
            _hospitals.ReplaceOne(h => h.HospitalId == hospital.HospitalId, hospital);
            return hospital;
        }

        public void DeleteRole(string id)
        {
            _roles.DeleteOne(role => role.RoleId == id);
        }
        /***********************************************************************************************************************/
        public Role AddRole(Role role)
        {
            role.RoleId = Guid.NewGuid().ToString();
            role.CreatedDate = DateTime.Now;
            _roles.InsertOne(role);
            return role;
        }

        public Role GetRole(string id)
        {
            return _roles.Find(role => role.RoleId == id).First();
        }

        public List<Role> GetRoles()
        {
            return _roles.Find(role => true).ToList();
        }

        public Role UpdateRole(Role role)
        {
            GetRole(role.RoleId);
            _roles.ReplaceOne(r => r.RoleId == role.RoleId, role);
            return role;
        }
        /*********************************************************************************************************/

        public List<User> GetUsers()
        {
            var users = _users.Find(user => true).ToList();

            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].HospitalId!=null && users[i].UserName.Contains(users[i].HospitalId))
                    users[i].UserName = users[i].UserName.Replace(users[i].HospitalId.ToString(), "");
            }
            return users;
        }
        public User GetUser(string id)
        {
            return _users.Find(user => user.UserID == id).First();
        }

        public User GetUserbyPatientID(string id)
        {
            return _users.Find(user => user.Hospital_PID == id).First();
        }

        public User GetUserByUserName(string userName)
        {
            return _users.Find(user => user.UserName == userName).First();
        }
        public User AddUser(User user)
        {

            user.UserID = Guid.NewGuid().ToString();
            user.Password = user.Password;
            if(string.IsNullOrEmpty(user.UserName))
            {
                user.FullName = user.UserName;
            }
            user.CreatedDate = DateTime.Now;
            _users.InsertOne(user);
            return user;
        }

        public User AddLabUser(User user)
        {
            var _role = _roles.Find(i => i.RoleName.ToLower().Contains("lab")).FirstOrDefault();
            user.UserID = Guid.NewGuid().ToString();
            user.Password = user.Password;
            user.UserName = user.UserName;
            user.FullName = user.UserName;
            user.CreatedDate = DateTime.Now;
            user.RoleId = _role.RoleId;
            user.IsRegistered = true;
            user.IsActive = true;
            _users.InsertOne(user);
            return user;
        }


        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string RandomNumber(int length)
        {
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        public ExceptionResult CheckEmailId(User user)
        {
            var emailId = _users.Find(u => u.EmailId == user.EmailId).FirstOrDefault();
            if (emailId != null)
            {
                if (!string.IsNullOrEmpty(emailId.EmailId))
                {
                    GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", _iconfiguration.GetSection("ErrorMessage").GetSection("ErrEmailId").Value);
                }
            }
            return excep;
        }

        public ExceptionResult CheckUserName(User user)
        {
            var userId = _users.Find(u => u.UserName == user.UserName).FirstOrDefault();
            if (userId != null)
            {
                if (!string.IsNullOrEmpty(userId.UserName))
                {
                    GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", _iconfiguration.GetSection("ErrorMessage").GetSection("ErrUserName").Value);
                }
            }
            return excep;
        }

        private void GetSetErrorInfo(ExceptionResult excep, int code, string errorType, string errorDetail)
        {
            excep.httpStatus = code;
            excep.httpStatusText = errorType;
            excep.errorDetails = errorDetail;
        }


        public void DeleteUser(string id)
        {
            _users.DeleteOne(user => user.UserID == id);
        }
        public User UpdateUser(User user)
        {
            GetUser(user.UserID);
            _users.ReplaceOne(u => u.UserID == user.UserID, user);
            return user;
        }

        public User UpdatePatient(User user)
        {
            var _user = GetUser(user.UserID);
            _user.IsActive = true;
            _user.HospitalId = user.HospitalId;
            _user.IsRegistered = true;
            _user.Password = user.Password;

            _users.ReplaceOne(u => u.UserID == user.UserID, _user);
            var _mapurl = GetMappingURLByUserid(user.UserID);
            _mapurl.IsActive = false;
            _mappingURLS.ReplaceOne(m => m.UserID == _mapurl.UserID, _mapurl);
            return user;
        }

        /*********************************************************************************************************/

        public List<LabMappingresult> GetLabs()
        {
            var labresults = _labs.Find(lab => true).ToList();
            List<LabMappingresult> labMappingresult = new List<LabMappingresult>();
            foreach (var labresult in labresults)
            {
                LabMappingresult lmr = new LabMappingresult();
                lmr.LabId = labresult.LabId;
                lmr.LabName = labresult.LabName;
                lmr.HospitalID = _labMapping.Find(lab => lab.LabID == lmr.LabId).First().HospitalID;
                lmr.LabName = labresult.LabName;
                lmr.LabAddress = labresult.LabAddress;
                lmr.PhoneNumber = labresult.PhoneNumber;
                lmr.LandlineNumber = labresult.LandlineNumber;
                lmr.UserId = labresult.UserId;
                lmr.CreatedDate = labresult.CreatedDate;
                labMappingresult.Add(lmr);
            }
            return labMappingresult;
        }

        public Hospitaal GetSelectedHospitalforLabUser(string UserID)
        {
            var lab = _labs.Find(i => i.UserId == UserID).FirstOrDefault();
            LabMapping lb = new LabMapping();
            if (lab !=null)
            {
                lb = _labMapping.Find(i => i.LabID == lab.LabId).FirstOrDefault();
                return _hospitals.Find(i => i.HospitalId == lb.HospitalID).FirstOrDefault();
            }
            else
            {
                return new Hospitaal();
            }      
        }
        public Lab AddLab(Lab lab,LabMapping labmapping)
        {
            lab.LabId = Guid.NewGuid().ToString();
            lab.CreatedDate = DateTime.Now;
            _labs.InsertOne(lab);
            labmapping.LabMappingId = Guid.NewGuid().ToString();
            labmapping.LabID = lab.LabId;
            labmapping.HospitalID = labmapping.HospitalID;
            _labMapping.InsertOne(labmapping);
            return lab;
        }
        public LabMappingresult GetLab(string id)
        {
            var labresult = _labs.Find(user => user.LabId == id).First();
            var labMappingresult = _labMapping.Find(lab => lab.LabID == id).First();
            LabMappingresult lmr = new LabMappingresult();
            lmr.LabId = labresult.LabId;
            lmr.LabName = labresult.LabName;
            lmr.HospitalID = labMappingresult.HospitalID;
            lmr.LabName = labresult.LabName;
            lmr.LabAddress = labresult.LabAddress;
            lmr.PhoneNumber = labresult.PhoneNumber;
            lmr.LandlineNumber = labresult.LandlineNumber;
            lmr.UserId = labresult.UserId;
            lmr.CreatedDate = labresult.CreatedDate;

            return lmr;
        }
        public void DeleteLab(string id)
        {
            _labs.DeleteOne(lab => lab.LabId == id);
        }
        public Lab UpdateLab(Lab lab)
        {
            GetUser(lab.LabId);
            _labs.ReplaceOne(u => u.LabId == lab.LabId, lab);
            return lab;
        }


        /*********************************************************************************************************/

        public List<Test> GetTests()
        {
            return _tests.Find(test => true).ToList();
        }
        public Test AddTest(Test test)
        {
            test.TestId = Guid.NewGuid().ToString();
            test.CreatedDate = DateTime.Now;
            _tests.InsertOne(test);
            return test;
        }
        public Test GetTest(string id)
        {
            return _tests.Find(test => test.TestId == id).First();
        }
        public void DeleteTest(string id)
        {
            _tests.DeleteOne(test => test.TestId == id);
        }
        public Test UpdateTest(Test test)
        {
            GetTest(test.TestId);
            _tests.ReplaceOne(t => t.TestId == test.TestId, test);
            return test;
        }

        /*********************************************************************************************************/

        public List<TestParameter> GetTestParameters()
        {
            return _testParameters.Find(test => true).ToList();
        }
        public TestParameter AddTestParameter(TestParameter test)
        {
            test.TestParameterId = Guid.NewGuid().ToString();
            test.CreatedDate = DateTime.Now;
            _testParameters.InsertOne(test);
            return test;
        }
        public List<TestParameter> GetTestParameter(string id)
        {
            return _testParameters.Find(test => test.TestId == id).ToList();
        }
        public void DeleteTestParameter(string id)
        {
            _testParameters.DeleteOne(test => test.TestParameterId == id);
        }
        public TestParameter UpdateTestParameter(TestParameter test)
        {
            GetTest(test.TestId);
            _testParameters.ReplaceOne(t => t.TestParameterId == test.TestParameterId, test);
            return test;
        }


        public DoctorRefer AddDoctor(DoctorRefer doctorRefer)
        {
            var _role = _roles.Find(i => i.RoleName.ToLower() == "doctor").FirstOrDefault();
            doctorRefer.user.CreatedDate = DateTime.Now;
            doctorRefer.user.IsActive = false;
            doctorRefer.user.IsRegistered = false;
            doctorRefer.user.RoleId = _role.RoleId;
            doctorRefer.user.UserID = Guid.NewGuid().ToString();
            _users.InsertOne(doctorRefer.user);
            doctorRefer.userHospitalMaps.UserId = doctorRefer.user.UserID;
            doctorRefer.userHospitalMaps.UserHospitalMapID = Guid.NewGuid().ToString();
            doctorRefer.userHospitalMaps.CreatedDate = DateTime.Now;
            AddUserHospitalMap(doctorRefer.userHospitalMaps);
            GenerateUniqueURLAndSMS(doctorRefer);
            return doctorRefer;
        }

        private void GenerateUniqueURLAndSMS(DoctorRefer doctorRefer)
        {
            var user = doctorRefer.user;
            MappingURL mappingURL = new MappingURL();
            mappingURL.MappingURLId = Guid.NewGuid().ToString();
            mappingURL.MobileNumber = user.MobileNumber.ToString();
            mappingURL.UserID = user.UserID;
            mappingURL.SalesRefID = "Admin";
            mappingURL.IsActive = true;
            mappingURL.IsDoctor = true;
            mappingURL.CreatedDateTime = DateTime.Now.ToString("dd/MMM/yyyy");
            mappingURL.RediectionLink = "/signup/doctor/" + mappingURL.UserID;
            mappingURL.URLGenerated = GenerateUniqueURL(10, true);
            mappingURL.HospitalID = "";
            _mappingURLS.InsertOne(mappingURL);
            // string response = SendSMSString(mappingURL, mappingURL.MobileNumber, true, user.FullName);
        }

        private string SendSMSString(MappingURL mappingURL, string mobileNumber, bool isDoctor, string fullName)
        {
            string message = "";

            if (isDoctor)
            {
                message = string.Format("Hi Dr.{0}, you have received an invite from ZH team, please signup by clicking {1}", fullName, mappingURL);
            }
            string stringpost = "User=medivasz&passwd=zumheilen@123&mobilenumber=" + mobileNumber + "&message=" + message;

            HttpWebRequest objWebRequest = null;
            objWebRequest = (HttpWebRequest)WebRequest.Create("http://api.smscountry.com/SMSCwebservice_bulk.aspx");
            HttpWebResponse objWebResponse = null;
            StreamWriter objStreamWriter = null;
            StreamReader objStreamReader = null;
            objWebRequest.Method = "POST";
            objWebRequest.Proxy = null;


            objWebRequest.ContentType = "application/x-www-form-urlencoded";

            objStreamWriter = new StreamWriter(objWebRequest.GetRequestStream());
            objStreamWriter.Write(stringpost);
            objStreamWriter.Flush();
            objStreamWriter.Close();

            objWebResponse = (HttpWebResponse)objWebRequest.GetResponse();
            objStreamReader = new StreamReader(objWebResponse.GetResponseStream());
            string stringResult = objStreamReader.ReadToEnd();

            objStreamReader.Close();
            return stringResult;
        }

        private string GenerateUniqueURL(int length, bool isDoctor)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string url = new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());

            string formattedUrl = "/sg/" + (isDoctor ? "dc/" : "pt/") + url;

            if (_mappingURLS.Find(u => u.URLGenerated == formattedUrl).FirstOrDefault() != null)
            {
                GenerateUniqueURL(length, isDoctor);
            }

            return formattedUrl;
        }


        public MappingURL GetMappingURL(string formattedUrl)
        {
            var _url = Uri.UnescapeDataString(formattedUrl);
            var mappingURL = _mappingURLS.Find(u => u.URLGenerated == _url).FirstOrDefault();
            return mappingURL;
        }
        public MappingURL GetMappingURLByUserid(string UserId)
        {
            var mappingURL = _mappingURLS.Find(u => u.UserID == UserId).FirstOrDefault();
            return mappingURL;

        }

        public List<MappingURL> GetAllMappingURL()
        {
            var mappingURL = _mappingURLS.Find(u => true).ToList();
            return mappingURL.Where(_m => true).OrderBy(i => i.CreatedDateTime).ToList();
        }


        public UserHospitalMap AddUserHospitalMap(UserHospitalMap userHospitalMap)
        {

            _userHospitals.InsertOne(userHospitalMap);
            return userHospitalMap;
        }

        public List<DoctorReferResult> GetDoctorRefers()
        {
            var doctoRefer = new List<DoctorReferResult>();


            var _userhospitalMap = _userHospitals.Find(userhospitalMap => true).ToList();
            var userId = _userhospitalMap.Select(x => x.UserId).Distinct();
            foreach (var uid in userId)
            {
                var userhos = new List<UserHospitalMapResult>();
                var _user = GetUser(uid);
                var _userHospitalMap = _userhospitalMap.Where(uh => uh.UserId == uid).ToList();
                foreach (var _userHospital in _userHospitalMap)
                {
                    var hoslist = new List<Hospitals>();
                    foreach (var hospitalId in _userHospital.HospitalId)
                    {
                        var hos = GetHospital(hospitalId);
                        var rr = new Hospitals
                        {
                            HospitalId = hos.HospitalId,
                            HospitalName = hos.HospitalName
                        };
                        hoslist.Add(rr);
                    }
                    var res = new UserHospitalMapResult
                    {
                        UserHospitalMapID = _userHospital.UserHospitalMapID,
                        UserId = uid,
                        UserName = _user.UserName,
                        HospitalInfo = hoslist,
                        IsActive = _userHospital.IsActive,
                        CreatedDate = _userHospital.CreatedDate
                    };
                    userhos.Add(res);
                }
                var doc = new DoctorReferResult
                {
                    user = _user,
                    userHospitalMapResults = userhos
                };
                doctoRefer.Add(doc);
            }


            return doctoRefer;
        }


        public DoctorReferResult GetDoctorRefersById(string uid)
        {
            var _userhospitalMap = _userHospitals.Find(userhospitalMap => true).ToList();
            var userhos = new List<UserHospitalMapResult>();
            var _user = GetUser(uid);
            var _userHospitalMap = _userhospitalMap.Where(uh => uh.UserId == uid).ToList();
            foreach (var _userHospital in _userHospitalMap)
            {
                var hoslist = new List<Hospitals>();
                foreach (var hospitalId in _userHospital.HospitalId)
                {
                    var hos = GetHospital(hospitalId);
                    var rr = new Hospitals
                    {
                        HospitalId = hos.HospitalId,
                        HospitalName = hos.HospitalName
                    };
                    hoslist.Add(rr);
                }
                var res = new UserHospitalMapResult
                {
                    UserHospitalMapID = _userHospital.UserHospitalMapID,
                    UserId = uid,
                    UserName = _user.UserName,
                    HospitalInfo = hoslist,
                    IsActive = _userHospital.IsActive,
                    CreatedDate = _userHospital.CreatedDate
                };
                userhos.Add(res);
            }
            var doc = new DoctorReferResult
            {
                user = _user,
                userHospitalMapResults = userhos
            };

            return doc;
        }



        public List<Menu> GetMenus()
        {
            return _menus.Find(menu => true).ToList();
        }
        public Menu AddMenu(Menu menu)
        {
            menu.MenuId = Guid.NewGuid().ToString();
            menu.CreatedDate = DateTime.Now;
            _menus.InsertOne(menu);
            return menu;
        }
        public Menu GetMenu(string id)
        {
            return _menus.Find(menu => menu.MenuId == id).FirstOrDefault();
        }
        public void DeleteMenu(string id)
        {
            _menus.DeleteOne(menu => menu.MenuId == id);
        }
        public Menu UpdateMenu(Menu menu)
        {
            GetMenu(menu.MenuId);
            _menus.ReplaceOne(t => t.MenuId == menu.MenuId, menu);
            return menu;
        }


        public List<MenuRoleMapResult> GetMenuRoleMaps()
        {
            var menRoleMapResult = new List<MenuRoleMapResult>();
            var _roleList = GetRoles();
            var _menuList = GetMenus();
            var menuRole = _menuRoleMaps.Find(menuRole => true).ToList();
            foreach (var menu in menuRole)
            {
                var menuList = new List<MenuResult>();
                foreach (var MenuId in menu.MenuId)
                {
                    var menuResult = new MenuResult
                    {
                        MenuId = MenuId,
                        MenuName = _menuList.Where(x => x.MenuId == MenuId).Select(x => x.MenuName).FirstOrDefault(),
                    };
                    menuList.Add(menuResult);
                }
                var doc = new MenuRoleMapResult
                {
                    MappingId = menu.MappingId,
                    RoleId = menu.RoleId,
                    RoleName = _roleList.Where(x => x.RoleId == menu.RoleId).Select(x => x.RoleName).FirstOrDefault(),
                    MenuInfo = menuList,
                    CreatedDate = menu.CreatedDate,
                    IsActive = menu.IsActive

                };
                menRoleMapResult.Add(doc);
            }
            return menRoleMapResult;
        }
        public MenuRoleMap AddMenuRoleMap(MenuRoleMap menuRole)
        {
            menuRole.MappingId = Guid.NewGuid().ToString();
            menuRole.CreatedDate = DateTime.Now;
            _menuRoleMaps.InsertOne(menuRole);
            return menuRole;
        }
        public MenuRoleMapResult GetMenuRoleMapByRoleId(string RoleId)
        {
            var menuList = new List<MenuResult>();
            var _menuRole = _menuRoleMaps.Find(m => m.RoleId == RoleId).FirstOrDefault();
            if (_menuRole != null)
            {
                var _role = GetRole(_menuRole.RoleId);
                var _menuList = GetMenus();
                foreach (var MenuId in _menuRole.MenuId)
                {
                    var menuResult = new MenuResult
                    {
                        MenuId = MenuId,
                        MenuName = _menuList.Where(x => x.MenuId == MenuId).Select(x => x.MenuName).FirstOrDefault(),
                    };
                    menuList.Add(menuResult);
                }
                var menuRole = new MenuRoleMapResult
                {
                    MappingId = _menuRole.MappingId,
                    RoleId = _menuRole.RoleId,
                    RoleName = _role.RoleName,
                    MenuInfo = menuList,
                    CreatedDate = _menuRole.CreatedDate,
                    IsActive = _menuRole.IsActive
                };
                return menuRole;
            }
            else
            {
                return new MenuRoleMapResult { };
            }

        }
        public MenuRoleMapResult GetMenuRoleMap(string id)
        {
            var menuList = new List<MenuResult>();
            var _menuRole = _menuRoleMaps.Find(m => m.MappingId == id).FirstOrDefault();
            var _role = GetRole(_menuRole.RoleId);
            var _menuList = GetMenus();
            foreach (var MenuId in _menuRole.MenuId)
            {
                var menuResult = new MenuResult
                {
                    MenuId = MenuId,
                    MenuName = _menuList.Where(x => x.MenuId == MenuId).Select(x => x.MenuName).FirstOrDefault(),
                };
                menuList.Add(menuResult);
            }
            var menuRole = new MenuRoleMapResult
            {
                MappingId = _menuRole.MappingId,
                RoleId = _menuRole.RoleId,
                RoleName = _role.RoleName,
                MenuInfo = menuList,
                CreatedDate = _menuRole.CreatedDate,
                IsActive = _menuRole.IsActive
            };
            return menuRole;
        }
        public void DeleteMenuRoleMap(string id)
        {
            _menuRoleMaps.DeleteOne(menuRole => menuRole.MappingId == id);
        }
        public MenuRoleMap UpdateMenuRoleMap(MenuRoleMap menuRole)
        {
            GetMenuRoleMap(menuRole.MappingId);
            _menuRoleMaps.ReplaceOne(t => t.MappingId == menuRole.MappingId, menuRole);
            return menuRole;
        }

        public ExceptionResult IsMenuReferenced(string menuId)
        {
            var _menu = _menuRoleMaps.Find(m => m.MenuId.Contains(menuId)).FirstOrDefault();
            if (_menu != null)
            {
                //if (!string.IsNullOrEmpty(_menu.MenuId))
                //{
                //    GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", _iconfiguration.GetSection("ErrorMessage").GetSection("ErrMenuId").Value);
                //}
            }
            return excep;
        }

        public ExceptionResult IsRoleReferenced(string roleId)
        {
            var _role = _menuRoleMaps.Find(r => r.RoleId == roleId).FirstOrDefault();
            if (_role != null)
            {
                if (!string.IsNullOrEmpty(_role.RoleId))
                {
                    GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", _iconfiguration.GetSection("ErrorMessage").GetSection("ErrRoleId").Value);
                }
            }
            return excep;
        }

        public void DeleteDoctor(string id)
        {
            _userHospitals.DeleteOne(uh => uh.UserId == id);
            _users.DeleteOne(user => user.UserID == id);
        }

        public MappingURL GetSignUpLink(string refID)
        {
            var result = _mappingURLS.Find(m => m.URLGenerated.Contains(refID)).FirstOrDefault();
            return result;
        }

        public PaySplitUp AddPaySplitup(PaySplitUp paySplitUp)
        {
            paySplitUp.SplitUpID = Guid.NewGuid().ToString();
            paySplitUp.CreatedDate = DateTime.Now;
            _paySplitUps.InsertOne(paySplitUp);
            return paySplitUp;
        }

        public List<PaySplitUp> GetPaySplitups()
        {
            return _paySplitUps.Find(paySplitup => true).ToList();
        }

        public PaySplitUp GetPaySplitup(string id)
        {
            return _paySplitUps.Find(paysplitup => paysplitup.SplitUpID == id).FirstOrDefault();
        }

        public PaySplitUp UpdatePaySplitUp(PaySplitUp paySplitUp)
        {
            _paySplitUps.ReplaceOne(t => t.SplitUpID == paySplitUp.SplitUpID, paySplitUp);
            return GetPaySplitup(paySplitUp.SplitUpID);
        }

        public void DeletePaySplitup(string id)
        {
            _paySplitUps.DeleteOne(pay => pay.SplitUpID == id);
        }

        public bool isAuthorized(Login login)
        {
            var _user = _users.Find(user => user.UserName == login.UserName && user.Password == login.Password).FirstOrDefault();
            if (_user != null)
                return true;
            else
                return false;
        }

        public bool isAuthorizedDoctor(Login login)
        {
            User _user = null;
            if (string.IsNullOrEmpty(login.Password))
            {
                _user = _users.Find(user => user.UserName == login.UserName && user.Password == login.Password).FirstOrDefault();
            }
            else
            {
                _user = _users.Find(user => user.UserName == login.UserName && user.Otp == login.OTP).FirstOrDefault();
            }
            if (_user != null)
                return true;
            else
                return false;
        }

        public bool isAuthorizedPatient(Login login)
        {
            User _user = null;

            _user = _users.Find(user => user.UserName == login.UserName && user.Password == login.Password).FirstOrDefault();

            if (_user != null)
                return true;
            else
                return false;
        }

        public DoctorReferResult UpdateDoctor(DoctorRefer doctorRefer)
        {

            _userHospitals.ReplaceOne(uh => uh.UserHospitalMapID == doctorRefer.userHospitalMaps.UserHospitalMapID, doctorRefer.userHospitalMaps);
            doctorRefer.user.IsActive = true;
            doctorRefer.user.IsRegistered = true;
            UpdateUser(doctorRefer.user);
            var _mapurl = GetMappingURLByUserid(doctorRefer.user.UserID);
            _mapurl.IsActive = false;
            _mappingURLS.ReplaceOne(m => m.UserID == _mapurl.UserID, _mapurl);
            return GetDoctorRefersById(doctorRefer.user.UserID);
        }

        public ExceptionResult CheckPWordOTP(User user)
        {
            if (!string.IsNullOrEmpty(user.Otp.ToString()) && user.Otp > 0)
            {
                var userId = _users.Find(u => u.UserName == user.UserName && u.Otp == user.Otp).FirstOrDefault();
                if (userId == null)
                {
                    GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", "OTP is not valid");

                }
            }

            return excep;
        }

        public void GenarateOtp(string userId)
        {
            var otp = RandomNumber(6);
            var user = GetUser(userId);
            user.Otp = Convert.ToInt32(otp);
            UpdateUser(user);
        }

        public List<Hospitals> GetHospitalListByUserID(string userId)
        {
            var _userHospitalMap = _userHospitals.Find(uh => uh.UserId == userId).FirstOrDefault();
            var hoslist = new List<Hospitals>();
            foreach (var _userHospital in _userHospitalMap.HospitalId)
            {

                var hos = GetHospital(_userHospital);
                var rr = new Hospitals
                {
                    HospitalId = hos.HospitalId,
                    HospitalName = hos.HospitalName
                };
                hoslist.Add(rr);

            }
            return hoslist;
        }


        public List<Hospitaal> GetLabMappedHospitalList(string UserId)
        {
            var lab = _labs.Find(uh => uh.UserId == UserId).FirstOrDefault();
            var _labHospitalMapping = _labMapping.Find(uh => uh.LabID == lab.LabId).FirstOrDefault();
            var hospital = _hospitals.Find(h => h.HospitalId == _labHospitalMapping.HospitalID).ToList();
            return hospital;
        }

        public bool PrescribeTest(string testId, string patientId, long outMobileNo, string hospId, string doctorId, int numberOfTest)
        {
            string user_name = string.Format("{0}_{1}", hospId, patientId);
            var _user = _users.Find(u => u.UserName == user_name).FirstOrDefault();
            var _role = _roles.Find(i => i.RoleName.ToLower() == "patient").FirstOrDefault();
            if (_user != null)
            {
                _user.MobileNumber = outMobileNo;
                if (_user.IsDischarged)
                {
                    _user.DischargeID = _user.DischargeID + 1;
                    _user.IsDischarged = false;
                }

                UpdateUser(_user);
            }
            else
            {
                _user = new User()
                {
                    UserName = user_name,
                    FullName = "",
                    Hospital_PID = patientId,
                    HospitalId = hospId,
                    MobileNumber = outMobileNo,
                    ReferredBy = doctorId,
                    RoleId = _role.RoleId,
                    DischargeID=1,
                    IsDischarged=false,
                    IsRegistered = false
                };
                AddUser(_user);
            }
            string OrderID = GenerateOrderAndSave(testId, patientId, outMobileNo, hospId, doctorId, numberOfTest);

            MappingURL mappingURL = GenerateMapURL(hospId, doctorId, _user, OrderID);
            SendSMSString(mappingURL, outMobileNo.ToString(), false, "");
          //  sendMailPrescribeTest();
            //var _testMap = new TestMap()
            //{
            //    UserId = _user.UserID,
            //    TestId = testId,
            //    Patient_HID = patientId,
            //    DoctorId = doctorId,
            //    CreatedDate = DateTime.Now,


            //};
            //AddMTestMap(_testMap);



            return true;
        }

        public void sendMailPrescribeTest()
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("coleman79@ethereal.email"));
                email.To.Add(MailboxAddress.Parse("samjinsam1992@gmail.com"));
                email.Subject = "ZumHelion";
                email.Body = new TextPart(TextFormat.Html) { Text = "<h1>Example HTML Message Body</h1>" };

                // send email
                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("coleman79@ethereal.email", "ruawJxehdZyfqeueS8");
                smtp.Send(email);
                smtp.Disconnect(true);
                //return true;
            }
            catch(Exception ex)
            {
                // return false;

            }
        }

            private string GenerateOrderAndSave(string testId, string patientId, long outMobileNo, string hospId, string doctorId, int numberOfTest)
        {
            string OrderID = string.Empty;
            var filter = Builders<Counter>.Filter.Eq(a => a.Id, "OrderSeq");
            var update = Builders<Counter>.Update.Inc(a => a.Value, 1);
            var ret = _counterColvals.FindOneAndUpdate(filter, update);
            if (ret == null)
            {
                _counterColvals.InsertOne(new Counter
                {
                    Id = "OrderSeq",
                    Value = 1
                });
            }
            OrderID = "ZHUM" + ret.Value.ToString("100000");

            PrescriptionOrder prescription = new PrescriptionOrder
            {
                PrescriptionId = Guid.NewGuid().ToString(),
                CreatedTime = DateTime.Now,
                HospitalId = hospId,
                Hospital_PID = patientId,
                IsPaid = false,
                IsSplitPaymentDone = false,
                ModifiedOn = DateTime.Now,
                NoOfTest = numberOfTest,
                OrderId = OrderID,
                PatientId = patientId,
                PaymentStatus = "Ordered",
                PrescribedBy = doctorId,
                TestId = testId,
                TotalAmount = numberOfTest * RetriveTestAmount(testId)
            };
            _prescriptionOrders.InsertOne(prescription);

            return OrderID;
        }

        public PrescriptionOrder GetPrescriptionOrder(string orderId)
        {
            return _prescriptionOrders.Find(po => po.OrderId == orderId).FirstOrDefault();
        }

        public PrescriptionOrder GetPrescriptionOrderwithStatus(string patientID)
        {
            var _order = _prescriptionOrders.Find(po => po.PatientId == patientID && po.IsPaid == false).ToList();
            return _order.Where(_order => true).OrderByDescending(i => i.CreatedTime).FirstOrDefault();
        }

        public List<PrescriptionOrder> GetPrescriptionPaidOrder(string patientID)
        {
            var _order = _prescriptionOrders.Find(po => po.PatientId == patientID && po.IsPaid == true).ToList();
            return _order;
        }

        public PrescriptionOrder UpdatePrescriptionOrder(PrescriptionOrder pOrder)
        {
            _prescriptionOrders.ReplaceOne(tm => tm.OrderId == pOrder.OrderId, pOrder);
            return pOrder;
        }

        private decimal RetriveTestAmount(string testId)
        {
            var test = _tests.Find(u => u.TestId == testId).FirstOrDefault();
            return test == null ? 0 : test.Amount;
        }

        public List<ActiveTestList> GetActiveTestByPatientID(string patientId)
        {

            List<ActiveTestList> activeList = new List<ActiveTestList>();

            var _patientPres = _prescriptionOrders.Find(i => i.PatientId == patientId && i.IsPaid == false).ToList();

            foreach (var prescription in _patientPres)
            {
                string testId = prescription.TestId;
                if (!activeList.Any(k => k.TestId == testId))
                {
                    var retryOrder = _retryOrder.Find(x => x.OrderId == prescription.OrderId).ToList();
                    if(retryOrder.Count <= 3)
                    {
                        var latestOrder = _patientPres.Where(j => j.TestId == testId).FirstOrDefault();
                        var test = _tests.Find(i => i.TestId == testId).FirstOrDefault();
                        ActiveTestList activeTest = new ActiveTestList
                        {
                            AmountforOneTest = test.Amount,
                            TestId = test.TestId,
                            TestName = test.TestName,
                            NoOfTestSugested = latestOrder.NoOfTest,
                            HospitalId = latestOrder.HospitalId,
                            TotalAmount = test.Amount * latestOrder.NoOfTest,
                            OrderId = latestOrder.OrderId,
                            CreatedDate = latestOrder.CreatedTime
                        };

                        activeList.Add(activeTest);
                    }  
                }
            }

            return activeList.OrderByDescending(i => i.CreatedDate).ToList();
        }

        private MappingURL GenerateMapURL(string hospId, string doctorId, User _user, string OrderID)
        {
            MappingURL mappingURL = new MappingURL
            {
                MappingURLId = Guid.NewGuid().ToString(),
                MobileNumber = _user.MobileNumber.ToString(),
                UserID = _user.UserID,
                SalesRefID = doctorId,
                IsActive = true,
                IsDoctor = false,
                CreatedDateTime = DateTime.Now.ToString("dd/MMM/yyyy"),
                URLGenerated = GenerateUniqueURL(10, false),
                HospitalID = hospId,
                OrderId = OrderID
            };
            mappingURL.RediectionLink = "/signup/patient/" + mappingURL.UserID;
            _mappingURLS.InsertOne(mappingURL);
            return mappingURL;
        }
        public TestMap AddMTestMap(TestMap testMap)
        {
            testMap.TestMapId = Guid.NewGuid().ToString();
            testMap.CreatedDate = DateTime.Now;
            testMap.IsPaid = false;
            testMap.ReceiptNo = string.Empty;
            testMap.PaymentRefNo = string.Empty;
            _testMaps.InsertOne(testMap);
            return testMap;
        }
        public TestMap UpdateTestMap(TestMap testMap)
        {
            _testMaps.ReplaceOne(tm => tm.TestMapId == testMap.TestMapId, testMap);
            return testMap;
        }
        public List<TestMap> GetTestMaps()
        {
            return _testMaps.Find(testMap => true).ToList();
        }

        public TestMap GetTestMap(string id)
        {
            return _testMaps.Find(testMap => testMap.TestMapId == id).FirstOrDefault();
        }

        public userMappingDetails GetUserMappingDetails(string refID)
        {
            var mappingURL = _mappingURLS.Find(m => m.URLGenerated.Contains(refID)).FirstOrDefault();
            var user = _users.Find(user => user.UserID == mappingURL.UserID).FirstOrDefault();
            bool ispaid = false; 
            if (!string.IsNullOrEmpty(mappingURL.OrderId))
            {
                var order = _prescriptionOrders.Find(m => m.OrderId == mappingURL.OrderId).FirstOrDefault();
                if (order != null)
                {
                    ispaid = order.IsPaid;
                }
            }

            userMappingDetails mp = new userMappingDetails
            {
                UserID = user.UserID,
                UserName = user.UserName,
                Password = user.Password,
                Hospital_PID = user.Hospital_PID,
                IsRegistered = user.IsRegistered,
                MappingURLActive = mappingURL.IsActive,
                RedirectionLink = mappingURL.RediectionLink,
                URLGenerated = mappingURL.URLGenerated,
                IsPaid = ispaid
            };

            return mp;
        }

        public PaymentHistory AddPaymentHistory(PaymentHistory payHistory)
        {
            payHistory.PaymentHistoryId = Guid.NewGuid().ToString();
            payHistory.CreatedOn = DateTime.Now;
            _payHistory.InsertOne(payHistory);
            return payHistory;
        }

        public PaymentHistory UpdatePaymentHistory(PaymentHistory payHistory)
        {
            _payHistory.ReplaceOne(ph => ph.PaymentHistoryId == payHistory.PaymentHistoryId, payHistory);
            return payHistory;
        }

        public PrintReceiptResult GetPrintReceipt(string orderId)
        {
            var printReceipt = new PrintReceiptResult();
            var pOrder = GetPrescriptionOrder(orderId);
            printReceipt.AmountPaid = pOrder.TotalAmount;
            printReceipt.PatientName = pOrder.PatientId;
            printReceipt.TestName = GetTest(pOrder.TestId).TestName;
            printReceipt.OrderID = orderId;
            printReceipt.PaymentReferenceNo = pOrder.PaymentReferenceNumber;
            printReceipt.NoOfTest = pOrder.NoOfTest;
            return printReceipt;
        }

        public PrescriptionOrder GetOrderWithStatus(string patientID)
        {
            var pOrder = GetPrescriptionOrderwithStatus(patientID);
            return pOrder;
        }

        public OrderStatus IsorderPaymentcompleted(string orderId)
        {
            var orderDetails = _prescriptionOrders.Find(m => m.OrderId == orderId).FirstOrDefault();
            OrderStatus orderStatus = new OrderStatus();
            List<TestParameterResult> rs = new List<TestParameterResult>();
            if (orderDetails == null)
            {
                // GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", "OrderID is not valid");                
            }
            else
            {
                var Test = _tests.Find(m => m.TestId == orderDetails.TestId).FirstOrDefault();
                var Result = _results.Find(m => m.OrderId == orderId).ToList();
                var testParameters = _testParameters.Find(j => j.TestId == orderDetails.TestId).ToList();

                foreach (var tp in testParameters)
                {
                    TestParameterResult res = new TestParameterResult();
                    res.TestId = tp.TestId;
                    res.ParameterName = tp.ParameterName;
                    res.RangesFrom = tp.RangesFrom;
                    res.RangesTo = tp.RangesTo;
                    res.TestedResult = "";
                    rs.Add(res);
                }

                orderStatus.OrderId = orderId;
                orderStatus.Hospital_PId = orderDetails.Hospital_PID;
                orderStatus.IsPaid = orderDetails.IsPaid;
                orderStatus.NoOfResultAdded = Result.Count;
                orderStatus.ParameterList = rs;
                orderStatus.PatientId = orderDetails.PatientId;
                orderStatus.ReferenceNumber = orderDetails.PaymentReferenceNumber;
                orderStatus.TestID = orderDetails.TestId;
                orderStatus.TestName = Test.TestName;
                orderStatus.TotalNumberOfResult = orderDetails.NoOfTest;
            }

            return orderStatus;
        }

        public Result AddResult(ResultInput resultinputs)
        {
            var orderDetails = _prescriptionOrders.Find(m => m.OrderId == resultinputs.OrderId).FirstOrDefault();
            Result result = new Result();
            if (orderDetails == null)
            {
                // GetSetErrorInfo(excep, Convert.ToInt16(HttpStatusCode.BadRequest), "Bad Request", "OrderID is not valid");                
            }
            else
            {
                var patientDetails = _users.Find(u => u.Hospital_PID == orderDetails.PatientId && u.HospitalId == resultinputs.HospitalID).FirstOrDefault();
                if(patientDetails !=null)
                {
                    patientDetails.FullName = resultinputs.PatientName;
                    _users.ReplaceOne(tm => tm.UserID == patientDetails.UserID, patientDetails);
                }
                result.ResultId = Guid.NewGuid().ToString();
                result.OrderId = orderDetails.OrderId;
                result.ApprovedBy = resultinputs.ApproverName;
                result.cashreciptNumber = resultinputs.CashReceiptNumber;
                result.CreatedOn = DateTime.Now;
                result.LabId = _labs.Find(i => i.UserId == resultinputs.userId).FirstOrDefault().LabId;
                result.PatientId = orderDetails.PatientId;
                result.ResultJSON = resultinputs.JsonResult;
                result.RefferedBy = orderDetails.PrescribedBy;
                result.TestName = _tests.Find(m => m.TestId == orderDetails.TestId).FirstOrDefault().TestName;
                result.PatientName = resultinputs.PatientName;
                result.Age = resultinputs.Age;
                result.ApprovedBy = resultinputs.ApproverName;
                result.Detailsofspecimenpreparation = resultinputs.Detailsofspecimenpreparation;
                result.Observation = resultinputs.Observation;
                result.PathologicalCondition = resultinputs.PathologicalCondition;
                result.Sex = resultinputs.Sex;
                result.SpecimenType = resultinputs.SpecimenType;
                result.TestMethodUsed = resultinputs.TestMethodUsed;
                result.ResultStatus = resultinputs.ResultStatus;
                result.HospitalID  = resultinputs.HospitalID;
                result.TestId = orderDetails.TestId;
                result.DischargeID = patientDetails.DischargeID;
                result.TestDoneBy = resultinputs.TestDoneBy;
                result.TestApprovedBy = resultinputs.TestApprovedBy;
                result.TestCollectedWard = resultinputs.TestCollectedWard;
                result.TestReportedDate = resultinputs.TestReportedDate;
                result.TestReceivedDate = resultinputs.TestReceivedDate;
                _results.InsertOne(result);

                AddNotificationTriggerSMS(result.PatientId, result.ResultId, orderDetails.OrderId, result.PatientName, result.TestName, result.HospitalID, orderDetails.PrescribedBy);
            }

            return result;
        }


        public List<Result> GetResultListLab(ResultFilter resultFilter)
        {
            List<Result> results = new List<Result>();
            results = _results.Find(i => true).ToList();
            CultureInfo provider = CultureInfo.InvariantCulture;


            if (!string.IsNullOrEmpty(resultFilter.TestId))
            {
                results = results.Where(i => i.TestId == resultFilter.TestId).ToList();
            }

            if (!string.IsNullOrEmpty(resultFilter.LabId))
            {
                var lab =_labs.Find(i => i.UserId == resultFilter.LabId).FirstOrDefault();
                results = results.Where(i => i.LabId == lab.LabId).ToList();
            }

            if (!string.IsNullOrEmpty(resultFilter.StartDate))
            {
                DateTime startDateTime = DateTime.ParseExact(resultFilter.StartDate, "dd-MM-yyyy", provider);

                results = results.Where(i => i.CreatedOn > startDateTime).ToList();
            }
            if (!string.IsNullOrEmpty(resultFilter.EndDate))
            {
                DateTime enddateTime = DateTime.ParseExact(resultFilter.EndDate, "dd-MM-yyyy", provider);

                results = results.Where(i => i.CreatedOn < enddateTime).ToList();
            }
            if (!string.IsNullOrEmpty(resultFilter.ReferredBy))
            {
                results = results.Where(i => i.RefferedBy == resultFilter.ReferredBy).ToList();
            }

            if (!string.IsNullOrEmpty(resultFilter.HospitalID))
            {
                results = results.Where(i => i.HospitalID == resultFilter.HospitalID).ToList();
            }

            if (!string.IsNullOrEmpty(resultFilter.HPID))
            {
                results = results.Where(i => i.PatientId == resultFilter.HPID).ToList();
            }

            return results;
        }

        public Result TestResultByID(string resultID)
        {
            var result = _results.Find(i => i.ResultId == resultID).FirstOrDefault();
            return result == null ? new Result() : result;
        }

        public List<Result> GetAllTestResults()
        {
            return _results.Find(i => true).ToList();
        }

        public List<OrderStatus> GetAllOrdersByPatientID(string h_Pid, string hospitalId)
        {
            var orderDetails = _prescriptionOrders.Find(m => m.Hospital_PID == h_Pid && m.HospitalId == hospitalId).ToList();
            List<OrderStatus> orderStatusResult = new List<OrderStatus>();
            List<TestParameterResult> rs = new List<TestParameterResult>();
            if (orderDetails.Count < 1)
            {
                return orderStatusResult;
            }
            else
            {
                foreach (var order in orderDetails)
                {
                    var res = _results.Find(x => x.OrderId == order.OrderId).ToList();
                    if (!(res.Count >= order.NoOfTest))
                    {
                        OrderStatus orderStatus = new OrderStatus();
                        var Test = _tests.Find(m => m.TestId == order.TestId).FirstOrDefault();
                        var existingResult = _results.Find(m => m.PatientId == h_Pid).FirstOrDefault();
                        var Result = _results.Find(m => m.OrderId == order.OrderId).ToList();
                        var testParameters = _testParameters.Find(j => j.TestId == order.TestId).ToList();
                        rs.Clear();

                        foreach (var tp in testParameters)
                        {
                            TestParameterResult Tpres = new TestParameterResult();
                            Tpres.TestId = tp.TestId;
                            Tpres.ParameterName = tp.ParameterName;
                            Tpres.RangesFrom = tp.RangesFrom;
                            Tpres.RangesTo = tp.RangesTo;
                            Tpres.TestedResult = "";
                            rs.Add(Tpres);
                        }

                        orderStatus.OrderId = order.OrderId;
                        orderStatus.Hospital_PId = order.Hospital_PID;
                        orderStatus.IsPaid = order.IsPaid;
                        orderStatus.NoOfResultAdded = Result.Count;
                        orderStatus.ParameterList = rs;
                        orderStatus.PatientId = order.PatientId;
                        orderStatus.ReferenceNumber = order.PaymentReferenceNumber;
                        orderStatus.TestID = order.TestId;
                        orderStatus.TestName = Test.TestName;
                        orderStatus.TotalNumberOfResult = order.NoOfTest;
                        orderStatus.TestUnit = Test.Unit;
                        orderStatus.Result = existingResult;
                        orderStatusResult.Add(orderStatus);
                    }
                }
            }

            return orderStatusResult;
        }

        private void AddNotificationTriggerSMS(string patientId,string resultID, string orderId, string patientName, string testName, string hospitalId, string doctorID)
        {
            var hospital = _hospitals.Find(i => i.HospitalId == hospitalId).FirstOrDefault();
            var user = _users.Find(i => i.Hospital_PID == patientId && i.HospitalId == hospitalId).FirstOrDefault();
            Notification notification = new Notification();
            notification.NotificationId = Guid.NewGuid().ToString();
            notification.ResultId = resultID;
            notification.IsActive = true;
            notification.IsResult = true;
            notification.CreatedOn = DateTime.Now;
            notification.Message = String.Format("Result added for Patient {0}({1})/{2} - Test {3}", patientId, patientName, hospital.HospitalName, testName);
            notification.UserId = doctorID;
            notification.OrderID = orderId;
            _notifications.InsertOne(notification);

            Notification notification1 = new Notification();
            notification1.NotificationId = Guid.NewGuid().ToString();
            notification1.ResultId = resultID;
            notification1.IsActive = true;
            notification1.IsResult = true;
            notification1.CreatedOn = DateTime.Now;
            notification1.Message = String.Format("New result added for Test {0}", testName);
            notification1.UserId = user.UserID;
            notification1.OrderID = orderId;
            _notifications.InsertOne(notification1);

        }

        public List<Notification> GetActiveNotification(string userID)
        {
            return _notifications.Find(i => i.UserId == userID && i.IsActive).ToList();
        }

        public bool CloseNotification(string Notification)
        {
            var notification = _notifications.Find(i => i.NotificationId == Notification && i.IsActive).FirstOrDefault();
            notification.IsActive = false;
            _notifications.ReplaceOne(t => t.NotificationId == Notification, notification);
            return true;
        }
        public List<Patient> GetpatientList(string hospitalID)
        {
            List<Patient> patients = new List<Patient>();
            var users = _users.Find(u => u.HospitalId == hospitalID && u.IsActive && !string.IsNullOrEmpty(u.Hospital_PID)).ToList();
            foreach(var user in users)
            {
                Patient pat = new Patient();
                pat.HospitalID = user.HospitalId;
                pat.Hospital_PID = user.Hospital_PID;
                pat.Name = user.FullName == null ? "" : user.FullName;
                pat.PatientID = user.Hospital_PID;
                pat.Referredby = user.ReferredBy;
                patients.Add(pat);
            }
            return patients;
        }
        public TestResultReturnObject RetriveDataForReport(string resultID)
        {
            TestResultReturnObject testResultReturnObject = new TestResultReturnObject();
            var result = _results.Find(i => i.ResultId == resultID).FirstOrDefault();
            testResultReturnObject.CurrentResult = result;
            var patientDetails = _users.Find(u => u.Hospital_PID == result.PatientId && u.HospitalId == result.HospitalID).FirstOrDefault();

            if (result != null && patientDetails != null)
            {
                var results30Days = _results.Find(i => i.PatientId == result.PatientId && i.HospitalID == result.HospitalID
                       && i.DischargeID == patientDetails.DischargeID && i.TestId == result.TestId).ToList().OrderBy(i => i.CreatedOn);
                testResultReturnObject.Last30DaysResultsList = new List<Result>();
                testResultReturnObject.Last30DaysResultsList.AddRange(results30Days);
            }

            return testResultReturnObject;
        }

        public TestResultReturnObject RetriveReportforLatestOrder(string HPID,string HospitalId)
        {
            TestResultReturnObject testResultReturnObject = new TestResultReturnObject();
            var result = _results.Find(i => i.PatientId == HPID).FirstOrDefault();
            if (result != null)
            {
                var patientDetails = _users.Find(u => u.Hospital_PID == result.PatientId && u.HospitalId == result.HospitalID).FirstOrDefault();

                testResultReturnObject.CurrentResult = result;

                if (patientDetails != null)
                {
                    var results30Days = _results.Find(i => i.PatientId == result.PatientId && i.HospitalID == result.HospitalID
                           && i.DischargeID == patientDetails.DischargeID && i.TestId == result.TestId).ToList().OrderBy(i => i.CreatedOn);
                    testResultReturnObject.Last30DaysResultsList = new List<Result>();
                    testResultReturnObject.Last30DaysResultsList.AddRange(results30Days);
                }
            }

            return testResultReturnObject;
        }

        public bool DischargePatient(string HospitalID, string Hospital_PID)
        {
            var patientDetails = _users.Find(u => u.Hospital_PID == Hospital_PID && u.HospitalId == HospitalID).FirstOrDefault();
            patientDetails.IsDischarged = true;
            UpdateUser(patientDetails);
            return true;
        }

        public bool ReAdmintPatient(string HospitalID, string Hospital_PID)
        {
            var patientDetails = _users.Find(u => u.Hospital_PID == Hospital_PID && u.HospitalId == HospitalID).FirstOrDefault();
            patientDetails.IsDischarged = false;
            UpdateUser(patientDetails);
            return true;
        }

        public List<PrescriptionOrder> GetPatientsforLabEntry(string hospitalID)
        {
            List<PrescriptionOrder> presorder = new List<PrescriptionOrder>();
            var prescription = _prescriptionOrders.Find(po => po.HospitalId == hospitalID).ToList();

            foreach (var p in prescription)
            {
                var res = _results.Find(x => x.OrderId == p.OrderId).ToList();
                if(!(res.Count >= p.NoOfTest))
                {
                    presorder.Add(p);
                }
            }

            return presorder;
        }

        //when a failed payment found returns the new generated orderID with _1 incremented numbers appended
        public string AddRetryOrder(string orderID)
        {
            var prescription = _prescriptionOrders.Find(po => po.OrderId == orderID).FirstOrDefault();
            if(prescription.PaymentStatus.ToLower() == "failed")
            {
                var exRetry = _retryOrder.Find(x => x.OrderId == orderID).ToList();
                RetryOrder ro = new RetryOrder();
                int retrycount = 1;

                if (exRetry.Count > 0)
                {
                    retrycount = exRetry.Count + 1;
                }

                ro.Id = Guid.NewGuid().ToString();
                ro.OrderId = orderID;
                ro.RetryCount = retrycount;
                ro.RetryOrderID = orderID + "_" + ro.RetryCount;

                _retryOrder.InsertOne(ro);
                return ro.RetryOrderID;
            }
           
            return orderID;
        }

        public bool isMaxRetry(string orderID)
        {
            var exRetry = _retryOrder.Find(x => x.OrderId == orderID).ToList();

            if (exRetry.Count == 3)
            {
                return true;
            }

            return false;
        }

        public string getRetryOrderID(string orderID)
        {
            var exRetry = _retryOrder.Find(x => x.RetryOrderID == orderID).FirstOrDefault();
            if(exRetry == null)
            {
                return orderID;
            }

            return exRetry.OrderId;
        }



    }
}

