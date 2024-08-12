Overview of Change Required 
Background 
 
CC5990 will be delivered in the April 2021 release allowing RSA to connect to FIS in order to perform multifactor authentication. 
 
For all transactions that come to FIS for authentication, RSA will call FIS using API FetchAvailableAliases.  If the customer chooses SMS as the method to verify themselves, RSA will SMS the customer and validate this directly with the customer without any involvement of FIS. 
 
However, if the customer selects Out-of-Band to verify themselves (i.e. a mobile Application), they will call FIS with two types of API:  
 
•	InitiateOOB; and 
•	CheckOOBStatus. 
 
The SLA that FIS need to respond to each API within, is 3 seconds. 
 
For each InitiateOOB and CheckOOBStatus, the current solution is that FIS will call the client for this information using InitiateClientOOB and CheckClientOOBStatus, delivered in CC5990. 
 
This is likely to cause timeouts and therefore authorisation rejections.  (Note: Cortex had this very issue and also changed their solution to ensure this doesn’t happen.) 


Once the InitiateOOB is requested, RSA will thereafter check the status OOB request using CheckOOBStatus.  In some instances, they will call FIS every 5 seconds for an update. 
The current solution performs a call to the client for every inbound call from RSA. 
 
This CR is to update the solution so that when the InitiateOOB inbound call from RSA arrives, FIS set a status to ‘Pending’ on an internal database and then send the InitiateClientOOB to the client. 
 
When RSA call FIS with CheckOOBStatus, FIS always return the value of the status on the database for the authorisation in question. 
 
FIS no longer call the client with CheckOOBStatus.  Instead, the client when they have an update to the status of the OOB request, send FIS an update to the status via a new API.  This API will update the status on the database that RSA when they read will retrieve. 
 	  
Current solution: 
 
<img width="523" alt="image" src="https://github.com/user-attachments/assets/0b12dda7-974d-4bee-8ad4-f9749b6ea2cf">

1.	Customer makes eCommerce purchase on retailer site 
2.	RSA deem authorisation worthy of customer-identity-challenge 
3.	RSA send FetchAvailableAliases API to FIS, and FIS respond with parameterised Aliases from P1C Customer selects: 
SMS 
OOB 	1. RSA SMS OTP to customer using data returned on FetchAvailableAliases and verify customer 
1.	RSA send InitiateOOB API to FIS 
2.	FIS send InitiateClientOOB API to Client 
3.	Client attempts verification with customer via mobile application  
4.	RSA send CheckOOBStatus APIs to FIS until the transaction has completed 
5.	FIS send CheckClientOOBStatus APIs to Client until the transaction has completed 
 	 
Upgraded solution: 

https://private-user-images.githubusercontent.com/54568472/356958747-18beff0d-5549-4b85-afb0-18d508347681.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM0NDY1MDksIm5iZiI6MTcyMzQ0NjIwOSwicGF0aCI6Ii81NDU2ODQ3Mi8zNTY5NTg3NDctMThiZWZmMGQtNTU0OS00Yjg1LWFmYjAtMThkNTA4MzQ3NjgxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODEyVDA3MDMyOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTgxNGFiYjRiZDNkOGRhODY3ZTdkYjQ1YjdmNzAyNGY0ZmVjODgwMTA0YjYyMGU0ZWMwMzZiY2U0ZmUyNDkzNjUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.sJHtvUVyI4NlxpeSOQlyGdeXezwAHvwJJkUgvpnOF88

1.	Customer makes eCommerce purchase on retailer site 
2.	RSA deem authorisation worthy of customer-identity-challenge 
3.	RSA send FetchAvailableAliases API to FIS, and FIS respond with parameterised Aliases from P1C Customer selects: 
SMS 
1. RSA SMS OTP to customer using data returned on FetchAvailableAliases and verify customer OOB 
1.	RSA send InitiateOOB API to FIS 
2.	FIS set status to ‘Pending’ and send InitiateClientOOB API to Client 
3.	Client attempts verification with customer via mobile application  
4.	Client sends UpdateOOBStatus API to FIS when the transaction has completed 
5.	RSA send CheckOOBStatus APIs to FIS until the status has change from ‘Pending’ 
 
 
 
Please also refer to CC5781 and CC5990 when estimating. 
 	 
High Level Design/Proposed Solution 
Solution Overview: 
A Secure Customer Authentication database and screens will be created in P1C to support maintenance and inquiry of eCommerce purchases status of a cardholder.   
•	When RSA sends InitiateOOB API, add request will be triggered by Infinity Connect via a new service link request to P1C. The request will be created with status set to ‘Pending’.  
•	When client sends UpdateOOBStatus API, Infinity Connect will call P1C with an update request via a new service link request to update the status provided by the client. 
•	When RSA sends CheckOOBStatus API, Infinity Connect will call P1C with an inquiry request via a new service link request.  P1C will return the status in the database.   
The Secure Customer Authentication requests for an account will be displayed in a new browse screen.  Corresponding Service View forms will be created for both the browse and maintenance screens.     
Infinity Connect High Level Data Flow: 



