//Redirect here immediately from successful login. Just a page that lists all of a user's campaigns.

import { useState, useLayoutEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getUserCampaigns, getPlayers, addPlayer, editPlayer, deletePlayer } from '../lib/api.js';
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
    const [players, setPlayers] = useState([]);

    useLayoutEffect(() => {
        getUserCampaigns(userId)
            .then(res => {
                setCamp(res[0]);
                refreshPlayers(res[0].id);
            })
    }, [userId]);

    //camp.id is from the useState thing, but might sometimes not be up to date.
    function refreshPlayers(campId) {
        getPlayers(campId || camp.id)
            .then(res => setPlayers(res));
    }

    function makePl() {
        addPlayer(camp.id, "Unnamed", "No Description", "XX").finally(res => refreshPlayers());
    }

    function editPl({playerId, plName, plDesc}) {
        editPlayer(playerId, plName, plDesc, "XX").finally(res => refreshPlayers());
    }

    function killPl(e, playerId) {
        e.stopPropagation();
        deletePlayer(playerId).finally(res => refreshPlayers());
    }

    function handleSubmit(e, id) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData.entries());

        editPl({...formObj, playerId: id}); 
    }

    function mapPlayers() {
        if (players.length === 0) {
            return (<p>No players found!</p>)
        }
        return players.map(player => 
            (<Container key={player.id}>
                <Row className="player">
                    <Col>ID: {player.id}</Col>
                    <Col>{player.player_name}</Col>
                    <Col>{player.player_desc}</Col>
                    <Col><Button variant="danger" onClick={(e) => killPl(e, player.id)}>Delete</Button></Col>
                </Row>
                <Row className="player-form">
                    <Col>
                        <form onSubmit={(e) => handleSubmit(e, player.id)}>
                            <label>Name<input name="plName"/></label>
                            <label>Desc<input name="plDesc"/></label>
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
            <Link to="/dashboard" >Timeline</Link>
            <h1>Players</h1>

            <>Add/edit/remove players of the campaign below!</>

            <ButtonToolbar aria-label="toolbar">
                <ButtonGroup aria-label="interact">
                    <Button variant="success" onClick={makePl} >New</Button>
                </ButtonGroup>
            </ButtonToolbar>

            <div>
                {mapPlayers()}
            </div>
        </main>
    );
}