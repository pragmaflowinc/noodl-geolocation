# noodl-geolocation
Geolocation module for Noodl


| Name | Type | Description |
| --- | --- | --- |
| `Enable Watch Mode` | boolean | This flag will put the component into watch mode and continuously stream the location information to the app. |
| `Maximum Age` | number | Location data is sometimes cached, rather than making a new lookup for the location you might get cached data as a reply. This settings indicates how old the cached location can be and still be considered good. |
| `Timeout` | number | This is the location timeout in milliseconds. If a location request is made and it does not reply in this amount of time and error will be raised |
| `Enable High Accuracy` | boolean | This indicates if you want to use the devices high accuracy mode. If you do not need pinpoint locations you can turn this off |