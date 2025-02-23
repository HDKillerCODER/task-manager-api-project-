index="infinity_connect_p1c1" sourcetype=xng source="/usr/app/*mpcp*/logs/xpressNgLog.txt" NOT XPH NOT nrt NOT healthcheck rsCode="500"
| eval error_type=if(match(_raw, "500"), "500 Error", "Other")
| timechart span=10s count by error_type
| append [
    search index="infinity_connect_p1c1" sourcetype=xng source="/usr/app/*mpcp*/logs/xpressNgLog.txt" NOT XPH NOT nrt NOT healthcheck isStandIn="true" 
    | timechart span=10s count by isStandIn | rename true as StandIn-TRUE
]
| append [
    search index="infinity_connect_p1c1" sourcetype=xng source="/usr/app/*mpcp*/logs/xpressNgLog.txt" NOT XPH NOT nrt NOT healthcheck uoutage="start"
    | timechart span=10s count by uoutage | rename start as P1C_UnplannedOutage
] 
| append [
  search index="infinity_connect_p1c1"  source="/usr/app/xesmpcprd/logs/xpressNgLog.txt" dur NOT XPH NOT nrt NOT healthcheck b2k IN (atu,blk,cah,cbi,cbt,cca,cci,cdu,clc,coc,gcc,gcd,gma,lsm,lsr,mcu,mts,naa,nac,odo,onp,p2p,pro,scb,srh,srx,std,usr,xgp,xsp,xt3,xta,xtw) cached=true 
  | timechart span=10s count by cached | rename true as Cached-TRUE
]
| append [
  search index="infinity_connect_P1C1" source="/opt/pco/mpcprd/logs/pala.log" ("command received" OR "effective date set" OR "standing in for P1C" OR "resuming normal operation" OR "mark batch complete")
| rex field=_raw "event=\[(?<event>[^\]]+)\](?:\s+command=(?<command>\w+))?(?:\s+state=(?<state>\w+))?(?:\s+xph=\[(?<xph>[^\]]*)\])?"
| eval event=upper(event), command=upper(command)
| eval event_type=if(command!="", command, if(state!="", state, event))
| timechart span=10s count by event_type
]
