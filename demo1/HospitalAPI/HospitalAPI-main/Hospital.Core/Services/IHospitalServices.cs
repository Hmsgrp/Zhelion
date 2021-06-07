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
        List<Hospitaal> GetHospitalsV2();
        Hospitaal AddHospital(Hospitaal hospital);
        Hospitaal GetHospital(string id);
        void DeleteHospital(string id);
        Hospitaal UpdateHospital(Hospitaal hospitaal);


        List<User> GetUsers();
        User AddUser(User user);
        User GetUser(string id);
        User GetUserbyPatientID(string id);
        User GetUserByUserName(string userName);
        void DeleteUser(string id);
        User UpdateUser(User user);
        User UpdatePatient(User user);


        List<LabMappingresult> GetLabs();
        Lab AddLab(Lab lab,LabMapping labMapping);
        LabMappingresult GetLab(string id);
        void DeleteLab(string id);
        Lab UpdateLab(Lab lab);
        Hospitaal GetSelectedHospitalforLabUser(string UserID);
        List<Hospitaal> GetLabMappedHospitalList(string UserId);
        List<PrescriptionOrder> GetPatientsforLabEntry(string hospitalID);


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
        OrderStatus IsorderPaymentcompleted(string orderId);
        void DeleteDoctor(string id);
        DoctorReferResult UpdateDoctor(DoctorRefer doctorRefer);
        MappingURL GetMappingURL(string formattedUrl);
        Result AddResult(ResultInput resultinputs);
        MappingURL GetMappingURLByUserid(string UserId);
        ExceptionResult CheckPWordOTP(User user);
	    MappingURL GetSignUpLink(string refID);
        List<Menu> GetMenus();
        Menu AddMenu(Menu menu);
        Menu GetMenu(string id);
        ExceptionResult IsMenuReferenced(string menuId);
        void DeleteMenu(string id);
        Menu UpdateMenu(Menu menu);
        List<MappingURL> GetAllMappingURL();


        List<MenuRoleMapResult> GetMenuRoleMaps();
        MenuRoleMap AddMenuRoleMap(MenuRoleMap menuRole);
        Result TestResultByID(string resultID);
        List<Result> GetAllTestResults();
        MenuRoleMapResult GetMenuRoleMap(string id);
        MenuRoleMapResult GetMenuRoleMapByRoleId(string RoleId);
        void DeleteMenuRoleMap(string id);
        MenuRoleMap UpdateMenuRoleMap(MenuRoleMap menuRole);

        PaySplitUp AddPaySplitup(PaySplitUp doctorRefer);
        List<PaySplitUp> GetPaySplitups();
        PaySplitUp GetPaySplitup(string id);
        PaySplitUp UpdatePaySplitUp(PaySplitUp paySplitUp);
        void DeletePaySplitup(string id);

        bool isAuthorized(Login login);

        void GenarateOtp(string userId);
        bool isAuthorizedDoctor(Login login);
        bool isAuthorizedPatient(Login login);
        List<Hospitals> GetHospitalListByUserID(string userId);

        bool PrescribeTest(string testId, string patientId, long outMobileNo, string hospId, string doctorId,int numberOfTest);
        PrescriptionOrder GetPrescriptionOrder(string orderId);
        PrescriptionOrder GetPrescriptionOrderwithStatus(string orderId);
        PrescriptionOrder UpdatePrescriptionOrder(PrescriptionOrder pOrder);
        List<ActiveTestList> GetActiveTestByPatientID(string patientId);
        List<PrescriptionOrder> GetPrescriptionPaidOrder(string patientID);

        TestMap AddMTestMap(TestMap testMap);
        TestMap UpdateTestMap(TestMap testMap);
        List<TestMap> GetTestMaps();
        TestMap GetTestMap(string id);

        userMappingDetails GetUserMappingDetails(string refID);
        public User AddLabUser(User user);
        PaymentHistory AddPaymentHistory(PaymentHistory testMap);
        PaymentHistory UpdatePaymentHistory(PaymentHistory testMap);
        PrintReceiptResult GetPrintReceipt(string orderId);

        List<Result> GetResultListLab(ResultFilter resultFilter);
        List<OrderStatus> GetAllOrdersByPatientID(string h_Pid, string hospitalId);
        TestResultReturnObject RetriveDataForReport(string resultID);

        List<Notification> GetActiveNotification(string userID);
        bool CloseNotification(string Notification);

        List<Patient> GetpatientList(string hospitalID);

        TestResultReturnObject RetriveReportforLatestOrder(string HPID, string HospitalId);

        bool ReAdmintPatient(string HospitalID, string Hospital_PID);

        bool DischargePatient(string HospitalID, string Hospital_PID);
        string AddRetryOrder(string orderID);
        bool isMaxRetry(string orderID);

        string getRetryOrderID(string orderID);
    }
}
