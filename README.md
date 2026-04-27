# Project 4: A Fully-Full-Stack Web Page

## Introduction

Hello! After having made a site with a database powered by json-server, I've now taken the final step of my Quickstart curriculum. Namely, I've gotten my grubby little hands into the world of SQL, which honestly wasn't as bad as I thought. I've still got a long ways to go, but I now technically have a real full stack website!

> (4/27/26, the day of submission:)
> The frontend may as well not exist in this current version. I didn't manage my time well, and needed to submit something before the sun rose.

Because this site encapsulates all of the core fundamentals of the SWE bootcamp, I'm going to chip away at it for a while so that it can become a proper portfolio thingamajig. 

## Project Specs

- ReactJS
- Bootstrap React
- Usual HTML/CSS
- PostgreSQL (Neon database)
- ExpressJS/nodeJS
- pg library for PostgreSQL
- cors library for separate sites

Broader specs:
- 3-layer REST API design
- DOM familiarity
- CRUD operations
- API testing with Postman

Frontend deployed with Vercel, Backend with Render.

## Anticipated/Partially-Incorporated Specs

- Typescript
- Swagger (for documentation)

## Directions for Running Locally

Once this repository is cloned, the trickiest part is installing the right npm packages. We'll start with frontend first.
The following instructions assume that you've installed node.js and npm!

1. navigate to "client/" folder:
        cd client

2. initialize npm (this shouldn't mess with anything I don't think):
        npm init

3. I'd imagine that a bunch of the react stuff comes with this repository. Still, this'll make sure you've got your dependencies, and it can't hurt, right?
        npm install

4. Run the frontend server:
        npm run dev

Okay sweet, now for the backend:

1. navigate to "server/" folder (from the project's root folder, **NOT** from /client!):
        cd server

Steps #2-4 are the same verbatim for this part, just as long as you execute them in the right directory.

Lastly, don't forget to put a file named ".env" into both the client and server folders! These aren't tracked by this repository for privacy reasons, but they store information that helps the two servers communicate.

Copy this in for /client/.env:
    VITE_API_BASE_URL=http://localhost:3000

Meanwhile /server/.env should look something like this:
    DATABASE_URL={postgresql Neon database link goes here, but I'm not sure if I should be sharing that on a public README}
    PORT=3000

## API ENDPOINTS:

All of my endpoints (both current and planned) begin with the same format:

    hostsite.com/api/v1/

Routes and their details can be found in the "reference" folder of this repository (right alongside client and server directories)!
Green means it's been added, while red and yellow are not added.

## Final Ramble

4/27: As mentioned up top, this is by no means a portfolio-ready project yet. There are quite a few features I've partially added already, and I figured this would be a good place to list them out:

- sorting campaign timelines by in-game time
- filtering timelines by player/npc (already built into Neon)
- logins and individual user information (also in Neon)
- CSS animations (because it's something I've been curious about!)
- "Tools" page for simple non-data things, such as a die roller
- Implementation of external D&D APIs
- Kahoot-inspired sockets, where the DM can send a link to the players for real-time session updates
- Campaign stats: Time per session, dice rolls, player health, etc.

That's quite a lot! I won't get this whole list completed for a while, but I can at least give the project some decent CSS styling. I plan on decorating it for some job hunting stuff soon, so feel free to come back here in a couple of weeks to see how it's going!