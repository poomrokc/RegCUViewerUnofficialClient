# RegCUViewerUnofficialClient 0.1.0 Alpha
For Chulalongkorn University Students to view their grade early online without going through the app.
 
Live demo : https://poomrokc.services/regcuviewer/
## Why do I create this
The current RegCUViewer app is pure s*** , on android it cannot be use , on ios sometime it just crashes , show unknown errors and not getting the data. So I do aim to create a more simple and effective client.
## Current Features
- View grades and simple information (I guess that's the only thing people use the app for)
- **Retry automatically if the server does not respond (not including user error like wrong username/password)**
## How do you replicate the project?
You can easily download both source code files and run **index.html** on your pc , this is a pure Client-Sided project.
## How did I do this without any access to the data server?
I'll only breifly explain the process in case some of you want to try it too

**1.Sniffing network from my own IPHONE**

I follow this tutorial : https://jasdev.me/intercepting-ios-traffic and found 2 links that the app request data
- http://www3.reg.chula.ac.th/cureg-test/web/index.php?r=student-reg/login (use to get token)
- http://www3.reg.chula.ac.th/cureg-test/web/index.php?r=student-reg/getcr60 (use to get grades)

**2.Code those out with a lot of bugs and cors problems**

Until this point I think there are still some bugs left. But it works for now , I better not touch it;

Thanks for reading this lonely readme

**PoomrokC**
