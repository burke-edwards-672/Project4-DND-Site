const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"l

if (!API_BASE_URL) {
    throw new Error("No valid API URL found");
}

async function fetcher(path, options) {
    const res = await fetch(`${API_BASE_URL}/api/v1${path}`, options);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error (`API failed to fetch: ${text}`);
    }

    //TODO: Try to add checks or safety nets here vs. in .jsx files if you can help it.
    return res.json();

}

//Todo: look into the difference between making these exported functions async or not.
//I don't think it changes anything, since the components on react's side still have to unpack them with await.
//Or just take a minute to test out what happens when you call an async from a normal function!

//Also Todo: Check if ids need to be turned into strings, or if it'll work just fine this way. I think it'll be fine?


//It's probably very unconventional to have a get request that needs a body to work.
//Food for thought :D

//More food for thought is to just split this up into multiple modules lol
export function getUserCampaigns(userId) {
    return fetcher(`/campaigns/${userId}`);
}

export function addCampaign(userId, campName) {
    return fetcher(`/campaigns/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: { name: campName }
    });
}

export function selectCampaign(campId) {
    return fetcher(`campaigns/select/${campId}`, {
        method: "PATCH"
    }); 
}

export function changeCampaignName(campId, campName) {
    return fetcher(`campaigns/single/${campId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: { name: campName }
    }); 
}

export function deleteCampaign(campId) {
    return fetcher(`campaigns/single/${campId}`, {
        method: "DELETE"
    }); 
}

export function getEvents(campId) {
    return fetcher(`events/${campId}`);
}

export function addEvent(campId, evDesc, evTime) {
    return fetcher(`events/${campId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { desc: evDesc, time: evTime }
    }); 
}

export function editEvent(eventId, desc, time) {
    return fetcher(`events/single/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { desc: evDesc, time: evTime }
    }); 
}

export function deleteEvent(eventId) {
    return fetcher(`events/single/${eventId}`, {
        method: "DELETE",
    }); 
}

export function getPlayers(campId) {
    return fetcher(`players/${campId}`)
}

export function addPlayer(campId, plName, plDesc, plAlign) {
    return fetcher(`players/${campId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { name: plName, desc: plDesc, align: plAlign }
    }); 
}

export function editPlayer(playerId, plName, plDesc, plAlign) {
    return fetcher(`players/${playerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { name: plName, desc: plDesc, align: plAlign }
    }); 
}

export function deletePlayer(playerId) {
    return fetcher(`players/${playerId}`, {
        method: "DELETE",
    }); 
}

export function getNpcs(campId) {
    return fetcher(`npcs/${campId}`)
}

export function addNpc(campId, npcName, npcDesc, npcAlign) {
    return fetcher(`npcs/${campId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { name: npcName, desc: npcDesc, align: npcAlign }
    }); 
}

export function editNpc(npcId, npcName, npcDesc, npcAlign) {
    return fetcher(`npcs/${npcId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { name: npcName, desc: npcDesc, align: npcAlign }
    }); 
}

export function deleteNpc(npcId) {
    return fetcher(`npcs/${npcId}`, {
        method: "DELETE",
    }); 
}