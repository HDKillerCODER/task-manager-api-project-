index="infinity_connect_p1c1" (source="/path/to/startServer.log" OR source="/path/to/stopServer.log" OR source="/path/to/SystemErr.log" OR source="/usr/app/xesmpcprd/logs/xpressNgLog.txt")
| eval event_type=case(
    source="/path/to/startServer.log", "Server Start",
    source="/path/to/stopServer.log", "Server Stop",
    source="/path/to/SystemErr.log" AND match(_raw, "restart"), "Server Restart",
    match(_raw, "500"), "HTTP 500 Error",
    true(), "Other"
)
| where _time >= strptime("2024-11-29", "%Y-%m-%d") AND (event_type="HTTP 500 Error" OR event_type="Server Restart")
| timechart span=1h count(eval(event_type="HTTP 500 Error")) as HTTP_500_Error_count count(eval(event_type="Server Restart")) as restart_count
| eval restart_related_errors=if(restart_count > 0, HTTP_500_Error_count, 0)
| table _time HTTP_500_Error_count restart_count restart_related_errors
