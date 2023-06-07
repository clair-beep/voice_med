# Rest api for a blog

The application will enable the following:

Add a song to the library.
List saved songs in the library.
Get a specific song.
Remove a song from the library.
Create a playlist.
Add songs from the library to a playlist.
List saved playlists.
Get a specific playlist.
Remove an existing playlist.

## Installation

Install my-project with npm

```bash
  npm install
```

## Test me

```bash
  npm test
```

## Deployment

To deploy this project run

```bash
  npm run start
```

**Setup**:
To run this project and link it to another base simply define an environment variable as:

MONGO_URI=<Database>

## API Reference

#### General info

#### List of routes

| HTTP Method | Routes        | Description                        |
| :---------- | :------------ | :--------------------------------- |
| GET         | /song         | Retrieve the list of all songs     |
| POST        | /song         | Create an song                     |
| GET         | /song/:id     | Retrieve one song                  |
| GET         | /playlist     | Retrieve the list of all playlists |
| POST        | /playlist     | Create a playlist                  |
| GET         | /playlist/:id | Retrieve one playlist              |
| PUT         | /playlist/:id | Update one playlist                |
| DELETE      | /playlist/:id | Delete one playlist                |

## Tech Stack

**Server:**

- Node 18.15.0
- Express 4.18.2"
