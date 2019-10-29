# -Liri-Node-App-

#### Creator: *Rugiya Mammadov*

## About the app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

The user has the option of using three commands (listed below) in conjuntion with specific parameters associated with the commands. The Commands are:

  * *spotify-this-song*

  * *movie-this*

  * *do-what-it-says*
  
 ## How to use liri
 
### Step by Step instructions
1. Open your terminal such as Bash.

1. Navigate to the folder that contains the liri.js file.

1. Depending on the command you run, the output will vary.

Example 1: Run the *spotify-this-song* command

 node liri.js spotify-this-song <name of song>
  
Output: The system will display a list of information associated with the song. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shot below:

![alt text](/images/screenshot1.png)

Example 2: Run the *movie-this command*

 node liri.js movie-this <name of movie>
  
Output: The system will display information associated with the movie. The system will also log all the results in the log.txt file. See screen-shot below:

![alt text](/images/screenshot2.png)

Example 3: Run the *do-what-it-says* command

 node liri.js do-what-it-says
 
 
Output: The system will read the text in the random.txt file, and perform the comman listed in the random.txt file.

See screen-shot below:

![alt text](/images/screenshot3.png)

## TECHNOLOGIES USED
  * Javascript
  * Nodejs
  * Node packages:
      * Node-Spotify-API
      * Request
      * DotEnv
      * Axios
  * APIs used:
      * OMDB
  * Git
  * GitHub
