Solution Overview
P1C will send message to Infinity Connect via MQ. Infinity Connect will receive that message and process the message then send the message to the client through a Service API.

Infinity Connect will be enhanced to support as an Interface for the following P1C push notifications. 
•	Create three new Infinity Connect Services to receive MQ message in string format from P1C and convert the message to XML/JSON then send Customer Notifications API messages to client.
o	PCK60REM Service API – Customer Notification Email
o	PCK60RSM Service API – Customer Notification SMS
o	PCK60RLT Service API – Customer Notification Letter
•	Create a new Infinity Connect Service to receive MQ message in XML format and will send Authorization API messages to client and receive response from client.
o	ISO20022 Service API


<img width="503" alt="image" src="https://github.com/user-attachments/assets/6c4ff463-1971-4c4f-a407-eef2e986b70a">


ISO20022 SQL Script Changes
1.	In project ‘xpressng-b2k-common’ inside ‘\src\main\res-pack\db’ folder. Create the following sql files:
•	cfg_data_b2k-iso20022-common-au.sql
o	 Insert the back-end endpoint configuration data ‘HTTP.CONN.DEFINITION’
	CFG_KEY = 30-ISO
•	cfg_data_b2k-iso20022-common-au-clean.sql 
o	Delete the back-end endpoint configuration data ‘HTTP.CONN.DEFINITION’
	CFG_KEY = 30-ISO
•	cfg_data_b2k-services-iso20022-au.sql
o	Insert the JMS endpoint configuration data ‘JMS.ENDPOINT’
	CFG_KEY = 30-ISO-ISO20022
o	Insert the service configuration data ‘B2K.SERVICE.DEFINITION
	CFG_KEY = 30~B2K~ISO20022~01_01
•	cfg_data_b2k-services-iso20022-au-clean.sql
o	Delete the JMS endpoint configuration data ‘JMS.ENDPOINT’
	CFG_KEY = 30-ISO-ISO20022
o	Delete the service configuration data ‘B2K.SERVICE.DEFINITION
	CFG_KEY = 30~B2K~ISO20022~01_01

2.	In project ‘xpressng-b2k-common’ inside ‘\src\main\res-pack\db\arion\’ folder. Create the following sql files:
•	Inside nabglba folder
o	xngfisau_cfg_data_b2k-iso20022-common-au-arion-nabglba.sql
•	Inside nabglbc folder
o	xngfisau_cfg_data_b2k-iso20022-common-au-arion-nabglbc.sql

3.	In project ‘xpressng-b2k-common’ inside ‘\src\main\res-pack\db\narnia\’ folder. Create the following sql files inside each environment folders:
•	xngfisau_cfg_data_b2k-iso20022-common-au-narnia-<ENV>.sql
where <ENV> is the environment name for the client.

Maven Projects
Folder	Maven Project Name	Description of Change
\XpressNgServices\service-groups\B2K\iso20022	xpressng-b2k-iso20022	Parent project for all ISO20022 service.
This pom will build all the child projects (services, schema).
Parent pom is ‘xpressng-for-services’
\XpressNgServices\service-groups\B2K\iso20022\common	xpressng-b2k-iso20022-common	All java class for ISO20022 was created inside this project.
All xsd schema files are created inside this project.
Parent pom is ‘xpressng-b2k-iso20022

XSD Files
ISO20022 Service is using xsd schema files to perform schema validation for request and response. XSD schema files are created in ‘xpressng-b2k-iso20022-common’ project inside ‘\src\main\resources\schema’ folder.
•	ISO20022_Rq.xsd – Used for request validation
•	ISO20022_Rq.xsd – Used for response validation

ISO20022 Service
The purpose of this service is to get authorization request from P1C in xml format and send it to client’s endpoint. This service will also get the response from client and sent it back to P1C. ISO2002 Service validates the request and response using xsd schema files.
Created in ‘xpressng-b2k-iso20022-common’ project where the following packages and java classes are also created.
The classes below are all defined in ISO2002 SQL configuration with CFG_KEY = ‘30~B2K~ISO20022~01_01’
o	Package com.au.xes.b2k.adapter.iso.helper
o	ISO20022XMLHelper_v01_01.java
	ISO20022 Service helper class that extends abstract class BaseHAExtHelper
