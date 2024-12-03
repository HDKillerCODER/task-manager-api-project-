index="infinity_connect_p1c1" (source="/opt/xpress/was/profiles/AppSrvMPCPRD/logs/serverMPCPRD/startServer.log" OR source="/opt/xpress/was/profiles/AppSrvMPCPRD/logs/serverMPCPRD/stopServer.log" OR source="/opt/xpress/was/profiles/AppSrvMPCPRD/logs/serverMPCPRD/SystemErr.log")
| eval event_type=case(
    source="/opt/xpress/was/profiles/AppSrvMPCPRD/logs/serverMPCPRD/startServer.log", "Server Start",
    source="/opt/xpress/was/profiles/AppSrvMPCPRD/logs/serverMPCPRD/stopServer.log", "Server Stop",
    source="/opt/xpress/was/profiles/AppSrvMPCPRD/logs/serverMPCPRD/SystemErr.log" AND match(_raw, "restart"), "Server Restart",
    true(), "Other"
)
| where event_type="Server Start" OR event_type="Server Stop" OR event_type="Server Restart"
| table _time event_type source _raw
