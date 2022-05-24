import fs from 'node:fs';
import fetch from 'node-fetch';

const repository  = "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/";
const server_name = "CN";

// ship id
const ship_file = fs.readFileSync('./database.json');
const new_ship  = JSON.parse(ship_file);
// type of file is array prototype

import main from "./src/main.js";
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
    .then(res => res.json())
]).then(
    ([ship, skill, data, enhance, breakout]) => {
        main(new_ship, ship, skill, data, enhance, breakout); 
    },
    (error) => {
        console.log('error: ' + error);
    }
);