•	Call prepareRequest method to prepare the request
•	Call populateResponse to populate the response
o	Package com.au.xpressng.gatewayesbsupport.mediation.esb.adapters
o	ISO20022XMLMessageAdapter.java
	ISO20022 Service message adapter class that extends abstract class AbstractMessageAdapter
•	Call translateRequestMessage method to translate request from object to string
•	Call unmarshalRqst and marshalRqst to unmarshall and marshall request
•	Call unmarshalRsp and marshalRsp to unmarshall and marshall response
•	Call setResponse to set response string to adapterParms request string
o	ISO20022XMLMessageValidator.java
	ISO20022 Service validator class that extends ISO20022XMLMessageAdapter, MessageRequestValidationInterface, and MessageResponseValidationInterface
•	Call validateRequestMessage to validate request with the use of xsd schema files
•	Call validateResponseMessage to validate response with the use of xsd schema files
o	Package com.fisglobal.xpressng.iso20022.validator
o	InvalidISO20022MessageException.java
	Exception class for invalid ISO20022 message, extends Exception
o	ISO20022SchemaValidator.java
	Call validateISO20022 method to prepare xsd schema files from resources and performs the actual validation of ISO20022 messages
o	Package com.au.xpressng.gatewayesbsupport.mediation.esb.adapters.backside
o	ISOHttpConnectorBacksideTransportAdapter.java
	ISO20022 http connecter class that extends HttpConnectorBacksideTransportAdapter
•	Call routeToEndpoint method route and send the request to client’s endpoint defined in the SQL configuration with CFG_KEY = ‘30-ISO’
o	Package com.au.xpressng.gatewayesbsupport.mediation.esb.adapters.reply
o	ISO20022ServiceReplyAdapter.java
	ISO20022 service reply adapter implements ServiceReplyInterface 
•	Call createServiceRespone method to create the service response from the response given by the client

PCK60R Process Diagram

