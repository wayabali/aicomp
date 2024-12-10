### `PROGRESS`

---ABOUT 60% OF THE IDEA
---THE DATABASE IS NOT ALL SET AND THE BACKEND NEITHER

### `npm start`
before running this command you verify that you are in the correct folder ( frontend)
than execute (npm install) for both frontend and backend  and then run the server backend with (node server.js) and npm start for the frontend 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `Features`

this platform let the driver with the two pages ( Report & Station ) :
--know which station are affected to their bus , the number of people waiting on each station and the max capacity of students that are allowed to enter the bus

--the Report Page will let him report any kind of harrasement or unwanted behaviours + any problem conserning the bus or the material in general .

-- the statistics page ( only for admins ---> Backend not yet developed with Roles and AUTHENTICATIONS )
will let the Admin Know about the bus drivers , most active times and most active stations

--login page is the interface that lets both the admin and the driver connect to the platform and use any of the features developed in it .

### `INFOS`

---the BACKEND AND DATABASE ARE NOT CONNECTED IN THE CURRENT TIMA SO ANY OF THE DATA IN THE WEBSITE IS MOSTLY STATIC
BUT IT DISPLAYS PERFECTLY THE USE OF THIS PLATFORM FOR BOTH ADMINS AND BUS DRIVERS

### `HOW IT SHOULD WORK (THE REALITY)`

---when the students arrive to the station the MOBILE APP allows the users to scan the QR code Related to the current Station and the number awaiting in the station should increment automatically and shows up in the driver's interfaces
---when the bus arrives and the student enter the bus, he should rescan the QR CODE for that bus so its decrement the number of students awaiting in the stations
---whenever the max number of people allowed to enter the bus hit the limit, the driver should immediately goes to the next station, this will increase the chances for every student to get a seat or a place at least in the bus
---the max number of people in bus is set automatically in the database
---same thing for the stations and the routes each bus can take.
---the max number of people allowed to enter the bus for each station is automatically calculated within the pourcentage of people waiting in each station this has to be calculated in the backend PART (couldn't finish that part unfortunatly)
---the statistics for most active times should appear for each station that's the goal