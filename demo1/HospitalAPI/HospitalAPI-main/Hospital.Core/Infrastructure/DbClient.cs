using Hospital.Core.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Hospital.Core.Infrastructure
{
    public class DbClient : IDbClient
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
        private readonly IMongoCollection<PrescriptionOrder> _prescriptionOrders;
        private readonly IMongoCollection<Counter> _counterColvals;
        private readonly IMongoCollection<PaymentHistory> _payHistorys;
        private readonly IMongoCollection<Result> _results;
        private readonly IMongoCollection<Notification> _notifications;
        private readonly IMongoCollection<LabMapping> _labMapping;

        public DbClient(IOptions<HospitalDbConfig> hospitalDbConfig)
        {
            // var client = new MongoClient(hospitalDbConfig.Value.Connection_String);
            var client = new MongoClient(@"mongodb+srv://Rajesh:Password0123@cluster0.wt11k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var database = client.GetDatabase(hospitalDbConfig.Value.Database_Name);
            _roles = database.GetCollection<Role>(hospitalDbConfig.Value.Roles_Collection_Name);
            _hospitals = database.GetCollection<Hospitaal>(hospitalDbConfig.Value.Hospitals_Collection_Name);
            _users = database.GetCollection<User>(hospitalDbConfig.Value.Users_Collection_Name);
            _labs = database.GetCollection<Lab>(hospitalDbConfig.Value.Labs_Collection_Name);
            _tests = database.GetCollection<Test>(hospitalDbConfig.Value.Tests_Collection_Name);
            _testParameters = database.GetCollection<TestParameter>(hospitalDbConfig.Value.TestParameters_Collection_Name);
            _userHospitals = database.GetCollection<UserHospitalMap>(hospitalDbConfig.Value.UserHospitals_Collection_Name);
            _menus = database.GetCollection<Menu>(hospitalDbConfig.Value.Menus_Collection_Name);
            _menuRoleMaps = database.GetCollection<MenuRoleMap>(hospitalDbConfig.Value.MenuRoleMaps_Collection_Name);
            _paySplitUps = database.GetCollection<PaySplitUp>(hospitalDbConfig.Value.PaySplitUp_Collection_Name);
            _mappingURLS = database.GetCollection<MappingURL>(hospitalDbConfig.Value.URLMapping_Collection_Name);
            _testMaps = database.GetCollection<TestMap>(hospitalDbConfig.Value.TestMap_Collection_Name);
            _counterColvals = database.GetCollection<Counter>(hospitalDbConfig.Value.Counter_Collection_Name);
            _prescriptionOrders = database.GetCollection<PrescriptionOrder>(hospitalDbConfig.Value.Prescription_Collection_Name);
            _payHistorys = database.GetCollection<PaymentHistory>(hospitalDbConfig.Value.PaymentHistory_Collection_Name);
            _results = database.GetCollection<Result>(hospitalDbConfig.Value.Result_Collection_Name);
            _notifications = database.GetCollection<Notification>(hospitalDbConfig.Value.Notification_Collection_Name);
            _labMapping = database.GetCollection<LabMapping>(hospitalDbConfig.Value.Lab_Mapping_Collection_Name);
        }

        public IMongoCollection<Hospitaal> GetHospitalsCollection()
        {
            return _hospitals;
        }

        public IMongoCollection<Role> GetRolesCollection()
        {
            return _roles;
        }
        public IMongoCollection<User> GetUsersCollection()
        {
            return _users;
        }
        public IMongoCollection<Lab> GetLabsCollection()
        {
            return _labs;
        }
        public IMongoCollection<Test> GetTestsCollection()
        {
            return _tests;
        }
        public IMongoCollection<TestParameter> GetTestParametersCollection()
        {
            return _testParameters;
        }
        public IMongoCollection<UserHospitalMap> GetUserHospitalsCollection()
        {
            return _userHospitals;
        }

        public IMongoCollection<Menu> GetMenusCollection()
        {
            return _menus; ;
        }
        public IMongoCollection<MenuRoleMap> GetMenuRoleMapsCollection()
        {
            return _menuRoleMaps;
        }

        public IMongoCollection<PaySplitUp> GetSplitUpsCollection()
        {
            return _paySplitUps;
        }

        public IMongoCollection<MappingURL> GetMappingURLCollection()
        {
            return _mappingURLS;
        }
        public IMongoCollection<TestMap> GetTestMapCollection()
        {
            return _testMaps;
        }
        public IMongoCollection<Counter> GetCountersCollection()
        {
            return _counterColvals;
        }
        public IMongoCollection<PrescriptionOrder> GetPrescriptionOrdersCollection()
        {
            return _prescriptionOrders;
        }

        public IMongoCollection<PaymentHistory> GetPaymentHistoryCollection()
        {
            return _payHistorys;
        }

        public IMongoCollection<Result> GetResultCollection()
        {
            return _results;
        }

        public IMongoCollection<Notification> GetNotificationCollection()
        {
            return _notifications;
        }

        public IMongoCollection<LabMapping> GetLabMappingCollection()
        {
            return _labMapping;
        }
    }
}
