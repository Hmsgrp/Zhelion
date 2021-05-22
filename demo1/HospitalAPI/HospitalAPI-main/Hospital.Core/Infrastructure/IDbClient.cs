using Hospital.Core.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Infrastructure
{
    public interface IDbClient
    {
        IMongoCollection<Role> GetRolesCollection();
        IMongoCollection<Hospitaal> GetHospitalsCollection();
        IMongoCollection<User> GetUsersCollection();
        IMongoCollection<Lab> GetLabsCollection();
        IMongoCollection<Test> GetTestsCollection();
        IMongoCollection<TestParameter> GetTestParametersCollection();
        IMongoCollection<UserHospitalMap> GetUserHospitalsCollection();
        IMongoCollection<Menu> GetMenusCollection();
        IMongoCollection<MenuRoleMap> GetMenuRoleMapsCollection();
        IMongoCollection<PaySplitUp> GetSplitUpsCollection();
	    IMongoCollection<MappingURL> GetMappingURLCollection();
        IMongoCollection<TestMap> GetTestMapCollection();

        IMongoCollection<Counter> GetCountersCollection();

        IMongoCollection<PrescriptionOrder> GetPrescriptionOrdersCollection();
        IMongoCollection<PaymentHistory> GetPaymentHistoryCollection();
        IMongoCollection<Result> GetResultCollection();
        IMongoCollection<Notification> GetNotificationCollection();
        IMongoCollection<LabMapping> GetLabMappingCollection();

    }
}
