using Hospital.Core.Models;
using System.Collections.Generic;

namespace Hospital.Core.Services
{
    public interface IHospitalServices
    {
        List<Role> GetRoles();
        Role AddRole(Role role);
        Role GetRole(string id);
        ExceptionResult IsRoleReferenced(string id);
        void DeleteRole(string id);
        Role UpdateRole(Role role);

        List<Hospitaal> GetHospitals();
        Hospitaal AddHospital(Hospitaal hospital);
        Hospitaal GetHospital(string id);
        void DeleteHospital(string id);
        Hospitaal UpdateHospital(Hospitaal hospitaal);


        List<User> GetUsers();
        User AddUser(User user);
        User GetUser(string id);
        User GetUserByUserName(string userName);
        void DeleteUser(string id);
        User UpdateUser(User user);
        User UpdatePatient(User user);


        List<Lab> GetLabs();
        Lab AddLab(Lab lab);
        Lab GetLab(string id);
        void DeleteLab(string id);
        Lab UpdateLab(Lab lab);


        List<Test> GetTests();
        Test AddTest(Test test);
        Test GetTest(string id);
        void DeleteTest(string id);
        Test UpdateTest(Test test);


        List<TestParameter> GetTestParameters();
        TestParameter AddTestParameter(TestParameter testParameter);
        List<TestParameter> GetTestParameter(string id);
        void DeleteTestParameter(string id);

        TestParameter UpdateTestParameter(TestParameter testParameter);
        ExceptionResult CheckUserName(User user);
        ExceptionResult CheckEmailId(User user);

        UserHospitalMap AddUserHospitalMap(UserHospitalMap userHospitalMap);

        DoctorRefer AddDoctor(DoctorRefer doctorRefer);
        List<DoctorReferResult> GetDoctorRefers();
        DoctorReferResult GetDoctorRefersById(string uid);
        void DeleteDoctor(string id);
        DoctorReferResult UpdateDoctor(DoctorRefer doctorRefer);
        MappingURL GetMappingURL(string formattedUrl);
        MappingURL GetMappingURLByUserid(string UserId);
        ExceptionResult CheckPWordOTP(User user);
	MappingURL GetSignUpLink(string refID);
        List<Menu> GetMenus();
        Menu AddMenu(Menu menu);
        Menu GetMenu(string id);
        ExceptionResult IsMenuReferenced(string menuId);
        void DeleteMenu(string id);
        Menu UpdateMenu(Menu menu);


        List<MenuRoleMapResult> GetMenuRoleMaps();
        MenuRoleMap AddMenuRoleMap(MenuRoleMap menuRole);
        MenuRoleMapResult GetMenuRoleMap(string id);
        MenuRoleMapResult GetMenuRoleMapByRoleId(string RoleId);
        void DeleteMenuRoleMap(string id);
        MenuRoleMap UpdateMenuRoleMap(MenuRoleMap menuRole);

        PaySplitUp AddPaySplitup(PaySplitUp doctorRefer);
        List<PaySplitUp> GetPaySplitups();
        PaySplitUp GetPaySplitup(string id);

        bool isAuthorized(Login login);

        void GenarateOtp(string userId);
        bool isAuthorizedDoctor(Login login);
        bool isAuthorizedPatient(Login login);
        List<Hospitals> GetHospitalListByUserID(string userId);

        bool PrescribeTest(string testId, string patientId, long outMobileNo, string hospId, string doctorId);
        TestMap AddMTestMap(TestMap testMap);
        TestMap UpdateTestMap(TestMap testMap);
        List<TestMap> GetTestMaps();
        TestMap GetTestMap(string id);
    }
}
