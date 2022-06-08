import fs from 'node:fs';
import fetch from 'node-fetch';

const repository  = "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/";
const server_name = "CN";

// ship id
const ship_file = fs.readFileSync('./src/database.json');
const new_ship  = JSON.parse(ship_file);

import main from "./src/main.js";
import datamine from "./src/datamine.js";

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
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_strengthen_meta.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_meta_repair.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_meta_repair_effect.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_data_blueprint.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/ShareCfg/ship_strengthen_blueprint.json")
    .then(res => res.json()),
    fetch("https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json")
    .then(res => res.json())
]).then(
    ([
        ship, skill, data, enhance, breakout, retrofit, retrofitdesc,
        enhance_meta, meta_repair, meta_effect,
        enhance_pr, pr_effect,
        azurapi
    ]) => {
        main(azurapi, ship, enhance, enhance_meta, meta_repair, meta_effect, enhance_pr, pr_effect, retrofit, retrofitdesc);
        datamine(new_ship, ship, skill, data, enhance, breakout, retrofit, retrofitdesc); 
    },
    (error) => {
        console.log('error: ' + error);
    }
);