import React, {useEffect, useState} from 'react';
import '../style/AppFooter.css'
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

export const AppFooter = () => {
    return (
        <div className={'footerContainer'} >
            <div className={'AppFooter'}>
                <img className={'footerLogo'} src="/logo.png" alt="logo"/>
                <div className={'linkGroup'}>
                    <p>Repositories</p>
                    <Link target={'_blank'} rel={'noopener'} href={'https://github.com/372-Pollit/Pollit-Server'}>Pollit-Server</Link>
                    <Link  target={'_blank'} rel={'noopener'} href={'https://github.com/372-Pollit/Pollit-Client'}>Pollit-Client</Link>
                </div>
                <div className="linkGroup">
                    <p>Developers</p>
                    <Link target={'_blank'} rel={'noopener'} href={'https://github.com/vatanperver'}>Osman İdik</Link>
                    <Link target={'_blank'} rel={'noopener'} href={'https://github.com/kursadsaka'}>Kürşad Bumin Giray Saka</Link>
                    <Link target={'_blank'} rel={'noopener'} href={'https://github.com/EmreDurdu'}>Muhammed Emre Durdu</Link>
                </div>
                <div className="linkGroup">
                    <p>Faydalı linkler</p>
                    <Link target={'_blank'} rel={'noopener'}
                          href={'https://drive.google.com/file/d/1vYAm2o4m-PulutnEf2SWc6QMzTmBbvMq/view?usp=sharing'}>Eer diagram</Link>
                    <Link target={'_blank'} rel={'noopener'}
                          href={'https://drive.google.com/file/d/1thoJquBa1AaIZ_TF9hlk672wNoz7N-jP/view?usp=sharing'}>Relational mapping</Link>
                    <Link target={'_blank'} rel={'noopener'}
                          href={'https://docs.google.com/document/d/1doAzkN95YLnkMI3AcBG1f0PYz_GqCDKLWMEwA9dHDRI/edit?usp=sharing'}>Sorgular</Link>

                </div>
            </div>
            <hr/>
            <span>© Copyright 2020</span>
        </div>


    )
};