![image](https://github.com/user-attachments/assets/634cb478-69ab-4397-af6b-87c858ec5a18)

PCK60R 
Clients currently must have an instance of MQ to use Infinity Connect for outgoing ‘push’ notifications.  Newer clients are finding this clunky and cumbersome and don’t want to have to install MQ.  Infinity Connect needs to be modified so that outgoing notifications can be supported without requiring an MQ instance on the client side.

SMS Service (PCK60RSM)
The purpose of this service is to convert pck60r SMS MQ messages to JSON format before pushing the messages to the client’s endpoint.
EMAIL Service (PCK60REM)
The purpose of this service is to convert pck60r EMAIL MQ messages to JSON format before pushing the messages to the client’s endpoint.
LETTER Service (PCK60RSM)
The purpose of this service is to convert pck60r LETTER MQ messages to JSON format before pushing the messages to the client’s endpoint.

TEST MQs
Unlike the previous process each message will have has its own queue. These are the queues provided for development:
EAU.SMS.REQUEST.QL.NABGLBC
EAU.EMAIL.REQUEST.QL.NABGLBC
EAU.LETTER.REQUEST.QL.NABGLBC 

PCK60R SQL Script Changes
1.	In project ‘xpressng-b2k-common’ inside ‘\src\main\res-pack\db’ folder. Create the following sql files:
•	cfg_data_b2k-pck60r-common-au.sql
o	 Insert the back-end endpoint configuration data 
•	cfg_data_b2k- pck60r-common-au-clean.sql 
o	Delete the back-end endpoint configuration data 
•	cfg_data_b2k-services- pck60r-email-au.sql
o	Insert the JMS endpoint configuration data ‘JMS.ENDPOINT’
o	Insert the service configuration data ‘B2K.SERVICE.DEFINITION
•	cfg_data_b2k-services- pck60r-email-au-clean.sql
o	Delete the JMS endpoint configuration data ‘JMS.ENDPOINT’
o	Delete the service configuration data ‘B2K.SERVICE.DEFINITION
•	cfg_data_b2k-services- pck60r-sms-au.sql
o	Insert the JMS endpoint configuration data ‘JMS.ENDPOINT’
o	Insert the service configuration data ‘B2K.SERVICE.DEFINITION
•	cfg_data_b2k-services- pck60r-sms-au-clean.sql
o	Delete the JMS endpoint configuration data ‘JMS.ENDPOINT’
o	Delete the service configuration data ‘B2K.SERVICE.DEFINITION
•	cfg_data_b2k-services- pck60r-letter-au.sql
o	Insert the JMS endpoint configuration data ‘JMS.ENDPOINT’
o	Insert the service configuration data ‘B2K.SERVICE.DEFINITION
•	cfg_data_b2k-services- pck60r-letter-au-clean.sql
o	Delete the JMS endpoint configuration data ‘JMS.ENDPOINT’
o	Delete the service configuration data ‘B2K.SERVICE.DEFINITION
2.	In project ‘xpressng-b2k-common’ inside ‘\src\main\res-pack\db\arion\’ folder. Create the following sql files:
•	Inside nabglba folder
o	xngfisau_cfg_data_b2k-pck60r-common-au-arion-nabglba.sql
•	Inside nabglbc folder
o	xngfisau_cfg_data_b2k-pck60r-common-au-arion-nabglbc.sql


Maven Projects
Folder	Maven Project Name	Description of Change
\XpressNgServices\service-groups\B2K\pck60r	xpressng-b2k-pck60r	Parent project for all PCK60R service.
This pom will build all the child projects (services, schema).
Parent pom is ‘xpressng-for-services’
\XpressNgServices\service-groups\B2K\pck60r\common	xpressng-b2k-pck60r-common	All java class for PCK60R was created inside this project.
All xsd schema files are created inside this project.
Parent pom is ‘xpressng-b2k-pck60r


PCK60R Service
The purpose of this service is to get authorization request from P1C in xml format and send it to client’s endpoint. This service is a one-way message. No response processing is needed.
Created in ‘xpressng-b2k-pck60r-common’ project where the following packages and java classes are also created.
The classes below are all defined in PCK60R SQL configuration with CFG_KEY = ‘30~B2K~PCK60REM~01_01’ or ‘30~B2K~PCK60RLT~01_01’ or ‘30~B2K~PCK60RSM~01_01’
o	Package com.au.xes.b2k.adapter.pck60r.helper
o	PCK60RJsonHelper_v01_01.java
	PCK60R Service helper class that extends abstract class JSONHAExtHelper
•	Call prepareRequest method to prepare the request
o	PCK60RXMLHelper_v01_01.java
	PCK60R Service helper class that extends abstract class JSONHAExtHelper
•	Call prepareRequest method to prepare the request
o	Package com.au.xpressng.gatewayesbsupport.mediation.esb.adapters
o	PCK60RXMLMessageAdapter.java
	PCK60R Service message adapter class that extends abstract class XSORPCK60RAdapter_SOAP
o	PCK60RJSONMessageAdapter.java
	PCK60R Service message adapter class that extends abstract class AbstractMessageAdapter

o	XSORPCK60RAdapter_SOAP.java
	PCK60R Service abstract class for its host adapters. PCK60RXMLMessageAdapter
o	Package com.au.xpressng.ifxcommon.security
o	PCK60RAuthenticator implements LinkedProcessor 
	This is a copy of the B2KAuthenticator Abstract class but without the response conversion to B2K Record. 
o	PCK60REMAuthenticator extends PCK60RAuthenticator implements LinkedProcessor 
	This the authenticator class for PCK60R Email
o	PCK60RSMAuthenticator extends PCK60RAuthenticator implements LinkedProcessor 
	This the authenticator class for PCK60R SMS
o	PCK60RLTAuthenticator extends PCK60RAuthenticator implements LinkedProcessor 
	This the authenticator class for PCK60R Email



These following java classes were added in ‘xpressng-connector-soap”.
o	Package com.au.xpressng.gatewayesbsupport.mediation.esb.adapters.backside
	PCK60RSoapBacksideTransportAdapter extends HttpConnectorBacksideTransportAdapter implements BacksideTransportInterface is the http connecter class 
o	Package com.au.xpressng.gatewayesbsupport.mediation.esb.adapters.request
	PCK60RToXMLStringRequestTransformer implements MessageRequestTranslationInterface, MessageResponseTranslationInterface service request transformer. 




