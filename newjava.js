#!/bin/bash
send_email() 
{
    local subject="$Reminder : XNGADM, XNGAPP Password Renewal"
    local body="$Reminder:90-day for password expiry approaching for DB User XNGAPP, XNGADM in SIT environment."
    echo "To: <nandeeshwaran.v@fisglobal.com>"
    echo "Subject:$Reminder 2 : XNGADM, XNGAPP Password Renewal"
    echo "$30-day for password expiry approaching for DB User XNGAPP, XNGADM in UAT environment." | sendmail -t
}
 
ninety_day_reminder()
{
    send_email "90-Day Reminder" "Reminder: 90-day expiry approaching for DB User XNGAPP, XNGADM in SIT environment."
}
 
thirty_day_reminder() 
{
    send_email "30-Day Reminder" "Reminder: 30-day expiry approaching for DB User XNGAPP, XNGADM in SIT environment."
}
 
if [ "$Reminder : XNGADM, XNGAPP Password Renewal" == "90-day" ]; then
    ninety_day_reminder
elif [ "$Reminder 2 : XNGADM, XNGAPP Password Renewal" == "30-day" ]; then
    thirty_day_reminder
else
    echo "Invalid argument"
fi
 
 
----cron job----
27/may/2025 - expiry date mpc sit 
#For 90 days before
* 11 26 2 * /usr/app/xesmpcuat/deploy/build/db_pass_expiry.sh 90-day
 
#For 30 days before
* 9 27 4 *  /usr/app/xesmpcuat/deploy/build/db_pass_expiry.sh 30-day
