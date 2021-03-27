using Hospital.Core.Infrastructure;
using Hospital.Core.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

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
            _iconfiguration = iconfiguration;

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
            return _users.Find(user => true).ToList();
        }
        public User GetUser(string id)
        {
            return _users.Find(user => user.UserID == id).First();
        }

        public User GetUserByUserName(string userName)
        {
            return _users.Find(user => user.UserName == userName).First();
        }
        public User AddUser(User user)
        {

            user.UserID = Guid.NewGuid().ToString();
            user.Password = RandomString(8);
            user.CreatedDate = DateTime.Now;
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


        /*********************************************************************************************************/

        public List<Lab> GetLabs()
        {
            return _labs.Find(lab => true).ToList();
        }
        public Lab AddLab(Lab lab)
        {
            lab.LabId = Guid.NewGuid().ToString();
            lab.CreatedDate = DateTime.Now;
            _labs.InsertOne(lab);
            return lab;
        }
        public Lab GetLab(string id)
        {
            return _labs.Find(user => user.LabId == id).First();
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
            var result =_mappingURLS.Find(m => m.URLGenerated.Contains(refID)).FirstOrDefault();
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

        public bool PrescribeTest(string testId, string patientId, long outMobileNo, string hospId, string doctorId)
        {
            string user_name = string.Format("{0}_{1}", hospId, patientId);
            var _user = _users.Find(u => u.UserName == user_name).FirstOrDefault();
            if (_user != null)
            {
                _user.MobileNumber = outMobileNo;
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
                    ReferredBy = doctorId
                };
                AddUser(_user);
            }
            MappingURL mappingURL = GenerateMapURL(hospId, doctorId, _user);
            SendSMSString(mappingURL, outMobileNo.ToString(), false, "");
            return true;
        }

        private MappingURL GenerateMapURL(string hospId, string doctorId, User _user)
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
                URLGenerated = GenerateUniqueURL(10, true),
                HospitalID = hospId
            };
            mappingURL.RediectionLink = "/signup/patient/" + mappingURL.UserID;
            _mappingURLS.InsertOne(mappingURL);
            return mappingURL;
        }
    }
}

