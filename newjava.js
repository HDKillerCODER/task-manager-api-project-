index="infinity_connect_p1c1" source="/usr/app/xesmpcprd/logs/xpressNgLog.txt" 
| eval event_type=if(match(_raw, "500"), "HTTP 500 Error", if(match(_raw, "Application restart"), "App Restart", "Other"))
| where _time >= strptime("2024-11-29", "%Y-%m-%d") AND (event_type="HTTP 500 Error" OR event_type="App Restart")
| timechart span=1h count(eval(event_type="HTTP 500 Error")) as HTTP_500_Error_count count(eval(event_type="App Restart")) as restart_count
| eval restart_related_errors=if(restart_count > 0, HTTP_500_Error_count, 0)
| table _time HTTP_500_Error_count restart_count restart_related_errors
