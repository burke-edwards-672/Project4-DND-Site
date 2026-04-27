//Redirect here immediately from successful login. Just a page that lists all of a user's campaigns.

import { useState, useLayoutEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getUserCampaigns, addCampaign, selectCampaign, deleteCampaign } from '../lib/api.js';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Selection({userSetter}) {

    const [camps, setCamps] = useState([]);
    const userId = useContext(UserContext);

    useLayoutEffect(() => {
        refreshCamps();
    }, [userId]);

    function refreshCamps() {
        getUserCampaigns(userId)
            .then(res => setCamps(res));
    }

    function editUserUp() {
        userSetter(a => a + 1)
    }

    function editUserDown() {
        userSetter(a => a - 1)
    }

    function makeCamp() {
        addCampaign(userId, "Unnamed Campaign").finally(res => refreshCamps());
    }

    function gotoCamp(campId) {
        console.log("tried to goto");
        selectCampaign(campId).finally(res => refreshCamps());
    }

    function killCamp(e, campId) {
        e.stopPropagation();
        console.log("tried to delete");
        deleteCampaign(campId).finally(res => refreshCamps());
    }

    function mapCamps() {
        if (camps.length === 0) {
            return (<p>Couldn't get campaigns</p>)
        }
        return camps.map(camp => 
            (
                <Row key={camp.id} onClick={() => gotoCamp(camp.id)}>
                    <Col>ID: {camp.id}</Col>
                    <Col>{camp.campaign_name}</Col>
                    <Col><Button variant="danger" onClick={(e) => killCamp(e, camp.id)}>Delete</Button></Col>
                </Row>
            )
        );
    }

    return (
        <main>
            <ButtonToolbar aria-label="toolbar">
                <ButtonGroup aria-label="scroll">
                    <Button variant="dark" onClick={editUserDown}>Left</Button>
                    <Button variant="dark" onClick={editUserUp}>Right</Button>
                </ButtonGroup>

                <ButtonGroup aria-label="interact">
                    <Button variant="success" onClick={makeCamp} >New</Button>
                </ButtonGroup>
            </ButtonToolbar>

            <Container>
                {mapCamps()}
            </Container>
        </main>
    );
}