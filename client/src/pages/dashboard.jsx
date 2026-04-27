//Redirect here immediately from successful login. Just a page that lists all of a user's campaigns.

import { useState, useLayoutEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getUserCampaigns, changeCampaignName, getEvents, addEvent, editEvent, deleteEvent } from '../lib/api.js';
import { useNavigate, Link } from 'react-router';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Dashboard({userSetter}) {
    let navigate = useNavigate();

    const userId = useContext(UserContext);
    const [camp, setCamp] = useState({});
    const [evs, setEvs] = useState([]);

    useLayoutEffect(() => {
        getUserCampaigns(userId)
            .then(res => {
                setCamp(res[0]);
                refreshEvents(res[0].id);
            });
    }, [userId]);

    //camp.id is from the useState thing, but might sometimes not be up to date.
    function refreshEvents(campId) {
        getEvents(campId || camp.id)
            .then(res => setEvs(res));
    }

    function refreshCampName(campId) {

        getUserCampaigns(userId)
            .then(res => {
                setCamp(res[0]);
            });
    }

    function makeEv() {
        addEvent(camp.id, "Undescribed event", "0001-01-01 01:00:00").finally(res => refreshEvents());
    }

    function editEv(eventId, desc, time) {
        editEvent(eventId, desc, time).finally(res => refreshEvents());
    }

    function killEv(e, eventId) {
        e.stopPropagation();
        deleteEvent(eventId).finally(res => refreshEvents());
    }

    function handleSubmit(e, id) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const desc = Object.fromEntries(formData.entries()).newDesc;

        editEv(id, desc, "0001-01-01 01:00:00"); 
    }

    function handleNameChange(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const newName = Object.fromEntries(formData.entries()).newName;

        changeCampaignName(camp.id, newName).then(res => refreshCampName(camp.id));
    }

    function mapEvs() {
        if (evs.length === 0) {
            return (<p>No events found!</p>)
        }
        return evs.map(ev => 
            (<Container key={ev.id}>
                <Row className="event">
                    <Col>ID: {ev.id}</Col>
                    <Col>{ev.event_desc}</Col>
                    <Col><Button variant="danger" onClick={(e) => killEv(e, ev.id)}>Delete</Button></Col>
                </Row>
                <Row className="event-form">
                    <Col>
                        <form onSubmit={(e) => handleSubmit(e, ev.id)}>
                            <label>Description<input name="newDesc"/></label>
                            <button type="submit">Confirm</button>
                        </form>
                    </Col>
                </Row>
            </Container>
            )
        );
    }

    return (
        <main>
            <Link to="/" >Homepage</Link>
            <Link to="/players" >Players</Link>
            <h1>{camp.campaign_name}</h1>

            <form onSubmit={handleNameChange}>
                <label>Campaign Name<input name="newName"/></label>
                <button type="submit">Confirm</button>
            </form>

            <p>Edit the name of the campaign with the form above!</p>
            <p>Or add/edit/delete story events below.</p>

            <ButtonToolbar aria-label="toolbar">
                <ButtonGroup aria-label="interact">
                    <Button variant="success" onClick={makeEv} >New</Button>
                </ButtonGroup>
            </ButtonToolbar>

            <div>
                {mapEvs()}
            </div>
        </main>
    );
}