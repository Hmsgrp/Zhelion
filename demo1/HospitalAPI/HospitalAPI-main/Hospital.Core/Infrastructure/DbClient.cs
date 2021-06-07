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
        private readonly IMongoCollection<RetryOrder> _retryOrder;

        public DbClient(IOptions<HospitalDbConfig> hospitalDbConfig)
        {
            // var client = new MongoClient(hospitalDbConfig.Value.Connection_String);
            var client = new MongoClient(@"mongodb+srv://Rajesh:Password0123@cluster0.wt11k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var database = client.GetDatabase("HospitalDB");
            _roles = database.GetCollection<Role>("Roles");
            _hospitals = database.GetCollection<Hospitaal>("Hospitals");
            _users = database.GetCollection<User>("Users");
            _labs = database.GetCollection<Lab>("Labs");
            _tests = database.GetCollection<Test>("Tests");
            _testParameters = database.GetCollection<TestParameter>("TestParameters");
            _userHospitals = database.GetCollection<UserHospitalMap>("UserHospitalMaps");
            _menus = database.GetCollection<Menu>("Menus");
            _menuRoleMaps = database.GetCollection<MenuRoleMap>("MenuRoleMaps");
            _paySplitUps = database.GetCollection<PaySplitUp>("PaySplitUPs");
            _mappingURLS = database.GetCollection<MappingURL>("MappingURLs");
            _testMaps = database.GetCollection<TestMap>("TestMaps");
            _counterColvals = database.GetCollection<Counter>("Counters");
            _prescriptionOrders = database.GetCollection<PrescriptionOrder>("PrescriptionOrder");
            _payHistorys = database.GetCollection<PaymentHistory>("PaymentHistory");
            _results = database.GetCollection<Result>("Result");
            _notifications = database.GetCollection<Notification>("Notification");
            _labMapping = database.GetCollection<LabMapping>("LabMapping");
            _retryOrder = database.GetCollection<RetryOrder>("RetryOrderID");
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

        public IMongoCollection<RetryOrder> GeRetryOrderCollection()
        {
            return _retryOrder;
        }
    }
}
