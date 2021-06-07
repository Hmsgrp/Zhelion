using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Paytm;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text.Json;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public PaymentController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }
        [HttpPost]
        [Route("TestPayment", Name = "TestPayment")]
        public IActionResult TestPayment(PaymentInitiator paymentInitiatorParams)
        {
            string currency = paymentInitiatorParams.Currency;
            string Amount = paymentInitiatorParams.Amount;
            string orderId = paymentInitiatorParams.OrderId;
            string customerId = paymentInitiatorParams.CustomerId;

            Dictionary<string, string> head = new Dictionary<string, string>();
            Dictionary<string, object> requestBody = new Dictionary<string, object>();

            Dictionary<string, string> txnAmount = new Dictionary<string, string>
            {
                //{ "value", "1.00" },
                //{ "currency", "INR" }
                 { "value", Amount },
                { "currency", currency }
            };
            Dictionary<string, string> userInfo = new Dictionary<string, string>
            {
                { "custId", customerId }
            };
            //var baseUrl = string.Format("{ 0}://{1}{2}", Request.Url.Scheme, Request.Url.Authority, Url.Content("~"));
            //string callbackurl = new Uri( Url.Content("~/api/Payment/PaymentStatus");
            Dictionary<string, object> body = new Dictionary<string, object>
            {
                { "requestType", "Payment" },
                { "mid", _iconfiguration.GetSection("PayTM").GetSection("merchantId").Value },
                { "websiteName", _iconfiguration.GetSection("PayTM").GetSection("websiteName").Value  },
                { "orderId", orderId },
                { "txnAmount", txnAmount },
                { "userInfo", userInfo },
                { "callbackUrl",""}
            };

            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            string paytmChecksum = Checksum.generateSignature(JsonConvert.SerializeObject(body), _iconfiguration.GetSection("PayTM").GetSection("merchantKey").Value);

            head.Add("signature", paytmChecksum);

            requestBody.Add("body", body);
            requestBody.Add("head", head);

            string post_data = JsonConvert.SerializeObject(requestBody);

            //For  Staging
            string url = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=" 
                        + _iconfiguration.GetSection("PayTM").GetSection("merchantId").Value + "&orderId="+ orderId;

            //For  Production 
            //string  url  =  "https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=VnuRWW38945630279333&orderId=ORDERID_98765";

            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);

            webRequest.Method = "POST";
            webRequest.ContentType = "application/json";
            webRequest.ContentLength = post_data.Length;

            using (StreamWriter requestWriter = new StreamWriter(webRequest.GetRequestStream()))
            {
                requestWriter.Write(post_data);
            }

            string responseData = string.Empty;

            using (StreamReader responseReader = new StreamReader(webRequest.GetResponse().GetResponseStream()))
            {
                responseData = responseReader.ReadToEnd();
                Console.WriteLine(responseData);
            }

            return Ok(responseData);
        }


        [HttpGet]
        [Route("PaymentStatus", Name = "PaymentStatus")]
        public IActionResult TransactionStatus(string OrderId)
        {
           // var OrderId = _hospitalServices.GetPrescriptionOrderwithStatus(PatientID).OrderId;
            Dictionary<string, string> body = new Dictionary<string, string>();
            Dictionary<string, string> head = new Dictionary<string, string>();
            Dictionary<string, Dictionary<string, string>> requestBody = new Dictionary<string, Dictionary<string, string>>();
            PaymentHistoryResult _payHistory = new PaymentHistoryResult();

            body.Add("mid", _iconfiguration.GetSection("PayTM").GetSection("merchantId").Value);
            body.Add("orderId", OrderId);

            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            string paytmChecksum = Checksum.generateSignature(JsonConvert.SerializeObject(body), _iconfiguration.GetSection("PayTM").GetSection("merchantKey").Value);

            head.Add("signature", paytmChecksum);

            requestBody.Add("body", body);
            requestBody.Add("head", head);

            string post_data = JsonConvert.SerializeObject(requestBody);

            //For  Staging
            string url = "https://securegw-stage.paytm.in/v3/order/status";

            //For  Production 
            //string  url  =  "https://securegw.paytm.in/v3/order/status";

            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);

            webRequest.Method = "POST";
            webRequest.ContentType = "application/json";
            webRequest.ContentLength = post_data.Length;

            using (StreamWriter requestWriter = new StreamWriter(webRequest.GetRequestStream()))
            {
                requestWriter.Write(post_data);
            }

            string responseData = string.Empty;

            using (StreamReader responseReader = new StreamReader(webRequest.GetResponse().GetResponseStream()))
            {
                responseData = responseReader.ReadToEnd();
            }
            var perscriptionOrder = _hospitalServices.GetPrescriptionOrder(OrderId);
            using JsonDocument doc = JsonDocument.Parse(responseData);
            JsonElement root = doc.RootElement;

            if(root.GetProperty("body").GetProperty("resultInfo").GetProperty("resultStatus").ToString() == "TXN_SUCCESS")
            {
                perscriptionOrder.PaymentStatus = "Success";
                perscriptionOrder.IsPaid = true;
                perscriptionOrder.PaymentReferenceNumber = root.GetProperty("body").GetProperty("bankTxnId").ToString();
                perscriptionOrder.ModifiedOn = DateTime.Now;
            }
            else if (root.GetProperty("body").GetProperty("resultInfo").GetProperty("resultStatus").ToString() == "TXN_FAILURE")
            {
                perscriptionOrder.PaymentStatus = "Failed";
                perscriptionOrder.PaymentReferenceNumber = null;
                perscriptionOrder.ModifiedOn = DateTime.Now;
            }
            else if (root.GetProperty("body").GetProperty("resultInfo").GetProperty("resultStatus").ToString() == "PENDING")
            {
                perscriptionOrder.PaymentStatus = "Pending";
                perscriptionOrder.PaymentReferenceNumber = null;
                perscriptionOrder.ModifiedOn = DateTime.Now;
            }
            _hospitalServices.UpdatePrescriptionOrder(perscriptionOrder);

            var PH = new PaymentHistory
            {
                OrderId = OrderId,
                ResponseJson = responseData
            };
            _payHistory.PaymentHistory = PH;
            _hospitalServices.AddPaymentHistory(_payHistory.PaymentHistory);

            var PR = new PrintReceiptResult();
            PR = _hospitalServices.GetPrintReceipt(OrderId);
            _payHistory.PrintReceiptResult = PR;
           
            
            return Ok(_payHistory);
        }

        [HttpPost]
        [Route("PrintReceipt", Name = "PrintReceipt")]
        public IActionResult PrintReceipt(string OrderId)
        {
            var response= _hospitalServices.GetPrintReceipt(OrderId);
            return Ok(response);
        }

        [HttpGet]
        [Route("GetLatestOrder", Name = "GetLatestOrder")]
        public IActionResult GetLatestOrder(string patientID)
        {
            var response = _hospitalServices.GetPrescriptionPaidOrder(patientID);
            return Ok(response);
        }
    }
}
