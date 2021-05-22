namespace Hospital.Core.Infrastructure
{
    public class HospitalDbConfig
    {
        public string Database_Name { get; set; }
        public string Roles_Collection_Name { get; set; }
        public string Connection_String { get; set; }
        public string Hospitals_Collection_Name { get; set; }
        public string Users_Collection_Name { get; set; }
        public string Labs_Collection_Name { get; set; }
        public string Tests_Collection_Name { get; set; }
        public string TestParameters_Collection_Name { get; set; }
        public string UserHospitals_Collection_Name { get; set; }
        public string Menus_Collection_Name { get; set; }
        public string MenuRoleMaps_Collection_Name { get; set; }
        public string PaySplitUp_Collection_Name { get; set; }
	    public string URLMapping_Collection_Name { get; set; }
        public string TestMap_Collection_Name { get; set; }

        public string Counter_Collection_Name { get; set; }

        public string Prescription_Collection_Name { get; set; }
        public string PaymentHistory_Collection_Name { get; set; }

        public string Result_Collection_Name { get; set; }
        public string Notification_Collection_Name { get; set; }

        public string Lab_Mapping_Collection_Name { get; set; }

    }
}
