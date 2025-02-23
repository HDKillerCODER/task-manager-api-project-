index="infinity_connect_p1c1" sourcetype=xng source="/usr/app/*mpcp*/logs/xpressNgLog.txt" NOT XPH NOT nrt NOT healthcheck isStandIn=*
| eval isStandIn_value=if(isStandIn=="true", "StandIn-TRUE", "StandIn-FALSE")
| timechart span=10s count by isStandIn_value


index="infinity_connect_p1c1" sourcetype=xng source="/usr/app/*mpcp*/logs/xpressNgLog.txt" NOT XPH NOT nrt NOT healthcheck (rsCode="500" OR rsCode="200")
| eval error_type=case(rsCode=="500", "500 Error", rsCode=="200", "200 Success", true(), "Other")
| timechart span=10s count by error_type
