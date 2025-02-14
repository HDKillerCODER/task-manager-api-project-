index="infinity_connect_p1ct" source="/usr/app/xesmpcpfx/logs/xpressNgLog.txt"
| search cache_flag="TRUE"
| stats count BY api_name
| rename count AS cached_api_count
| sort - cached_api_count
