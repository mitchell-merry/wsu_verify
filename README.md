# wsu_verify
Backend and bot controller for a Discord server manager. Written in Node.js, utilising the following technologies: (for the backend only)
- Node.js / JavaScript
- Sequelize (ORM)
- MySQL (Database)
- Express (lightweight API)

# Purpose
I co-founded the Computing club at Western Sydney University. This club has a large Discord server (online community) with over 700 members and many different things to manage within. Overtime, the amount of time it took to make changes and manage this server got to a point where even the slightest change could take over an hour. Discord has a public facing API that allows people to run user accounts as a bot, allowing for automation and increased customisability. This bot serves the server and manages the members, channels, units, categories, etcetera that pertain to the server. It also has the capability of expanding to all of our university's server, allowing for increase synergy between and sharing a common database.

## Backend
This is essentially the backend of the project. The front end interfaces with this server through a custom API written using Express. That API uses Sequelize (an ORM) to connect to our MySQL database to get information on the server, the users, the units, and other things it may request.

![Screenshot of database diagram](https://i.imgur.com/N0kann6.png)

This diagram was made using draw.io. You can find the models for these tables in [the repo here.](https://github.com/diggitydingdong/wsu_verify/tree/main/database/models) The database is split into two modules, connect via `guild` - roles / units / categories (top section) and users. Essentially, the top section helps us manage the structure of the server by storing the basic information for what's needed, allowing us to make changes by changing this data instead of manually changing it on the server, whereas the second section (users) allows us to store various information on the actual users of the servers. We sometimes get raids and harrassing users, and we use this information to report offending parties to the University.

It includes support for many different servers (or guilds here) to share the same data for users (ideally each university could run a different instance of the server to manage their own information).

## Interfacing with the bot and making changes
While there is a [front-end app](https://github.com/diggitydingdong/wacm-app), we have what is essentially a CLI (command line interface) directly within discord for testing / early implementation of features. Those command files can be found [here.](https://github.com/diggitydingdong/wsu_verify/tree/main/discord/commands) An example is shown below:

![Example of using a command and the result](https://i.imgur.com/7rOjnFn.png)

Above is an example command, `,guild init`, which essentially adds the server and initialises all of it's members automatically.
