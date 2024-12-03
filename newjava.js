index="infinity_connect_p1c1" source="/usr/app/xesmpcprd/logs/xpressNgLog.txt" 
| eval event_type=if(match(_raw, "500"), "HTTP 500 Error", if(match(_raw, "Application restart"), "App Restart", "Other"))
| where _time >= strptime("2024-11-29", "%Y-%m-%d")
| timechart span=1h count by event_type
| appendcols [
    search index="infinity_connect_p1c1" source="/usr/app/xesmpcprd/logs/xpressNgLog.txt" "Application restart"
    | eval restart_flag=1
    | where _time >= strptime("2024-11-29", "%Y-%m-%d")
    | timechart span=1h count as restart_count
]
| eval restart_related_errors=if(event_type="HTTP 500 Error" AND restart_flag=1, count, 0)
| table _time HTTP_500_Error_count restart_count restart_related_errors
