import fs from 'node:fs';
import fetch from 'node-fetch';

const repository  = "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/";
const server_name = "CN";

Promise.all([
    fetch(repository + server_name + "/sharecfgdata/ship_data_statistics.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/skill_data_template.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/sharecfgdata/ship_data_template.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_data_strengthen.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/sharecfgdata/ship_data_breakout.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_data_trans.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/transform_data_template.json")
    .then(res => res.json())
]).then(
    ([ship, skill, data, enhance, breakout, retrofit, retrofitdesc]) => {
        main(ship, skill, data, enhance, breakout, retrofit, retrofitdesc); 
    },
    (error) => {
        console.log('error: ' + error);
    }
);

function main(ship, skill, data, enhance, breakout, retrofit, retrofitdesc) {
    let keys = [];
    Object.keys(retrofitdesc).forEach(function(key) {
        if ( keys.indexOf(key) == -1 )
        {
            keys.push(key);
        };
    });
    let dsx = [];
    keys.forEach((idx) => {
        if ( retrofitdesc[idx].effect ) {
            retrofitdesc[idx].effect.forEach((bhlx) => {
                Object.keys(bhlx).forEach(function(key) {
                    if ( dsx.indexOf(key) == -1 )
                    {
                        dsx.push(key);
                    }
                })
            });
        };
    });
    console.log(dsx);
}