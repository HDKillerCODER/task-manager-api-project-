Components Involved in Caching:
1. P1C Infinity Connect:
○    This component is responsible for handling API requests from external systems.
○    It uses caching to manage and respond to these requests quickly, especially when the main system (P1C mainframe) is down or experiencing high load.
How Caching Works:
1.	Data Storage in Cache:
Frequently accessed data, such as cardholder details, transaction history, and account balances, are stored in the cache.
○    This data is typically retrieved from the main database (DB2) and stored in memory for quick access.
2.	Handling API Requests:
When an API request is received, P1C Infinity Connect first checks the cache for the required data.
○    If the data is available in the cache (cache hit), it is returned immediately, reducing the need for a database query and thus speeding up the response time.
○    If the data is not found in the cache (cache miss), P1C Infinity Connect retrieves it from the main database, processes the request, and updates the cache with the new data for future requests.
3.	Cache Refresh and Expiry:
Cached data is periodically refreshed to ensure it remains up-to-date. This process involves re-fetching the latest data from the main database and updating the cache.
○    Cache expiry policies are implemented to automatically remove outdated data. This ensures that the cache only contains relevant and accurate information.
Benefits of Caching in MPMS:
1.	Improved Performance:
By storing frequently accessed data in memory, the system can respond to API requests much faster than if it had to query the database each time.
○    This significantly reduces the load on the main database and improves overall system performance.
2.	High Availability:
1.	In scenarios where the main system (P1C mainframe) is down or slow, caching allows the system to continue serving API requests using the cached data.
○    This ensures that critical services remain available to users even during system outages or maintenance periods.
3.	Reduced Latency:
1.	Cached data can be retrieved much faster than querying the main database, resulting in lower latency for end-users and a better user experience.
Use Cases for Caching in MPMS:
1.	Cardholder Data:
1.	Information such as cardholder name, account balance, and recent transactions are cached to quickly serve account inquiries and transaction validations.
2.	Transaction History:
1.	Recent transaction records are cached to provide quick access for customer service representatives and automated fraud detection checks.
3.	API Responses:
1.	Responses to common API requests are cached to reduce the processing time and improve the speed of subsequent requests.













                      Exadata DB                                                                                   
 ------------------         ------------------                      
  Database Server            Exadata Storage                                                      
   (1)(Primary)                  server                                                                                                                                                             
 ------------------         ------------------                                                                        
           -----InfiniBand Network---
 -----------------         ------------------
  Database Server             Exadata Storage  
  (2)(secondary)                  Server
 ------------------         ------------------

Here,                                                                                                     
1.Database Server (1) and (2): Multiple servers handling database operations.                           
(More than one server is used to manage and process database tasks.)
2.Exadata Storage Server: Intelligent storage that offloads some processing tasks.                      
InfiniBand Network: High-speed network connect all servers and storage to ensure
provides high speed data transfer between
servers and storage.    







                                                             Normal DB                    
                          | Database Server |  ------------- | Storage |  
                                                                          | 
                                                               | Network |		   
Here,
1)Database Server: Handles database operations like create, delete & update and queries.
2)Storage: Stores the actual data.
3)Network: Connects the database server to the storage and other components.
