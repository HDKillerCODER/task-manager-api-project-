index="infinity_connect_p1c1" source="/usr/app/xesmpc*/logs/xpressNgLog.txt" 
dur NOT XPH NOT nrt NOT healthcheck 
b2k IN (atu,blk,cah,cbi,cbt,cca,cci,cdu,clc,coc,ccc,ccd,gma,lsm,lsr,mco,mts,naa,nac,odo,onp,p2p,pro,scb,srh,srx,std,usr,xgp,xsp,xt3,xta,xtw) 
| eval cache_status=if(cached=="true", "Cached", "Non-Cached") 
| stats count BY api_name, cache_status
| sort - cache_status, -count
