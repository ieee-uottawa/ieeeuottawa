import React from 'react';
import { Typography } from '@material-ui/core';
import { Title } from '../../helpers/components';
import { translate, getCurrentLanguage } from '../../helpers/translation';
import voteImg from '../../../static/images/events/2019-2020/vote-ieee.jpg';

const voteUrl = 'https://forms.gle/WZfBzf49KeU2bZVv5';

const getVoteURL = () => {
    return (
        <a href={voteUrl} style={{ color: '#3498db' }}>
            <s> {voteUrl}</s>
        </a>
    );
};

const ElectionsEN = () => {
    return (
        <Typography
            variant="h5"
            style={{
                padding: '8px',
                textAlign: 'left',
                maxWidth: '600px',
                margin: '0 auto',
                fontSize: '18px'
            }}
        >
            <h1>IEEE Elections</h1>
            <p>
                The new voting system is in development. Please check back here
                regularly for updates.
            </p>
            <p>
                Elections begin in <b>February 2021</b>.
            </p>
            <p>A link to the new platform will be posted here.</p>
            <br />
            <h2>Positions</h2>
            <ul>
                <li>
                    Chair (One year experience as an exec on the IEEE student
                    association required)
                </li>
                <li>
                    Vice Chair (One year experience as an exec on the IEEE
                    student association required)
                </li>
                <li>Treasurer</li>
                <li>Secretary</li>
                <li>VP Academic</li>
                <li>VP Communications</li>
                <li>VP External</li>
                <li>VP Internal</li>
                <li>VP Social</li>
                <li>Webmaster</li>
                <li>McNaughton Center Director</li>
            </ul>
            <br />
            <h3>WIE Positions</h3>
            <ul>
                <li>WIE Chair</li>
                <li>WIE Vice-Chair</li>
            </ul>
            <br />
            <h3>Photonics Positions</h3>
            <ul>
                <li>Photonics Chair (Grad Students Only)</li>
                <li>Photonics Vice-Chair (Grad Students Only)</li>
            </ul>
        </Typography>
    );
};

const ElectionsFR = () => {
    return (
        <Typography
            variant="h5"
            style={{
                padding: '8px',
                textAlign: 'left',
                maxWidth: '600px',
                margin: '0 auto'
            }}
        >
            Les Élections de l’IEEE sont arrivées!
            <br />
            <br />
            Qui peut postuler: Étudiants en Informatique, Ingénierie ou Science
            <br />
            <br />
            Comment postuler?
            <br />
            Aux lien suivants:
            <br />
            {getVoteURL()}
            <br /> <br />
            <b>Élections IEEE: </b>
            <br />
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
                26 Févr. : Premier jour pour postuler/Période de nomination
                débute
                <br />
                11 Mars, 12 h : Période de nomination termine
                <br />
                11 Mars, 17 h 30 ou 20 h 30 : Réunion obligatoire des candidats
                <br />
                12 Mars, 0 h - 19 Mars, 23 h 59: Période de campagne
                <br />
                20 Mars, 0 h - 21 Mars, 12 h: Période d’élection
                <br />
            </div>
            <br />
            <br />
            <b>Positions: </b>
            <br />
            Président (Une année d’expérience au sein de l’association étudiante
            de l’IEEE requise)
            <br />
            Vice-Président (Une année d’expérience au sein de l’association
            étudiante de l’IEEE requise)
            <br />
            Trésorier
            <br />
            Secrétaire
            <br />
            VP Académique
            <br />
            VP Communications
            <br />
            VP Externe
            <br />
            VP Interne
            <br />
            VP Social
            <br />
            Webmaster
            <br />
            Directeur du centre McNaughton
            <br />
            -----
            <br />
            Présidente WIE
            <br />
            Vice-Présidente WIE
            <br />
            -----
            <br />
            Président de photonique (étudiants diplômés uniquement)
            <br />
            Vice-Président de photonique (étudiants diplômés uniquement)
            <br />
            <br />
        </Typography>
    );
};

const Elections = () => {
    return (
        <div>
            <Title variant="h5" gutterBottom className="title">
                {translate('Elections')}
            </Title>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={voteImg}
                    alt="vote"
                    style={{
                        borderRadius: '25px',
                        height: '40%',
                        width: '40%'
                    }}
                />
            </div>
            {getCurrentLanguage() === 'EN' ? <ElectionsEN /> : <ElectionsFR />}
        </div>
    );
};

export default Elections;
