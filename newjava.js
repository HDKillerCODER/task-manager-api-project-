index="infinity_connect_p1c1" source="/usr/app/xesmpcprd/logs/xpressNgLog.txt" "500"
| eval error_type=if(match(_raw, "500"), "HTTP 500 Error", "Other")
| where _time >= strptime("2024-11-29", "%Y-%m-%d")
| timechart span=1h count by error_type
| join type=left _time [ search index="infinity_connect_p1c1" source="/usr/app/xesmpcprd/logs/xpressNgLog.txt" "Application restart"
| eval restart_event="App Restart"
| where _time >= strptime("2024-11-29", "%Y-%m-%d")
| timechart span=1h count by restart_event ]
